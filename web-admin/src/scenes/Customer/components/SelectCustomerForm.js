import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Select, Form, Button } from 'antd'
import toJs from '../../../hoc/toJs'

class SelectCustomerForm extends Component {
    state = { selectedCustomers: [] };

    onChangeSelected = selectedCustomers => this.setState({ selectedCustomers });

    onSubmit = () => {
      this.props.onSubmit(this.state.selectedCustomers)
      this.setState({ selectedCustomers: [] })
    }

    render() {
      const { customers } = this.props
      return (
        <Form layout="inline">
          <Form.Item label="Khách hàng">
            <Select mode="multiple" style={{ width: 400 }} onChange={this.onChangeSelected} value={this.state.selectedCustomers}>
              {customers.map((item, index) => (
                <Select.Option key={`cus${index + 1}`} value={item.ID}>
                  {`(${item.Code}) ${item.Name}`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.onSubmit}>Đăng kí</Button>
          </Form.Item>
        </Form>
      )
    }
}

SelectCustomerForm.propTypes = {
  customers: PropTypes.array,
  onSubmit: PropTypes.func,
}

SelectCustomerForm.defaultProps = {
  customers: [],
  onSubmit: () => {},
}

export default toJs(SelectCustomerForm)
