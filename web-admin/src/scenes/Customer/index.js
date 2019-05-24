import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ROUTER from '../../constants/router'

import CustomersPage from './list'
import AddCustomerPage from './add'
import EditCustomerPage from './edit'
import CustomerMapPage from './map'
import CustomerGroupPage from './group'
import DetailGroupPage from './groupDetail'

const Customer = () => (
  <Switch>
    <Route path={ROUTER.CUSTOMER.INDEX} component={CustomersPage} exact />
    <Route path={ROUTER.CUSTOMER.ADD} component={AddCustomerPage} exact />
    <Route path={ROUTER.CUSTOMER.EDIT} component={EditCustomerPage} exact />
    <Route path={ROUTER.CUSTOMER.MAP} component={CustomerMapPage} exact />
    <Route path={ROUTER.CUSTOMER_GROUP.INDEX} component={CustomerGroupPage} exact />
    <Route path={ROUTER.CUSTOMER_GROUP.DETAIL} component={DetailGroupPage} exact />
  </Switch>
)

export default Customer
