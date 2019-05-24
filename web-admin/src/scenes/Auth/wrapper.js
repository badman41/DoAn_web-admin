import React, { Component } from 'react'
import { Card } from 'antd'
import LoginForm from './components/LoginForm'

import WithLoadingHOC from '../../hoc/loading'

class LoginWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { error: false }
  }

  static getDerivedStateFromProps(nextProps) {
    return { error: nextProps.error }
  }

    removeError = () => {
      this.setState(() => ({ error: false }))
    };

    render() {
      const { doLogin } = this.props
      const { error } = this.state
      return (
        <Card>
          <LoginForm
            error={error}
            onSubmit={values => doLogin(values)}
            removeError={() => this.removeError()}
          />
        </Card>
      )
    }
}

export default WithLoadingHOC(LoginWrapper)
