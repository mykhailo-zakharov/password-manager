import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'


export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={Dashboard} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Route>
    <Route path='*' component={NotFound} />
  </div>
);
