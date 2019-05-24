import React from 'react'
import PropTypes from 'prop-types'

import { Form, DatePicker, Button } from 'antd'
import moment from 'moment'

const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
const rangeConfig = {
  initialValue: [moment().startOf('month'), moment().endOf('month')],
  rules: [{ type: 'array', required: true, message: 'Chọn thời gian !' }],
}
class Filter extends React.Component {
  componentDidMount() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onFilter({
          FromTime: moment(values.timeRange[0])
            .minute(0)
            .hour(7)
            .second(0)
            .toISOString(),
          ToTime: moment(values.timeRange[1])
            .minute(59)
            .hour(23)
            .second(59)
            .toISOString(),
        })
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onFilter({
          FromTime: moment(values.timeRange[0])
            .minute(0)
            .hour(7)
            .second(0)
            .toISOString(),
          ToTime: moment(values.timeRange[1])
            .minute(59)
            .hour(23)
            .second(59)
            .toISOString(),
        })
      }
    })
  };

  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <FormItem label="Chọn thời gian">
          {getFieldDecorator('timeRange', rangeConfig)(
            <RangePicker format="DD/MM/YYYY" placeholder={['Bắt đầu', 'Kết thúc']} />,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    )
  }
}

Filter.propTypes = {
  form: PropTypes.object,
  onFilter: PropTypes.func,
}

Filter.defaultProps = {
  form: {},
  onFilter: () => {},
}

export default Form.create()(Filter)
