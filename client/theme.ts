import Typography from 'typography'

const theme = {
  colors: {
    background: '#121212',
    black: '#000000',
    white: '#e2e2e2',
    navigation: '#1f1f1f',
    accent: '#ba8af9',
    accentDark: '#3d2d51',

    playBar: '#1c1c1c',
    icons: '#FFFFFF',

    textPrimary: '#e2e2e2',
    textSecondary: '#9b9b9b',
  },
  typography: {
    baseFontSize: '16px',
    baseLineHeight: 1.666,
    headerFontFamily: [
      'Avenir Next',
      'Helvetica Neue',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif',
    ],
    bodyFontFamily: ['Helvetica', 'Arial', 'sans-serif'],
    googleFonts: [
      { name: 'Open Sans', styles: ['600', '600i'] },
      { name: 'Rubik', styles: ['400', '400i'] },
    ],
  },
}

export const typography = new Typography(theme.typography)

export default theme
