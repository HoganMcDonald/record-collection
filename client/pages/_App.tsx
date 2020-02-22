import { Store } from 'redux'
import React from 'react'
import App, { Container } from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'

import theme from '../theme'
import createStore from '../store'

interface AppProps {
  store: Store
}

export default withRedux(createStore)(
  class MyApp extends App<AppProps> {
    static async getInitialProps({ Component, ctx }) {
      const pageProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
      return { pageProps }
    }

    render() {
      const { Component, pageProps, store } = this.props
      return (
        <Container>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </Provider>
        </Container>
      )
    }
  }
)
