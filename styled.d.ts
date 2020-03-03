import 'styled-components'
import { TypographyOptions } from 'typography'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string
      gray: string
      accent: string
      accentDark: string
      background: string
      sideBar: string
      sideBarLink: string
      playBar: string
      progressBar: string
      icons: string
      inputs: string
      thumbnail: string
    }
    typography: TypographyOptions
  }
}
