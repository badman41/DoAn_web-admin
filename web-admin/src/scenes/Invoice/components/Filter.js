import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Select, DatePicker, Button, Form, Input } from 'antd'
import ToJS from '../../../hoc/toJs'

const { Option } = Select
const { Item } = Form

class FilterRow extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onFilter(values)
      }
    })
  };

  handleReset = () => {
    this.props.form.resetFields()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onFilter(values)
      }
    })
  };

  render() {
    const { disabled, customers, form: { getFieldDecorator } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item label="Ngày giao hàng">
          {
            getFieldDecorator('from_time')(
              <DatePicker
                style={{ width: '100%' }}
                disabled={disabled}
                placeholder="Ngày giao hàng"
                format="DD/MM/YYYY"
              />,
            )
          }
        </Item>
        <Item label="Mã khách hàng">
          {
            getFieldDecorator('customer_code')(
              <Input
                style={{ width: '100%' }}
                disabled={disabled}
                placeholder="Mã khách hàng"
              />,
            )
          }
        </Item>
        <Item label="Chọn khách hàng">
          {
            getFieldDecorator('customer_id')(
              <Select
                disabled={disabled}
                style={{ width: '100%' }}
                placeholder="Chọn khách hàng"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                showSearch
              >
                <Option value={null} key="all">
              Tất cả
                </Option>
                {customers.map((item, index) => (
                  <Option value={item.ID} key={`cus${index + 1}`}>
                    {item.Name}
                  </Option>
                ))}
              </Select>,
            )
          }
        </Item>
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
  onFilter: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  customers: PropTypes.array,
}

FilterRow.defaultProps = { customers: [] }

export default ToJS(Form.create()(FilterRow))
