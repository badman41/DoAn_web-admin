import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, DatePicker, Button } from 'antd'
import moment from 'moment'

import ToJs from '../../../../hoc/toJs'

const { Item } = Form

class InvoiceFilterForm extends Component {
  componentDidMount() {
    this.onSubmit()
  }

  onSubmit = () => this.props.form.validateFields((err, values) => {
    if (!err) {
      this.props.onSubmit(
        values.from_time
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .toISOString(),
      )
    }
  });

  handleSubmit = event => {
    event.preventDefault()
    this.onSubmit()
  };

  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Item label="Ngày">
          {getFieldDecorator('from_time', {
            rules: [{ required: true, message: 'Hãy chọn ngày!' }],
            initialValue: moment(),
          })(<DatePicker placeholder="Hãy chọn ngày" format="DD/MM/YYYY" />)}
        </Item>
        <Item>
          <Button icon="filter" type="primary" htmlType="submit">
            {'Lọc'}
          </Button>
        </Item>
      </Form>
    )
  }
}

InvoiceFilterForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ToJs(Form.create()(InvoiceFilterForm))
