import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
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

  useEffect(() => {
    async function loadStoredData() {
      const storedToken = localStorage.getItem('accessToken')

      if (storedToken) {
        try {
          const response = await api.get<Profile>('profiles/me/')
          const profileData = response.data
          setProfile(profileData)
          setUser({
            id: profileData.id,
            username: profileData.username,
            email: '',
          })
        } catch (error) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }

      setLoading(false)
    }

    loadStoredData()
  }, [])

  const login = async (credentials: Record<string, string>) => {
    const response = await api.post<AuthTokens>('token/', credentials)
    const { access, refresh } = response.data

    localStorage.setItem('accessToken', access)
    localStorage.setItem('refreshToken', refresh)

    const profileResponse = await api.get<Profile>('profiles/me/')
    const profileData = profileResponse.data

    setProfile(profileData)
    setUser({
      id: profileData.id,
      username: profileData.username,
      email: '',
    })
  }

  const register = async (userData: Record<string, string>) => {
    await api.post('register/', userData)
    await login({ username: userData.username, password: userData.password })
  }

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
        isAuthenticated: !!profile || !!user,
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

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
