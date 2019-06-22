import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, } from 'antd'
import moment from 'moment'
import ToJs from '../../../../hoc/toJs'

const FormItem = Form.Item
const TextArea = Input.TextArea

class SaveRouteForm extends Component {
    handleSubmit = event => {
      event.preventDefault()
      this.props.form.validateFields((err, values) => {
        this.props.onSubmit(values)
      })
    };

    render() {
      const { solution, invoices, form, time } = this.props
      const { getFieldDecorator } = form
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Tên">
            {getFieldDecorator('name', {
              initialValue: moment(time).format('DD-MM-YYYY'),
              rules: [
                {
                  required: true,
                  message: 'Hãy nhập tên!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Ghi chú">{getFieldDecorator('note')(<TextArea rows={4} />)}</FormItem>
          {/* <FormItem label="Ghi chú">
            {getFieldDecorator('routeType', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>Tuyến mẫu</Checkbox>)}
          </FormItem> */}
          <FormItem label="Tổng thời gian">
            {getFieldDecorator('duration', {
              initialValue: solution.duration
                ? Math.floor(solution.duration)
                : Math.floor(solution.duration)
                // : solution.duration && solution.routes.map(item => item.duration).reduce((a, b) => a + b),
            })(<Input disabled />)}
          </FormItem>
          <FormItem label="Tổng quãng đường (km)">
            {getFieldDecorator('distance', {
              initialValue: solution.distance
                ? Math.floor(solution.distance) / 1000
                : Math.floor(solution.distance) / 1000
                // ? Math.floor(solution.distance) / 1000
                // : solution.distance
                //               && solution.routes.map(item => item.distance).reduce((a, b) => a + b) / 1000,
            })(<Input disabled />)}
          </FormItem>
          <FormItem label="Số khách hàng">
            {getFieldDecorator('numberOfCustomers', { initialValue: invoices.length })(<Input disabled />)}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" type="primary">
                        Lưu
            </Button>
          </FormItem>
        </Form>
      )
    }
}

SaveRouteForm.propTypes = {
  form: PropTypes.object.isRequired,
  time: PropTypes.string,
  invoices: PropTypes.array,
  solution: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
}

SaveRouteForm.defaultProps = {
  time: moment().toISOString(),
  invoices: [],
  solution: {},
}

export default Form.create()(ToJs(SaveRouteForm))
