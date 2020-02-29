import * as React from 'react'
import { BrowserRouter, useRouteMatch, Switch, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Index'
import Collection from '../pages/Collection'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/collection">
          <Collection />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
