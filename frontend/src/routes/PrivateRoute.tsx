import { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FullScreenLoading } from '../styles/components'

interface PrivateRouteProps {
  children: JSX.Element
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuth()

  // Vai verificar o localstorage pra ver se tem o token ativo, enquanto o faz, gera o loading na tela
  if (loading) {
    return <FullScreenLoading>Carregando True is Tough :D</FullScreenLoading>
  }

  // Se não estiver autenticado, redireciona para a tela de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}