import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Select, Input, Button, Form } from 'antd'

import ToJS from '../../../hoc/toJs'

const { Option } = Select
const { Item } = Form

class FilterRow extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.props.onFilter(values)
    })
  };

  handleReset = () => {
    this.props.form.resetFields()
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.props.onFilter(values)
    })
  }

  render() {
    const { vehicleTypes, disabled, form: { getFieldDecorator } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item label="Mã lái xe">
          {
            getFieldDecorator('Code')(
              <Input
                disabled={disabled}
                placeholder="Mã lái xe"
              />,
            )
          }
        </Item>
        <Item label="Tên lái xe">
          {
            getFieldDecorator('Name')(
              <Input
                disabled={disabled}
                placeholder="Tên lái xe"
              />,
            )
          }
        </Item>
        <Item label="Số điện thoại">
          {
            getFieldDecorator('PhoneNumber')(
              <Input
                disabled={disabled}
                placeholder="Số điện thoại"
              />,
            )
          }
        </Item>
        <Item label="Phương tiện có thể lái">
          {
            getFieldDecorator('VehicleTypeIDs')(
              <Select
                disabled={disabled}
                style={{ width: '100%' }}
                mode="multiple"
                placeholder="Phương tiện có thể lái"
              >
                {vehicleTypes.map(item => (
                  <Option value={item.ID} key={item.ID}>
                    {item.Name}
                  </Option>
                ))}
              </Select>,
            )
          }
        </Item>
        {/* <Item label="Ngày sinh">
          {
            getFieldDecorator('DoB')(
              <DatePicker
                disabled={disabled}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                placeholder="Ngày sinh"
              />,
            )
          }
        </Item>
        <Item label="Giới tính">
          {
            getFieldDecorator('Sex')(
              <Select
                disabled={disabled}
                style={{ width: '100%' }}
                placeholder="Giới tính"
              >
                <Option value={null} key="default">
              Tất cả
                </Option>
                <Option value="Nam" key={0}>
                  {'Nam'}
                </Option>
                <Option value="Nữ" key={1}>
                  {'Nữ'}
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
  onFilter: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  vehicleTypes: PropTypes.array,
  disabled: PropTypes.bool,
}

FilterRow.defaultProps = {
  vehicleTypes: [],
  disabled: false,
}

export default Form.create()(ToJS(FilterRow))
