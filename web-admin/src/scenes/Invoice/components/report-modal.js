import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DatePicker, Form, Button, Modal } from 'antd'
import moment from 'moment'
import ToJS from '../../../hoc/toJs'

class InvoiceReport extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values.date.format('YYYY-MM-DD'))
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      onCancel,
    } = this.props
    return (
      <Modal
        visible={visible}
        title="Tổng hợp đơn hàng theo ngày"
        closable={false}
        centered
        footer={[
          <Button key="back" onClick={onCancel}>
            Đóng
          </Button>,
        ]}
      >
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="Ngày cần tổng hợp">
            {getFieldDecorator('date', {
              initialValue: moment(),
              rules: [
                {
                  required: true,
                  message: 'Chọn ngày tổng hợp',
                },
              ],
            })(<DatePicker format="DD/MM/YYYY" />)}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" icon="search">
              {'Tổng hợp'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

InvoiceReport.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object,
  visible: PropTypes.bool,
}

InvoiceReport.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  form: {},
  visible: false,
}

export default ToJS(Form.create()(InvoiceReport))
