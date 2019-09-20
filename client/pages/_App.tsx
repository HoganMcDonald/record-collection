import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'styled-components'

import theme from '../theme.ts'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
