/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import WithAuthenticationHOC from '../../hoc/authenticate'

import Header from '../Header'
import Sidebar from '../Sidebar'

import Dashboard from '../Dashboard'
import Customer from '../Customer'
import Vehicle from '../Vehicle'
import Driver from '../Driver'
import Product from '../Product'
import Invoice from '../Invoice'
import Schedule from '../Schedule'
import Routes from '../Route'

import Report from '../Report'
import General from '../General'

import EditProfile from '../Auth/EditProfile'

import ROUTER from '../../constants/router'
import select from '../../util/select';
import { connect } from 'react-redux';


const { Content } = Layout


class AppLayout extends Component{
  render() {
    const { order} = this.props;
    return (
  <Layout
    style={{
      minHeight: '100vh',
      background: '#ffffff',
    }}
  >
    <Sidebar />
    <Content>
      <Header />
      <Content
        style={{
          margin: '10px',
          padding: '25px',
        }}
      >
        <Customer />
        <Vehicle />
        <Driver />
        <Product />
        <Invoice order = {order}/>
        <Schedule />
        <Routes />
        <Report />
        <General />
        <Switch>
          <Route path={ROUTER.HOME} component={Dashboard} exact />
          <Route path={ROUTER.ACCOUNT.PASSWORD} component={EditProfile} exact />
        </Switch>
      </Content>
    </Content>
  </Layout>
);
}
}


export default WithAuthenticationHOC(true)(
  connect(
    state => ({ order: select(state, 'orderReducer', 'order'), user: select(state, 'authReducer', 'authUser') }),
  )(AppLayout),
);

