import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding-bottom: 70px; /* Espaço para a barra de navegação inferior */
  }
`

export const ExploreContainer = styled.main`
  width: 100%;
  max-width: 600px;
  min-width: 320px;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  padding: 1rem 1.25rem;
  border-radius: 16px;
  margin-bottom: 1rem;
  z-index: 10;
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
    border-radius: 12px;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  padding: 0.75rem 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, background 0.2s ease;
  gap: 0.75k;

  @media (max-width: 480px) {
    padding: 0.85rem 1rem;
    border-radius: 14px;
    gap: 0.5rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.cardBackgroundHover};
    border-color: ${({ theme }) => theme.colors.border};
  }
`

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  cursor: pointer;
  min-width: 0;
  flex: 1;

  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`

export const UserAvatar = styled.div`
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    min-width: 38px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const UserNames = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`

export const FollowButton = styled.button<{ $isFollowing?: boolean }>`
  background-color: ${({ theme, $isFollowing }) => ($isFollowing ? 'transparent' : theme.colors.text)};
  color: ${({ theme, $isFollowing }) => ($isFollowing ? theme.colors.text : theme.colors.background)};
  border: 1px solid ${({ theme, $isFollowing }) => ($isFollowing ? theme.colors.border : 'transparent')};
  border-radius: 9999px;
  padding: 0.5rem 1.25rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  min-width: 140px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;

  @media (max-width: 480px) {
    min-width: 105px;
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }

  .text-default {
    display: inline;
  }

  .text-hover {
    display: none;
  }

  &:hover {
    ${({ theme, $isFollowing }) =>
      $isFollowing
        ? `
        background-color: rgba(244, 33, 46, 0.1) !important;
        color: ${theme.colors.danger} !important;
        border-color: ${theme.colors.danger} !important;

        .text-default {
          display: none;
        }
        .text-hover {
          display: inline;
        }
      `
        : `
        opacity: 0.9;
      `}
  }
`

export const FeedbackMessage = styled.p`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 480px) {
    padding: 2rem 1rem;
    font-size: 0.9rem;
    border-radius: 14px;
  }
`