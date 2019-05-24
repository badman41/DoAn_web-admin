import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ROUTER from '../../constants/router'

import SchedulePage from './list'
import ScheduleDetail from './detail'
import EditSchedule from './edit'
import RoutingPage from './routing'


const RouteManage = () => (
  <Switch>
    <Route path={ROUTER.SCHEDULE.INDEX} component={SchedulePage} exact />
    <Route path={ROUTER.SCHEDULE.EDIT} component={EditSchedule} />
    <Route path={ROUTER.SCHEDULE.DETAIL} component={ScheduleDetail} />
    <Route path={ROUTER.ROUTING.VRP} component={RoutingPage} exact />
  </Switch>
)

export default RouteManage
