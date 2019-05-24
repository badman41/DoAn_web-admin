import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, notification, Divider } from 'antd'
import select from '../../util/select'
import PasswordForm from './components/PasswordForm'
import ProfileForm from './components/ProfileForm'

import { changePassword, updateProfile } from './actions'

class ChangePassword extends React.Component {
    changePassword = payload => {
      this.props.changePassword(payload, {
        onSuccess: () => {
          notification.success({ message: 'Đổi mật khẩu thành công' })
        },
        onError: () => {
          notification.success({ message: 'Đổi mật khẩu thất bại' })
        },
      })
    };

    updateProfile = values => {
      const user = this.props.user.toJS()
      this.props.updateProfile(
        {
          User: {
            ...user,
            ...values,
          },
        },
        {
          onSuccess: () => {
            notification.success({ message: 'Sửa thông tin thành công' })
            window.reload()
          },
          onError: () => {
            notification.success({ message: 'Sửa thông tin thất bại' })
          },
        },
      )
    }

    render() {
      const { user } = this.props
      return (
        <Row>
          <Col span={10} offset={7}>
            <Card>
              <ProfileForm user={user} onUpdateProfile={this.updateProfile} />
              <Divider />
              <PasswordForm onSubmit={this.changePassword} />
            </Card>
          </Col>
        </Row>
      )
    }
}

export default connect(
  state => ({ user: select(state, 'authReducer', 'user') }),
  dispatch => ({
    changePassword: (payload, meta) => dispatch(changePassword(payload, meta)),
    updateProfile: (payload, meta) => dispatch(updateProfile(payload, meta)),
  }),
)(ChangePassword)
