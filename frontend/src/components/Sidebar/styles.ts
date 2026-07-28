import styled from 'styled-components'

export const Container = styled.aside`
  width: 260px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 16px;
  /* Linha divisória antiga removida para acompanhar o novo design system */
`

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Logo = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  padding-left: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 9999px;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-size: 18px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  svg {
    font-size: 24px;
  }
`

export const UserProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 9999px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

export const LogoutButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.danger};
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(244, 33, 46, 0.1);
  }
`