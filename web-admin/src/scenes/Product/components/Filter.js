import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Select, Input, Button, Form } from 'antd'
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
      const { disabled, conditions, form: { getFieldDecorator } } = this.props
      return (
        <Form onSubmit={this.handleSubmit}>
          <Item label="Mã hàng hóa">
            {
              getFieldDecorator('Code')(
                <Input
                  disabled={disabled}
                  placeholder="Mã hàng hóa"
                />,
              )
            }
          </Item>
          <Item label="Tên hàng hóa">
            {
              getFieldDecorator('Name')(
                <Input
                  disabled={disabled}
                  placeholder="Tên hàng hóa"
                />,
              )
            }
          </Item>
          { <Item label="Điều kiện bảo quản">
            {
              getFieldDecorator('StoreCondition')(
                <Select
                  disabled={disabled}
                  style={{ width: '100%' }}
                  placeholder="Điều kiện bảo quản"
                >
                  <Option value={null} key={-1}>
                    {'Tất cả'}
                  </Option>
                  {conditions.map((item, index) => (
                    <Option value={item.ID} key={`store${index + 1}`}>
                      {item.Description}
                    </Option>
                  ))}
                </Select>,
              )
            }
          </Item>}
          <Row gutter={24}>
            <Col span={12}>
              <Button
                icon="filter"
                disabled={disabled}
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
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
  conditions: PropTypes.array,
  onFilter: PropTypes.func,
  disabled: PropTypes.bool,
  form: PropTypes.object.isRequired,
}

FilterRow.defaultProps = {
  conditions: [],
  onFilter: () => {},
  disabled: false,
}

export default ToJS(Form.create()(FilterRow))
