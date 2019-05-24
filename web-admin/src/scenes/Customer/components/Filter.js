import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button, Form } from 'antd'

const { Item } = Form

class FilterRow extends React.Component {
    handleSubmit = e => {
      e.preventDefault()
      this.props.form.validateFieldsAndScroll((err, values) => {
        this.props.onFilter(values)
      })
    };

    handleReset = () => {
      this.setState({
        code: null,
        phoneNumber: null,
      })
      this.props.onFilter({
        code: null,
        phoneNumber: null,
      })
    };

    render() {
      const { disabled, form: { getFieldDecorator } } = this.props
      return (
        <Form onSubmit={this.handleSubmit}>
          <Item label="Tên khách hàng">
            {
              getFieldDecorator('name')(
                <Input
                  disabled={disabled}
                  placeholder="Tên khách hàng"
                />,
              )
            }
          </Item>
          <Item label="Mã khách hàng">
            {
              getFieldDecorator('code')(
                <Input
                  disabled={disabled}
                  placeholder="Mã khách hàng"
                />,
              )
            }
          </Item>
          <Item label="SĐT khách hàng">
            {
              getFieldDecorator('phoneNumber')(
                <Input
                  disabled={disabled}
                  placeholder="SĐT khách hàng"
                />,
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
  disabled: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
}

export default Form.create()(FilterRow)
