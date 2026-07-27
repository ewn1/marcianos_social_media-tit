import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`

export const ExploreContainer = styled.main`
  width: 100%;
  max-width: 600px;
  min-width: 320px;
  border-right: 1px solid ${({ theme }) => theme.colors?.border || '#2f3336'};
  border-left: 1px solid ${({ theme }) => theme.colors?.border || '#2f3336'};
  min-height: 100vh;
  box-sizing: border-box;
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || '#2f3336'};
  z-index: 10;
`

export const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors?.border || '#333'};
  border-radius: 9999px;
  padding: 0.75rem 1.25rem;
  color: ${({ theme }) => theme.colors?.text || '#fff'};
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary || '#1d9bf0'};
  }
`

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
`

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || '#2f3336'};
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
`

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  cursor: pointer;
`

export const UserAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const UserNames = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: ${({ theme }) => theme.colors?.text || '#fff'};
    font-size: 0.95rem;
  }

  span {
    color: ${({ theme }) => theme.colors?.textSecondary || '#71767b'};
    font-size: 0.875rem;
  }
`

export const FollowButton = styled.button<{ $isFollowing?: boolean }>`
  background-color: ${({ $isFollowing, theme }) =>
    $isFollowing ? 'transparent' : theme.colors?.text || '#fff'};
  color: ${({ $isFollowing, theme }) =>
    $isFollowing ? theme.colors?.text || '#fff' : '#000'};
  border: 1px solid
    ${({ $isFollowing, theme }) =>
      $isFollowing ? theme.colors?.border || '#536471' : 'transparent'};
  border-radius: 9999px;
  padding: 0.5rem 1.25rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    ${({ $isFollowing }) =>
      $isFollowing &&
      `
      background-color: rgba(244, 33, 46, 0.1);
      color: #f4212e;
      border-color: #f4212e;
    `}
  }
`

export const FeedbackMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors?.textSecondary || '#71767b'};
  font-size: 0.95rem;
`