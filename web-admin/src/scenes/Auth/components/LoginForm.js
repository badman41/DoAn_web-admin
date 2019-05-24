import React from 'react'
import { Form, Button, Input, Checkbox } from 'antd'

const handleSubmit = (event, form, onSubmit) => {
  event.preventDefault()
  form.validateFields((error, values) => {
    if (!error) {
      onSubmit(values)
    }
  })
}

const LoginForm = ({ onSubmit, form, locale, error, removeError }) => {
  const { getFieldDecorator } = form
  return (
    <Form onSubmit={event => handleSubmit(event, form, onSubmit)}>
      <Form.Item
        label="Username"
        validateStatus={error ? 'error' : undefined}
        help={
          error
            ? 'Tên đăng nhập hoặc mật khẩu không đúng'
            : undefined
        }
      >
        {getFieldDecorator('Username', {
          rules: [
            {
              required: true,
              message: `${'Nhập tên người dùng (số điện thoại) của bạn'}!`,
            },
          ],
        })(
          <Input
            placeholder={`${'Tên người dùng'} ...`}
            onChange={() => removeError()}
          />,
        )}
      </Form.Item>
      <Form.Item
        label="Password"
        validateStatus={error ? 'error' : undefined}
      >
        {getFieldDecorator('Password', {
          rules: [
            {
              required: true,
              message: `${'Nhập mật khẩu của bạn'}!`,
            },
          ],
        })(
          <Input
            type="password"
            placeholder={`${'Mật khẩu'} ...`}
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>Remember me</Checkbox>)}
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          icon="login"
        >
          {'Log In'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Form.create()(LoginForm)
