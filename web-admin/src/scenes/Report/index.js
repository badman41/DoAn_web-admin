import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ROUTER from '../../constants/router'

import DistanceReport from './Distance'
import WeightReport from './Weight'
import WorkingDay from './WorkingDay'

const RouteManage = () => (
  <Switch>
    <Route path={ROUTER.REPORT.DISTANCE} component={DistanceReport} exact />
    <Route path={ROUTER.REPORT.WEIGHT} component={WeightReport} exact />
    <Route path={ROUTER.REPORT.WORKING_DAYS} component={WorkingDay} exact />
  </Switch>
)

export default RouteManage
