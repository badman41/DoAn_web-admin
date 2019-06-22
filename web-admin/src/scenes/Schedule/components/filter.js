import React from 'react'
import PropTypes from 'prop-types'

import { Input, Button, DatePicker, Form, Row, Col } from 'antd'


const { Item } = Form

class FilterRow extends React.Component {
  componentDidMount() {
    this.onSubmit()
  }

  onSubmit = () => this.props.form.validateFields((err, values) => {
    if (!err) {
      this.props.onFilter({ ...values, DeliveredAt: values.DeliveredAt ? values.DeliveredAt.toISOString() : values.DeliveredAt })
    }
  });

  handleSubmit = e => {
    e.preventDefault()
    this.onSubmit()
  };

  handleReset = () => {
    this.props.form.resetFields()
    this.onSubmit()
  };

  render() {
    const { disabled, form: { getFieldDecorator } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item label="Tên lịch">
          {
            getFieldDecorator('Name')(
              <Input
                disabled={disabled}
                placeholder="Tên lịch"
              />,
            )
          }
        </Item>
        <Item label="Ngày giao">
          {
            getFieldDecorator('DeliveredAt')(
              <DatePicker
                style={{ width: '100%' }}
                disabled={disabled}
                format="DD/MM/YYYY"
                placeholder="Ngày giao"
              />,
            )
          }
        </Item>
        {/* <Item label="Loại lịch">
          {
            getFieldDecorator('Type', { initialValue: 0 })(
              <Select
                disabled={disabled}
                style={{ width: '100%' }}
                placeholder="Loại lịch"
              >
                <Option value={2} key={2}>
                  {'Tuyến mẫu'}
                </Option>
                <Option value={0} key={0}>
                  {'Tuyến thường'}
                </Option>
              </Select>,
            )
          }
        </Item> */}
        <Row gutter={24}>
          <Col span={12}>
            <Button icon="filter" disabled={disabled} type="primary" htmlType="submit" style={{ width: '100%' }}>
              {'Lọc'}
            </Button>
          </Col>
          <Col span={12}>
            <Button icon="close" disabled={disabled} onClick={this.handleReset} style={{ width: '100%' }}>
              {'Bỏ lọc'}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

FilterRow.propTypes = {
  disabled: PropTypes.bool,
  onFilter: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
}

FilterRow.defaultProps = { disabled: false }

export default Form.create()(FilterRow)
