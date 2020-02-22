import { Store } from 'redux'
import React from 'react'
import App from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'

import Authenticator from '../components/Authenticator'
import theme from '../theme'
import createStore from '../store'

const PageStyles = createGlobalStyle`
  body, html {
    margin: 0;
    height: 100%;
  }

  p {
    margin: 0;
  }
`

interface AppProps {
  store: Store
}

export default withRedux(createStore)(
  class MyApp extends App<AppProps> {
    render() {
      const { Component, pageProps, store } = this.props
      return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <>
              <Authenticator />
              <PageStyles />
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </Provider>
      )
    }
  }
)
