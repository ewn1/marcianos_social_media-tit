import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`

export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 480px) {
    max-width: 100%;
    max-height: 85vh;
    border-radius: 12px;
  }
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 480px) {
    padding: 0.85rem 1rem;
  }

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.1rem;
    margin: 0;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.25rem;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`

export const ModalContent = styled.div`
  overflow-y: auto;
  padding: 0.5rem 0;
  flex: 1;
`

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  @media (max-width: 480px) {
    padding: 0.65rem 1rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.cardBackgroundHover};
  }
`

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
`

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    min-width: 36px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const UserDetails = styled.div`
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
    font-size: 0.85rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`

export const EmptyStateText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2rem 1rem;
  margin: 0;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 1.5rem 1rem;
  }
`