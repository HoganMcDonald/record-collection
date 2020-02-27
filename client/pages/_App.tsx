import React from 'react'
import App, { AppContext } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'

import theme from '../theme'
import createStore from '../store'

class MyApp extends App<ReduxWrapperAppProps> {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        pathname: ctx.pathname,
      },
    }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    )
  }
}

export default withRedux(createStore)(MyApp)
