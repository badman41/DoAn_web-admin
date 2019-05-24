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
    const { vehicleTypes, disabled, form: { getFieldDecorator } } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item label="Mã phương tiện">
          {
            getFieldDecorator('code')(
              <Input
                disabled={disabled}
                placeholder="Mã phương tiện"
              />,
            )
          }
        </Item>
        <Item label="Biển số">
          {
            getFieldDecorator('licensePlate')(
              <Input
                disabled={disabled}
                placeholder="Biển số"
              />,
            )
          }
        </Item>
        <Item label="Tên phương tiện">
          {
            getFieldDecorator('name')(
              <Input
                disabled={disabled}
                placeholder="Tên phương tiện"
              />,
            )
          }
        </Item>
        <Item label="Loại phương tiện">
          {
            getFieldDecorator('vehicleTypeID')(
              <Select
                disabled={disabled}
                style={{ width: '100%' }}
                placeholder="Loại phương tiện"
              >
                <Option value={null} key="default">
                  {'Tất cả loại phương tiện'}
                </Option>
                {vehicleTypes.map(item => (
                  <Option value={item.ID} key={item.ID}>
                    {item.Name}
                  </Option>
                ))}
              </Select>,
            )
          }
        </Item>
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
  onFilter: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  vehicleTypes: PropTypes.array,
  drivers: PropTypes.array,
  disabled: PropTypes.bool,
}

FilterRow.defaultProps = {
  vehicleTypes: [],
  drivers: [],
  disabled: false,
}

export default ToJS(Form.create()(FilterRow))
