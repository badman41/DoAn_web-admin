import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import ImageUploadFormItem from '../../../components/ImageUploadFormItem'

import ToJS from '../../../hoc/toJs'

const { Item } = Form

class ProfileForm extends React.Component {
    handleSubmit = e => {
      e.preventDefault()
      this.props.form.validateFields((error, values) => {
        if (!error) {
          this.props.onUpdateProfile(values)
        }
      })
    };

    imageUploadFormItemOnChange = value => {
      this.props.form.setFieldsValue({ Avatar: value })
    };

    render() {
      const {
        form: { getFieldDecorator },
        user,
      } = this.props
      return (
        <Form onSubmit={this.handleSubmit}>
          <Item label="Avatar">
            {getFieldDecorator('Avatar', {
              rules: [
                {
                  required: true,
                  message: 'Chọn ảnh đại diện',
                },
              ],
              initialValue: user.Avatar
                ? user.Avatar
                : 'https://static.giaodichnongsan.vn/images/5a210e97b9d04c3dd16542bd_1f02694e-d97f-4625-a03d-0de4cbe3ad5d.png',
            })(
              <ImageUploadFormItem
                width="250px"
                height="250px"
                outputWidth={390}
                outputHeight={390}
                onChange={value => this.imageUploadFormItemOnChange(value)}
              />,
            )}
          </Item>
          <Item label="Tên tài khoản">
            {getFieldDecorator('UserName', {
              initialValue: user.UserName,
              rules: [
                {
                  required: true,
                  message: `${'Nhập tên tài khoản'}!`,
                },
              ],
            })(<Input />)}
          </Item>
          <Item label="Tên hiển thị">
            {getFieldDecorator('DisplayName', {
              initialValue: user.DisplayName,
              rules: [
                {
                  required: true,
                  message: `${'Nhập tên hiển thị'}!`,
                },
              ],
            })(<Input />)}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} icon="login">
              {'Cập nhập'}
            </Button>
          </Item>
        </Form>
      )
    }
}

ProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
}

export default Form.create()(ToJS(ProfileForm))
