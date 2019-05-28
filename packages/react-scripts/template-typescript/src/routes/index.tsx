import React, { memo, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

const ReactPage = React.lazy(() => import('-/pages/React'))
const Counter = React.lazy(() => import('-/pages/Counter'))

const Routes = memo(() => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from="/" to="/react" />
        <Route path="/react">
          <ReactPage />
        </Route>
        <Route path="/counter">
          <Counter />
        </Route>
      </Switch>
    </Suspense>
  )
})

export default Routes
