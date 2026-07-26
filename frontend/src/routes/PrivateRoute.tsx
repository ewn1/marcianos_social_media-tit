import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FullScreenLoading } from '../styles/components'

interface PrivateRouteProps {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuth()

  // Enquanto verifica o localStorage e carrega o perfil do usuário, exibe o loading
  if (loading) {
    return <FullScreenLoading>Carregando True is Tough :D</FullScreenLoading>
  }

  // Se terminou de carregar e não está autenticado, redireciona para a tela de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}