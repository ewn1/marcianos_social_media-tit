import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  html {
    overflow-y: scroll;
    scrollbar-gutter: stable;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  #root {
    width: 100%;
    max-width: 1200px;
    display: flex;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 9999px;
    font-weight: bold;
    transition: background-color 0.2s ease, opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }

  input, textarea {
    background-color: ${({ theme }) => theme.colors.cardBackground};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 8px;
    padding: 12px;
    font-size: 15px;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`