import React from 'react'
import App from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'

import theme from '../theme'
import store from '../store'

const PageStyles = createGlobalStyle`
  body, html {
    margin: 0;
    height: 100%;
  }
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
            <PageStyles />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </Provider>
    )
  }
}
