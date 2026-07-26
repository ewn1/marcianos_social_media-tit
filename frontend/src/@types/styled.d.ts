import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string
      cardBackground: string
      text: string
      textSecondary: string
      primary: string
      border: string
      like: string
      danger: string
    }
  }
}