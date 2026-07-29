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
`

export const PagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 40px;
  color: ${({ theme }) => theme.colors.text};

  h1 {
    font-size: 28px;
    font-weight: 800;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 15px;
  }
`