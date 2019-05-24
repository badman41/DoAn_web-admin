import React from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Button } from 'antd'

import ToJS from '../../../hoc/toJs'

class AdminForm extends React.Component {
    handleSubmit = e => {
      e.preventDefault()
      this.props.form.validateFields((error, values) => {
        if (!error) {
          this.props.onRegister(values)
        }
      })
    };

    render() {
      const { form: { getFieldDecorator } } = this.props
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="Tên tài khoản">
            {getFieldDecorator('UserName', {
              rules: [
                {
                  required: true,
                  message: `${'Nhập tên tài khoản'}!`,
                },
              ],
            })(<Input placeholder="Tên tài khoản" />)}
          </Form.Item>
          <Form.Item label="Mật khẩu">
            {getFieldDecorator('Password', {
              rules: [
                {
                  required: true,
                  message: `${'Nhập mật khẩu'}!`,
                },
              ],
            })(<Input type="password" placeholder="Mật khẩu" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} icon="login">
              {'Thêm tài khoản cho quản lí'}
            </Button>
          </Form.Item>
        </Form>
      )
    }
}

AdminForm.propTypes = {
  form: PropTypes.object.isRequired,
  onRegister: PropTypes.func.isRequired,
}

export default Form.create()(ToJS(AdminForm))
