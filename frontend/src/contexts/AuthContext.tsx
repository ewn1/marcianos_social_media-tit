import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import api from '../services/api'
import { User, Profile, AuthTokens } from '../types'

interface AuthContextData {
  user: User | null
  profile: Profile | null
  isAuthenticated: boolean
  loading: boolean
  login: (credentials: Record<string, string>) => Promise<void>
  register: (userData: Record<string, string>) => Promise<void>
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  // Ao carregar a aplicação, verifica se existe um token salvo
  useEffect(() => {
    async function loadStoredData() {
      const storedToken = localStorage.getItem('accessToken')

      if (storedToken) {
        try {
          // Busca o perfil do usuário logado na API
          const response = await api.get<Profile>('users/me/')
          setProfile(response.data)
          setUser(response.data.user)
        } catch (error) {
          // catch para limpar o local storage caso o token tenha expirado ou seja inválido.
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }

      setLoading(false)
    }

    loadStoredData()
  }, [])

  // Função para fazer Login
  const login = async (credentials: Record<string, string>) => {
    const response = await api.post<AuthTokens>('token/', credentials)
    const { access, refresh } = response.data

    localStorage.setItem('accessToken', access)
    localStorage.setItem('refreshToken', refresh)

    // Busca o perfil assim que autenticar
    const profileResponse = await api.get<Profile>('users/me/')
    setProfile(profileResponse.data)
    setUser(profileResponse.data.user)
  }

  // Função para cadastrar novo usuário.
  const register = async (userData: Record<string, string>) => {
    await api.post('register/', userData)
    // Faz o login automático após cadastrar.
    await login({ username: userData.username, password: userData.password })
  }

  // Função para deslogar.
  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook criado para poder utilizar o AuthContext nos demais lugares do projeto.
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}