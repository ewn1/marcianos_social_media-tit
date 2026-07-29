import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string
      cardBackground: string
      cardBackgroundHover: string
      text: string
      textSecondary: string
      primary: string
      primaryHover: string
      border: string
      like: string
      danger: string
      dangerHover: string
      success: string
    }
  }
}