import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio, Form, Input, Select, Button, DatePicker, Row, Col, Modal } from 'antd'
import moment from 'moment'

import WithLoading from '../../../hoc/loading'
import ToJS from '../../../hoc/toJs'

import { DRIVER_STATUS } from '../../../constants/enum'

const { Item } = Form
const { Option } = Select
const RadioGroup = Radio.Group
const { TextArea } = Input

class DriverForm extends Component {
  onDelete = name => {
    Modal.confirm({
      okText: 'Xoá lái xe',
      okButtonProps: { type: 'danger' },
      onOk: this.props.onDelete,
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'primary' },
      title: `Bạn chắc chắn xoá lái xe ${name}`,
      content: 'Tài khoản và mọi thông tin liên quan sẽ bị xoá khỏi hệ thống !',
    })
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          Code,
          Name,
          Sex,
          PhoneNumber,
          Status,
          Note,
          DoB,
          StartDate,
          IDCardNumber,
          VehicleTypes,
          StreetNumber,
          Street,
          District,
          City,
          Country,
        } = values
        this.props.onSubmit({
          Driver: {
            Code,
            Name,
            Sex,
            PhoneNumber,
            Status,
            Note,
            DoB: moment(DoB).format('DD/MM/YYYY'),
            StartDate: moment(StartDate).format('DD/MM/YYYY'),
            IDCardNumber,
            VehicleTypeIDs: VehicleTypes,
            Address: {
              StreetNumber,
              Street,
              District,
              City,
              Country,
            },
            UserID: '',
          },
        })
      }
    })
  };

  render() {
    const {
      form: { getFieldDecorator },
      editMode,
      vehicleTypes,
      driver,
    } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="Mã lái xe">
              {getFieldDecorator('Code', {
                initialValue: editMode ? driver.DriverInfo.Code : '',
                rules: [
                  {
                    required: true,
                    message: 'Nhập mã lái xe',
                  },
                ],
              })(<Input type="text" placeholder="Mã lái xe" disabled={editMode} />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Số điện thoại">
              {getFieldDecorator('PhoneNumber', {
                initialValue: editMode ? driver.DriverInfo.PhoneNumber : '',
                rules: [
                  {
                    required: true,
                    message: 'Nhập số điện thoại lái xe',
                  },
                ],
              })(<Input type="text" placeholder="Số điện thoại" />)}
            </Item>
          </Col>
        </Row>

        <Item label="Họ và tên">
          {getFieldDecorator('Name', {
            initialValue: editMode ? driver.DriverInfo.Name : '',
            rules: [
              {
                required: true,
                message: 'Nhập tên lái xe',
              },
            ],
          })(<Input type="text" placeholder="Họ và tên" />)}
        </Item>

        <Row gutter={24}>
          <Col span="12">
            <Item label="Ngày bắt đầu làm">
              {getFieldDecorator('StartDate', {
                initialValue:
                  editMode && driver.DriverInfo.StartDate
                    ? moment(driver.DriverInfo.StartDate, 'DD/MM/YYYY')
                    : moment(),
              })(<DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />)}
            </Item>
          </Col>
          <Col span="12">
            <Item label="Trạng thái">
              {getFieldDecorator('Status', { initialValue: editMode ? driver.DriverInfo.Status : 0 })(
                <Select>
                  {DRIVER_STATUS.map((item, index) => (
                    <Option key={item} value={index}>
                      {item}
                    </Option>
                  ))}
                </Select>,
              )}
            </Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Item label="Giới tính">
              {getFieldDecorator('Sex', { initialValue: editMode ? driver.DriverInfo.Sex : 'Nam' })(
                <RadioGroup>
                  <Radio value="Nam">Nam</Radio>
                  <Radio value="Nữ">Nữ</Radio>
                  <Radio value="Khác">Khác</Radio>
                </RadioGroup>,
              )}
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Ngày sinh">
              {getFieldDecorator('DoB', { initialValue: editMode ? moment(driver.DriverInfo.DoB, 'DD/MM/YYYY') : moment().subtract(18, 'years') })(<DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />)}
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Item label="Số thẻ căn cước/CMND">
              {getFieldDecorator('IDCardNumber', { initialValue: editMode ? driver.DriverInfo.IDCardNumber : '' })(<Input type="text" placeholder="Số thẻ căn cước/CMND" />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Loại xe có thể lái">
              {getFieldDecorator('VehicleTypes', { initialValue: editMode ? driver.DriverInfo?.VehicleTypes?.map(item => item.ID) : [] })(
                <Select mode="multiple" placeholder="Loại xe có thể lái">
                  {vehicleTypes.map(item => (
                    <Option value={item.ID} key={item.ID}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Item>
          </Col>
        </Row>

        <Item label="Số nhà">
          {getFieldDecorator('StreetNumber', { initialValue: editMode ? driver.DriverInfo?.Address?.StreetNumber : '' })(<Input type="text" placeholder="Số nhà" />)}
        </Item>

        <Row gutter={24}>
          <Col span={12}>
            <Item label="Phố">
              {getFieldDecorator('Street', { initialValue: editMode ? driver.DriverInfo?.Address?.Street : '' })(<Input type="text" placeholder="Phố" />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Quận/huyện">
              {getFieldDecorator('District', { initialValue: editMode ? driver.DriverInfo?.Address?.District : '' })(<Input type="text" placeholder="Quận/huyện" />)}
            </Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span="12">
            <Item label="Tỉnh/thành phố">
              {getFieldDecorator('City', { initialValue: editMode ? driver.DriverInfo?.Address?.City : 'Hà Nội' })(<Input type="text" />)}
            </Item>
          </Col>
          <Col span="12">
            <Item label="Quốc gia">
              {getFieldDecorator('Country', { initialValue: editMode ? driver.DriverInfo?.Address?.Country : 'Việt Nam' })(<Input type="text" />)}
            </Item>
          </Col>
        </Row>


        <Item label="Ghi chú">
          {getFieldDecorator('Note', { initialValue: editMode ? driver.DriverInfo.Note : '' })(<TextArea type="text" placeholder="Thông tin thêm ..." />)}
        </Item>
        <Item>
          {editMode ? (
            <Button
              ghost
              style={{ border: 'none' }}
              type="danger"
              onClick={() => this.onDelete(driver.DriverInfo.Name)}
            >
              Xoá
            </Button>
          ) : null}
          <Button style={{ float: 'right' }} icon="plus" type="primary" htmlType="submit">
            {editMode ? 'Hoàn thành' : 'Thêm lái xe'}
          </Button>
        </Item>
      </Form>
    )
  }
}

DriverForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  editMode: PropTypes.bool,
  driver: PropTypes.object,
  form: PropTypes.object.isRequired,
  vehicleTypes: PropTypes.array,
}

DriverForm.defaultProps = {
  onDelete: () => {},
  vehicleTypes: [],
  editMode: false,
  driver: {},
}

export default WithLoading(Form.create()(ToJS(DriverForm)))
