import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Radio } from 'antd'
import ToJs from '../../../../hoc/toJs'

const RadioGroup = Radio.Group

class MethodForm extends Component {
  render() {
    const { onChangeMethod, isVrp } = this.props
    return (
      <Form onSubmit={this.onSubmit} layout="inline">
        <Form.Item label="Tạo lịch từ">
          <RadioGroup onChange={onChangeMethod} buttonStyle="solid" defaultValue={isVrp}>
            <Radio.Button value>Tối ưu</Radio.Button>
            <Radio.Button value={false}>Tuyến mẫu</Radio.Button>
          </RadioGroup>
        </Form.Item>
      </Form>
    )
  }
}
MethodForm.propTypes = {
  onChangeMethod: PropTypes.func.isRequired,
  isVrp: PropTypes.bool.isRequired,
}

export default ToJs(MethodForm)
