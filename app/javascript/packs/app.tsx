import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Router from './components/Router'

declare global {
  interface Window {
    _redux_store: {
      state: object
      clear: () => undefined
    }
  }
}

const Hello: React.FC = () => <Router />

document.addEventListener('DOMContentLoaded', () => {
  console.log(window._redux_store.state)
  window._redux_store.clear()
  ReactDOM.render(
    <Hello />,
    document.body.appendChild(document.createElement('div'))
  )
})
