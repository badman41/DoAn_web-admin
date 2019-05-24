import React, { Component } from 'react'
import { Form, Select, Button, DatePicker } from 'antd'
import { getResetTimeString } from '../../../util/formatTime'
import ToJs from '../../../hoc/toJs'

const FormItem = Form.Item
const Option = Select.Option
class RouteFilter extends Component {
  onSubmit = event => {
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit({
          driverID: values.driverID,
          DeliveredAt: getResetTimeString(values.DeliveredAt),
        })
      }
    })
  };

  render() {
    const { form, drivers } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.onSubmit} layout="inline">
        <FormItem label="Lái xe">
          {getFieldDecorator('driverID', { rules: [{ required: true, message: 'Hãy chọn lái xe!' }] })(
            <Select
              style={{ width: '250px' }}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              showSearch
            >
              {drivers.map((item, index) => (
                <Option key={`${index + 1}`} value={item.ID}>
                  {item.DriverInfo.Name}
                </Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem label="Thời gian">
          {getFieldDecorator('DeliveredAt', {})(<DatePicker placeholder="Chọn ngày" style={{ width: '200px' }} />)}
        </FormItem>

        <FormItem>
          <Button icon="filter" type="primary" htmlType="submit">
            Lọc
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default ToJs(Form.create()(RouteFilter))
