import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button, Form, Select } from 'antd'

const { Item } = Form
const { Option } = Select
const roles = [
  {
    name: 'Quản lí',
    id: 0,
  },
  {
    name: 'Lái xe',
    id: 1,
  },
  {
    name: 'Khách hàng',
    id: 2,
  },
]

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Role: null,
      Name: null,
    }
  }

    handleSubmit = () => {
      this.props.onFilter(this.state)
    };

    handleReset = () => {
      this.setState({
        Role: null,
        Name: null,
      })
      this.props.onFilter({
        Role: null,
        Name: null,
      })
    };

    handleChangeValue = (value, field) => {
      this.setState(() => ({ [field]: value }))
    };

    handleChangeEvent = (value, field) => {
      this.setState(() => ({ [field]: value }))
    };

    render() {
      const { disabled } = this.props
      return (
        <Form>
          <Item label="Tên tài khoản">
            <Input
              disabled={disabled}
              value={this.state.Name}
              onChange={e => this.handleChangeEvent(e.target.value, 'Name')}
              placeholder="Tên tài khoản"
            />
          </Item>
          <Item label="Vai trò">
            <Select
              value={this.state.Role}
              onChange={value => this.handleChangeEvent(value, 'Role')}
              placeholder="Vai trò"
            >
              {
                roles.map(({ name, id }) => (
                  <Option key={`${name}${id}`} value={id}>
                    {name}
                  </Option>
                ))
              }
            </Select>
          </Item>
          <Row gutter={24}>
            <Col span={12}>
              <Button
                disabled={disabled}
                icon="filter"
                type="primary"
                onClick={this.handleSubmit}
                style={{ width: '100%' }}
              >
                {'Lọc'}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                disabled={disabled}
                icon="close"
                onClick={this.handleReset}
                style={{ width: '100%' }}
              >
                {'Bỏ lọc'}
              </Button>
            </Col>
          </Row>
        </Form>
      )
    }
}

Filter.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
}

export default Filter
