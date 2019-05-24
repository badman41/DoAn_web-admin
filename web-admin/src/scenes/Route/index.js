import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ROUTER from '../../constants/router'

import RoutePage from './route'


const RouteManage = () => (
  <Switch>
    <Route path={ROUTER.ROUTE.INDEX} component={RoutePage} exact />
  </Switch>
)

export default RouteManage
