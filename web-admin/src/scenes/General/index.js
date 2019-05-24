import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ROUTER from '../../constants/router'

import GeneralPage from './General'
import AccountPage from './Account'

const General = () => (
  <Switch>
    <Route path={ROUTER.GENERAL.INDEX} component={GeneralPage} exact />
    <Route path={ROUTER.GENERAL.ACCOUNT} component={AccountPage} exact />
  </Switch>
)

export default General
