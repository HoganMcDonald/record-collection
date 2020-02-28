import * as React from 'react'
import { BrowserRouter, useRouteMatch, Switch, Route } from 'react-router-dom'

const Component: React.FC<{ name: string }> = ({ name }) => {
  const match = useRouteMatch()

  return (
    <div>
      {name} - {match.path}
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
          <Component name="login" />
        </Route>
        <Route path="/collection">
          <Component name="collection" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
