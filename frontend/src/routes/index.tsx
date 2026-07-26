import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/Login'
import { PrivateRoute } from './PrivateRoute'
import { PagePlaceholder } from '../styles/components'

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota Pública */}
      <Route path="/login" element={<Login />} />

      {/* Rota Protegida (Feed Principal) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PagePlaceholder>
              <h1>Feed de Tits</h1>
              <p>O espaço oficial para compartilhar "verdades universais" (contém ironia :D).</p>
            </PagePlaceholder>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}