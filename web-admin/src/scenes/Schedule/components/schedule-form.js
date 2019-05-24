import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import WithLoading from '../../../hoc/loading'
import toJs from '../../../hoc/toJs'

const { Item } = Form
const { TextArea } = Input

class ScheduleForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit({
          ...values,
          RouteManagerType: values.RouteManagerType ? 2 : 0,
          EstimatedDistance: Number(values.EstimatedDistance) * 1000,
        })
      }
    })
  };

  render() {
    const {
      form: { getFieldDecorator },
      schedule,
      UpdatedDuration,
      UpdatedDistance,
    } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item label="Tên lịch">
          {getFieldDecorator('Name', { initialValue: schedule.Name })(<Input />)}
        </Item>
        <Item label="Ghi chú">
          {getFieldDecorator('Note', { initialValue: schedule.Note })(<TextArea rows={4} />)}
        </Item>
        <Item label="Ghi chú">
          {getFieldDecorator('RouteManagerType', {
            valuePropName: 'checked',
            initialValue: !!schedule.RouteManagerType,
          })(<Checkbox>Tuyến mẫu</Checkbox>)}
        </Item>
        <Row gutter={10}>
          <Col span={6}>
            <Item label="Tổng thời gian">
              {getFieldDecorator('EstimatedDuration', { initialValue: Math.floor(UpdatedDuration) })(<Input disabled />)}
            </Item>

          </Col>
          <Col span={6}>
            <Item label="Tổng quãng đường">
              {getFieldDecorator('EstimatedDistance', { initialValue: Math.floor(UpdatedDistance) / 1000 })(<Input disabled />)}
            </Item>

          </Col>
          <Col span={6}>
            <Item label="Tổng khối lượng">
              {getFieldDecorator('EstimatedDistance', { initialValue: Math.floor(UpdatedDistance) / 1000 })(<Input disabled />)}
            </Item>

          </Col>
          <Col span={6}>
            {' '}
            <Item label="Số khách hàng">
              {getFieldDecorator('NumberOfCustomers', { initialValue: schedule.NumberOfCustomers })(<Input disabled />)}
            </Item>

          </Col>
        </Row>


        <Item style={{ float: 'right' }}>
          <Button type="primary" htmlType="submit">
            Lưu lịch mẫu
          </Button>
        </Item>
      </Form>
    )
  }
}

ScheduleForm.propTypes = {
  form: PropTypes.object,
  schedule: PropTypes.object,
  UpdatedDistance: PropTypes.number,
  UpdatedDuration: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
}

ScheduleForm.defaultProps = {
  form: {},
  schedule: {},
  UpdatedDistance: 0,
  UpdatedDuration: 0,
}

export default WithLoading(Form.create()(toJs(ScheduleForm)))
