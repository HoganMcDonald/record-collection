import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import Router from './components/Router'
import store from './store'
import theme from './theme'

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
)

document.addEventListener('DOMContentLoaded', () => {
  const rootElm = document.createElement('div')
  rootElm.className = 'App'

  ReactDOM.render(<App />, document.body.appendChild(rootElm))
})
