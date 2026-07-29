import styled from 'styled-components'

export const FullScreenLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`

export const PagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 40px;
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 480px) {
    padding: 20px 16px;
    gap: 8px;
  }

  h1 {
    font-size: 28px;
    font-weight: 800;

    @media (max-width: 480px) {
      font-size: 22px;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 15px;

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`