import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { TypographyStyle, GoogleFont } from 'react-typography'

import Router from './components/Router'
import store from './store'
import theme, { typography } from './theme'

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
      <Router />
    </ThemeProvider>
  </Provider>
)

document.addEventListener('DOMContentLoaded', () => {
  const rootElm = document.createElement('div')
  rootElm.className = 'App'

  ReactDOM.render(<App />, document.body.appendChild(rootElm))
})
