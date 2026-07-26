import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
`

export const ProfileContainer = styled.main`
  flex: 1;
  max-width: 650px;
  border-right: 1px solid ${({ theme }) => theme.colors.border || '#2f3336'};
  border-left: 1px solid ${({ theme }) => theme.colors.border || '#2f3336'};
  min-height: 100vh;
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#2f3336'};
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text || '#fff'};
    margin: 0;
  }
`

export const ProfileHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#2f3336'};
`

export const AvatarSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

export const AvatarImage = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  border: 4px solid #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const EditProfileButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.text || '#fff'};
  border: 1px solid ${({ theme }) => theme.colors.border || '#536471'};
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

export const UserInfo = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.text || '#fff'};
    font-size: 1.25rem;
    margin: 0;
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary || '#71767b'};
    font-size: 0.9rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text || '#fff'};
    font-size: 0.95rem;
    margin: 0.75rem 0;
    line-height: 1.4;
  }
`

export const StatsContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary || '#71767b'};

  strong {
    color: ${({ theme }) => theme.colors.text || '#fff'};
  }
`

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  input,
  textarea {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${({ theme }) => theme.colors.border || '#333'};
    border-radius: 8px;
    padding: 0.75rem;
    color: #fff;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary || '#1d9bf0'};
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`

export const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || '#1d9bf0'};
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 0.6rem 1.25rem;
  font-weight: bold;
  align-self: flex-end;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`