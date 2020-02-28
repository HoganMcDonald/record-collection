import * as React from 'react'
import { BrowserRouter, useRouteMatch, Switch, Route } from 'react-router-dom'

import Login from '../pages/Login'

const Component: React.FC<{ name: string }> = ({ name }) => {
  const match = useRouteMatch()

  return (
    <div>
      <p>
        {name} - {match.path}
      </p>
      <a href="/users/auth/spotify">sign in</a>
    </div>
  )
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Component name="home" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/collection">
          <Component name="collection" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
