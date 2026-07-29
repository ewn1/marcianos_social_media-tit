import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.text};
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
  }

  button {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: ${({ theme }) => theme.colors.text};
    }
  }
`

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const EditLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`

export const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 12px 20px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`