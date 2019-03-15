import React from 'react'
import { Router } from 'react-router-dom'
import history from '-/utils/history'
import Routes from '-/routes'

const App = (): JSX.Element => (
  <Router history={history}>
    <Routes />
  </Router>
)

export default App
