import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/Login'
import { PrivateRoute } from './PrivateRoute'
import { PagePlaceholder } from '../styles/components'
import { Register } from '../pages/Register'

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rota protegida feed principal. */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PagePlaceholder>
              <h1>Feed de Tit's</h1>
              <p>O espaço oficial para compartilhar "verdades universais" (contém ironia :D).</p>
            </PagePlaceholder>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}