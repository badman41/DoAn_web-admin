import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import moment from 'moment'
import AppLayout from './scenes/AppLayout'
import AuthLayout from './scenes/Auth'
import 'moment/locale/vi'
import ROUTER from './constants/router'

moment.locale('vi')

function App() {
  return (
    <Switch>
      <Route exact path={ROUTER.AUTH.LOGIN} component={AuthLayout} />
      <Route path={ROUTER.HOME} component={AppLayout} />
    </Switch>
  )
}

export default withRouter(App)
