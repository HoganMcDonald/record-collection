import Typography from 'typography'

const theme = {
  colors: {
    white: '#e2e2e2',
    gray: '#6D7278',

    accent: '#ba8af9',
    accentDark: '#3d2d51',

    background: '#11051B',
    sideBar: '#121212',
    sideBarLink: '#1c1c1c',
    playBar: '#1c1c1c',
    progressBar: '#B620E0',
    icons: '#FFFFFF',
    inputs: '#121212',
    thumbnail: '#1c1c1c',
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
    overrideStyles: () => ({
      p: {
        marginBottom: 0,
      },
    }),
  },
}

export const typography = new Typography(theme.typography)

export default theme
