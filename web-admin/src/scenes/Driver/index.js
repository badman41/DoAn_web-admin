import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ROUTER from '../../constants/router'

import DriversPage from './list'
import AddDriverPage from './add'
import EditDriverPage from './edit'

const Driver = () => (
  <Switch>
    <Route path={ROUTER.DRIVER.INDEX} component={DriversPage} exact />
    <Route path={ROUTER.DRIVER.ADD} component={AddDriverPage} exact />
    <Route path={ROUTER.DRIVER.EDIT} component={EditDriverPage} exact />

  </Switch>
)

export default Driver
