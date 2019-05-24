import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ROUTER from '../../constants/router'

import VehiclesPage from './list'
import AddVehiclePage from './add'
import EditVehiclePage from './edit'


const Vehicle = () => (
  <Switch>
    <Route path={ROUTER.VEHICLE.INDEX} component={VehiclesPage} exact />
    <Route path={ROUTER.VEHICLE.ADD} component={AddVehiclePage} exact />
    <Route path={ROUTER.VEHICLE.EDIT} component={EditVehiclePage} exact />
  </Switch>
)

export default Vehicle
