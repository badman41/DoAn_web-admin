import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const FormItem = Form.Item

class ResetForm extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
      driver,
    } = this.props
    return (
      <Form>
        <FormItem label="Mã lái xe">
          {getFieldDecorator('DriverID', { initialValue: driver.ID })(<Input />)}
        </FormItem>
        <FormItem label="Tên lái xe">
          {getFieldDecorator('DriverName', { initialValue: driver.DriverInfo.Name })(<Input />)}
        </FormItem>
        <FormItem label="Số điện thoại">
          {getFieldDecorator('DriverPhone', { initialValue: driver.DriverInfo.PhoneNumber })(<Input />)}
        </FormItem>
        <FormItem label="Mật khẩu mới">
          {getFieldDecorator('NewPassword', { initialValue: '123456' })(<Input />)}
        </FormItem>
      </Form>
    )
  }
}

ResetForm.propTypes = {
  form: PropTypes.object.isRequired,
  driver: PropTypes.object.isRequired,
}

export default Form.create()(ResetForm)
