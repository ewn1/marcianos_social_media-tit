import { useNavigate, useLocation } from 'react-router-dom'
import { Home, User, LogOut, Search } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import {
  Container,
  TopSection,
  Logo,
  NavMenu,
  NavItem,
  UserProfileSection,
  UserInfo,
  LogoutButton,
} from './styles'

export function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Container>
      <TopSection>
        <Logo>True is Tough</Logo>

        <NavMenu>
          <NavItem
            $active={location.pathname === '/'}
            onClick={() => navigate('/')}
          >
            <Home size={24} />
            <span>Feed</span>
          </NavItem>

          <NavItem
            $active={location.pathname === '/explore'}
            onClick={() => navigate('/explore')}
          >
            <Search size={24} />
            <span>Explorar</span>
          </NavItem>

          <NavItem
            $active={location.pathname.startsWith('/profile')}
            onClick={() => navigate('/profile')}
          >
            <User size={24} />
            <span>Perfil</span>
          </NavItem>
        </NavMenu>
      </TopSection>

      <UserProfileSection>
        <UserInfo>
          <strong>{user?.username || 'Marciano'}</strong>
          <span>@{user?.username || 'marciano'}</span>
        </UserInfo>

        <LogoutButton onClick={handleLogout} title="Sair da conta">
          <LogOut size={20} />
        </LogoutButton>
      </UserProfileSection>
    </Container>
  )
}
