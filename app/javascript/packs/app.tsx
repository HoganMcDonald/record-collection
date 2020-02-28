import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Router from './components/Router'
import store from './store'

const App: React.FC = () => (
  <Provider store={store}>
    <Router />
  </Provider>
)

document.addEventListener('DOMContentLoaded', () => {
  console.log(window._redux_store.state)
  window._redux_store.clear()
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  )
})
