import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ROUTER from '../../constants/router'

import ProductsPage from './list'
import AddProductPage from './add'
import EditProductPage from './edit'

const Product = () => (
  <Switch>
    <Route path={ROUTER.PRODUCT.INDEX} component={ProductsPage} exact />
    <Route path={ROUTER.PRODUCT.ADD} component={AddProductPage} exact />
    <Route path={ROUTER.PRODUCT.EDIT} component={EditProductPage} exact />
  </Switch>
)

export default Product
