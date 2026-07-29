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
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 900;

  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 12px;
    border-right: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.cardBackground};
  }
`

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 0;
    width: 100%;
    justify-content: space-around;
  }
`

export const Logo = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  padding-left: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`

export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    gap: 0;
  }
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
    background-color: ${({ theme }) => theme.colors.cardBackgroundHover};
  }

  svg {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 50%;
    gap: 0;

    span {
      display: none;
    }
  }
`

export const UserProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 9999px;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.cardBackgroundHover};
  }

  @media (max-width: 768px) {
    padding: 8px;
    border-radius: 50%;
    justify-content: center;
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

  @media (max-width: 768px) {
    display: none;
  }
`

export const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(244, 33, 46, 0.1);
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`