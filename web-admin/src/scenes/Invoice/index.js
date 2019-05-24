import React from 'react'

import { Route, Switch } from 'react-router-dom'

import ROUTER from '../../constants/router'

import OrderPage from '../Order'
import List from './list'
import Detail from './edit'

const Invoice = (order) => (
  <Switch>
    <Route path={ROUTER.INVOICE.ADD} component={OrderPage} exact />
    <Route exact path={ROUTER.INVOICE.EDIT} render={() => <OrderPage order={order} editMode />} />
    <Route path={ROUTER.INVOICE.INDEX} component={List} exact />
    <Route path={ROUTER.INVOICE.DETAIL} component={Detail} exact />
  </Switch>
)

export default Invoice
