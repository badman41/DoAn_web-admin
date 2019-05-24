import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Select, Button, Row, Col, InputNumber } from 'antd'
import ToJS from '../../../hoc/toJs'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input

class VehicleForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { Code, TypeID, Name, LicensePlate, DriverID, MaxLoad, Width, Height, Length, Note } = values
        this.props.onSubmit({
          Code,
          TypeID,
          Name,
          LicensePlate,
          DriverID,
          MaxLoad,
          Note,
          MaxVolume: [Length, Width, Height],
          CreatedAt: 0,
          UpdatedAt: 0,
          UpdatedBy: '',
          ID: this.props.editMode ? this.props.match.params.id : '',
        })
      }
    })
  };

  onChangeType = value => {
    const selectedType = this.props.typeVehicle.find(_ => _.ID === value)
    const currentPlateNumber = this.props.form.getFieldValue('LicensePlate')
    this.props.form.setFieldsValue({ Name: `${selectedType.Name} ${currentPlateNumber}` })
  }

  onChangeLicensePlate = ({ target: { value } }) => {
    const selectedTypeId = this.props.form.getFieldValue('TypeID')
    const selectedType = this.props.typeVehicle.find(_ => _.ID === selectedTypeId)
    this.props.form.setFieldsValue({ Name: `${selectedType.Name} ${value}` })
  }

  render() {
    const {
      typeVehicle,
      listDriver,
      vehicle,
      editMode,
      form: { getFieldDecorator },
    } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="Kiểu">
              {getFieldDecorator('TypeID', {
                initialValue: editMode ? (vehicle.Type ? vehicle.Type.ID : '') : '',
                rules: [
                  {
                    required: true,
                    message: 'Hãy chọn kiểu phương tiện',
                  },
                ],
              })(
                <Select placeholder="Chọn kiểu" onChange={this.onChangeType}>
                  {typeVehicle
                    ? typeVehicle.map((item, index) => (
                      <Option value={item.ID} key={`${index + 1}`}>
                        {item.Name}
                      </Option>
                    ))
                    : ''}
                </Select>,
              )}
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Mã">
              {getFieldDecorator('Code', {
                initialValue: editMode ? vehicle.Code : '',
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập mã phương tiện',
                  },
                ],
              })(<Input type="text" />)}
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="Biển số">
              {getFieldDecorator('LicensePlate', {
                initialValue: editMode ? vehicle.LicensePlate : '',
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập biển số xe',
                  },
                ],
              })(<Input type="text" onChange={this.onChangeLicensePlate} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Tên xe">
              {getFieldDecorator('Name', {
                initialValue: editMode ? vehicle.Name : '',
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập tên xe',
                  },
                ],
              })(<Input type="text" disabled />)}
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="Chủ sở hữu">
              {getFieldDecorator('DriverID', {
                initialValue: editMode ? (vehicle.Driver ? vehicle.Driver.ID : '') : '',
                rules: [
                  {
                    required: true,
                    message: 'Chọn chủ sở hữu',
                  },
                ],
              })(
                <Select placeholder="Chọn chủ sở hữu">
                  {listDriver
                    ? listDriver.map((element, index) => (
                      <Option value={element.ID} key={`${index + 1}`}>
                        {element.DriverInfo.Name}
                      </Option>
                    ))
                    : ''}
                </Select>,
              )}
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Tải trọng tối đa">
              {getFieldDecorator('MaxLoad', { initialValue: editMode ? vehicle.MaxLoad : 0 })(<InputNumber style={{ width: '100%' }} min={0} type="text" placeholder="Kg" />)}
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12} />
          <Col span={12} />
        </Row>

        <Row gutter={24}>
          <h4>Thùng hàng tối đa</h4>
          <Col span={8}>
            <Item label="Chiều dài">
              {getFieldDecorator('Length', { initialValue: editMode ? (vehicle.MaxVolume ? vehicle.MaxVolume[0] : 0) : 0 })(<InputNumber min={0} placeholder="cm" />)}
            </Item>
          </Col>
          <Col span={8}>
            <Item label="Chiều rộng">
              {getFieldDecorator('Width', { initialValue: editMode ? (vehicle.MaxVolume ? vehicle.MaxVolume[1] : 0) : 0 })(<InputNumber min={0} placeholder="cm" />)}
            </Item>
          </Col>
          <Col span={8}>
            <Item label="Chiều cao">
              {getFieldDecorator('Height', { initialValue: editMode ? (vehicle.MaxVolume ? vehicle.MaxVolume[2] : 0) : 0 })(<InputNumber min={0} placeholder="cm" />)}
            </Item>
          </Col>
        </Row>

        <Item label="Ghi chú">
          {getFieldDecorator('Note', { initialValue: editMode ? vehicle.Note : '' })(<TextArea type="text" />)}
        </Item>

        <Item style={{ float: 'right' }}>
          <Button type="primary" htmlType="submit">
            {editMode ? 'Hoàn thành' : 'Thêm phương tiện'}
          </Button>
        </Item>
      </Form>
    )
  }
}

VehicleForm.propTypes = {
  form: PropTypes.object.isRequired,
  typeVehicle: PropTypes.array,
  listDriver: PropTypes.array,
  vehicle: PropTypes.object,
  editMode: PropTypes.bool,
  onSubmit: PropTypes.func,
}

VehicleForm.defaultProps = {
  typeVehicle: [],
  listDriver: [],
  vehicle: {},
  editMode: false,
  onSubmit: () => {},
}

export default Form.create()(ToJS(VehicleForm))
