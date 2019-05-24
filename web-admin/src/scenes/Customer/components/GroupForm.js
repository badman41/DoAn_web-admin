import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Button, notification } from 'antd'

const { Item } = Form

class GroupForm extends Component {
    handleSubmit = e => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.onAdd(values, {
            onSuccess: () => this.props.form.resetFields(),
            onError: error => notification.error({ message: `Thêm nhóm không thành công - ${error}` }),
          })
        }
      })
    };

    render() {
      const { form: { getFieldDecorator } } = this.props
      return (
        <Form onSubmit={this.handleSubmit}>
          <Item label="Tên nhóm">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Nhập tên nhóm khách hàng',
                },
              ],
            })(<Input placeholder="Tên nhóm" />)}
          </Item>
          <Item>
            <Button style={{ width: '100%' }} icon="plus" type="primary" htmlType="submit" onClick={this.handleAdd}>
              {'Thêm nhóm khách hàng'}
            </Button>
          </Item>
        </Form>
      )
    }
}

GroupForm.propTypes = {
  form: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default Form.create()(GroupForm)
