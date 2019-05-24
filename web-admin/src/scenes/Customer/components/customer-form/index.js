import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Input, Button, Checkbox, notification, Row, Col, TimePicker, Modal, InputNumber } from 'antd'
import LocationMap from './Map'
import ToJS from '../../../../hoc/toJs'

const FormItem = Form.Item
const { TextArea } = Input

const IndexAddressField = ['Country', 'City', 'District', 'Street', 'StreetNumber']

class CustomerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {
        lat: 21.0456933,
        lng: 105.7828644,
      },
    }
  }

  static getDerivedStateFromProps(props) {
    const { customer, editMode } = props
    return {
      center: editMode
        ? {
          lat: customer.Address.Lat,
          lng: customer.Address.Lng,
        }
        : {
          lat: 21.0456933,
          lng: 105.7828644,
        },
    }
  }

  onDelete = name => {
    Modal.confirm({
      okText: 'Xoá khách hàng',
      okButtonProps: { type: 'danger' },
      onOk: this.props.onDelete,
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'primary' },
      title: `Bạn chắc chắn xoá khách hàng ${name}`,
      content: 'Tài khoản và mọi thông tin liên quan sẽ bị xoá khỏi hệ thống !',
    })
  };

  handleSubmit = e => {
    debugger;
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          Code,
          Name,
          Email,
          PhoneNumber,
          StreetNumber,
          Street,
          District,
          City,
          Country,
          Note,
          Lat,
          Lng,
          DeliveryVehicle,
          CartCode,
        } = values
        this.props.onSubmit({
          Code,
          Name,
          Email,
          PhoneNumber,
          Address: {
            StreetNumber,
            Street,
            District,
            City,
            Country,
            Lat,
            Lng,
          },
          Note,
          DeliveryVehicle: DeliveryVehicle ? 1 : 0,
          CartCode,
          // TimeWindows: {
          //   FromTime: values.FromTime.unix(),
          //   ToTime: values.ToTime.unix(),
          // },
          // ServerTime: Number(values.ServerTime),
        })
      }
    })
  };

  handleSearch = ({ lat, lng }, address) => {
    this.props.form.setFieldsValue({ Lat: lat, Lng: lng })
    notification.info({ message: 'Đã thiết lập địa chỉ.' })
    if (address !== undefined) {
      IndexAddressField.forEach(item => this.props.form.setFieldsValue({ [item]: '' }))
      let tailAddress = ''
      address.reverse().forEach((item, index) => {
        if (index > 3) {
          tailAddress = `${item.long_name} ${tailAddress}`
        } else {
          this.props.form.setFieldsValue({ [IndexAddressField[index]]: item.long_name })
        }
      })
      this.props.form.setFieldsValue({ StreetNumber: tailAddress })
    }
  };

  render() {
    const {
      customer,
      editMode,
      form: { getFieldDecorator },
    } = this.props
    return (
      <Form>
        <FormItem>
          <LocationMap onSearch={this.handleSearch} center={this.state.center} />
        </FormItem>
        <Row gutter={24}>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem label="Mã khách hàng">
                  {getFieldDecorator('Code', {
                    initialValue: editMode ? customer.Code : '',
                    rules: [
                      {
                        required: true,
                        message: 'Hãy nhập mã khách hàng',
                      },
                    ],
                  })(<Input type="text" placeholder="Mã khách hàng" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Mã giỏ">
                  {getFieldDecorator('CartCode', {
                    initialValue: editMode ? customer.CartCode : '',
                    rules: [
                      {
                        required: true,
                        message: 'Hãy nhập mã khách hàng',
                      },
                    ],
                  })(<InputNumber style={{ width: '100%' }} placeholder="Mã giỏ" />)}
                </FormItem>
              </Col>
            </Row>

            <FormItem label="Tên khách hàng">
              {getFieldDecorator('Name', {
                initialValue: editMode ? customer.Name : '',
                rules: [
                  {
                    required: true,
                    message: 'Hãy nhập tên khách hàng',
                  },
                ],
              })(<Input type="text" placeholder="Tên khách hàng" />)}
            </FormItem>
            <FormItem label="Số điện thoại">
              {getFieldDecorator('PhoneNumber', { initialValue: editMode ? customer.PhoneNumber : '' })(<Input type="text" placeholder="Số điện thoại" />)}
            </FormItem>
            <FormItem label="Email">
              {getFieldDecorator('Email', { initialValue: editMode ? customer.Email : '' })(<Input type="text" placeholder="Email" />)}
            </FormItem>
            <FormItem label="Ghi chú">
              {getFieldDecorator('Note', { initialValue: editMode ? customer.Note : '' })(<TextArea type="text" placeholder="Thông tin thêm ..." />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem label="Latitude">
                  {getFieldDecorator('Lat', {
                    initialValue: editMode ? customer.Address.Lat : 0,
                    rules: [
                      {
                        required: true,
                        message: 'Tọa độ không chính xác !',
                      },
                    ],
                  })(<Input placeholder="Enter Latitude" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Longitude">
                  {getFieldDecorator('Lng', {
                    initialValue: editMode ? customer.Address.Lng : 0,
                    rules: [
                      {
                        required: true,
                        message: 'Tọa độ không chính xác !',
                      },
                    ],
                  })(<Input placeholder="Enter Longitude" />)}
                </FormItem>
              </Col>
            </Row>
            <FormItem label="Số nhà">
              {getFieldDecorator('StreetNumber', { initialValue: editMode ? customer.Address.StreetNumber : '' })(<Input type="text" placeholder="Số nhà" />)}
            </FormItem>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem label="Phố">
                  {getFieldDecorator('Street', { initialValue: editMode ? customer.Address.Street : '' })(<Input type="text" placeholder="Phố" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Quận/huyện">
                  {getFieldDecorator('District', { initialValue: editMode ? customer.Address.District : '' })(<Input type="text" placeholder="Quận/huyện" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem label="Tỉnh/thành phố">
                  {getFieldDecorator('City', { initialValue: editMode ? customer.Address.City : 'Hà Nội' })(<Input type="text" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Quốc gia">
                  {getFieldDecorator('Country', { initialValue: editMode ? customer.Address.Country : 'Việt Nam' })(<Input type="text" />)}
                </FormItem>
              </Col>
            </Row>
            {/* <Row gutter={24}>
              <Col span={12}>
                <FormItem label="Bắt đầu" required>
                  {getFieldDecorator('FromTime', {
                    initialValue: editMode
                      ? customer.TimeWindows && moment(1000 * customer.TimeWindows.FromTime)
                      : moment(),
                  })(<TimePicker format="HH:mm" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Kết thúc" required>
                  {getFieldDecorator('ToTime', {
                    initialValue: editMode
                      ? customer.TimeWindows && moment(1000 * customer.TimeWindows.ToTime)
                      : moment(),
                  })(<TimePicker format="HH:mm" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem label="Thời gian phục vụ" required>
                  {getFieldDecorator('ServerTime', { initialValue: editMode ? customer.ServerTime : 0 })(<Input addonAfter="phút" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Phương tiện vận chuyển">
                  {getFieldDecorator('DeliveryVehicle', {
                    valuePropName: 'checked',
                    initialValue: editMode ? customer.DeliveryVehicle : false,
                  })(<Checkbox>Ô tô</Checkbox>)}
                </FormItem>
              </Col>
            </Row> */}
          </Col>
        </Row>

        <FormItem>
          {editMode ? (
            <Button ghost style={{ border: 'none' }} type="danger" onClick={() => this.onDelete(customer.Name)}>
              Xoá
            </Button>
          ) : null}
          <Button style={{ float: 'right' }} type="primary" onClick={this.handleSubmit}>
            {editMode ? 'Hoàn thành' : 'Thêm khách hàng'}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

CustomerForm.propTypes = {
  editMode: PropTypes.bool,
  customer: PropTypes.object,
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

CustomerForm.defaultProps = {
  editMode: false,
  customer: {},
}

export default ToJS(Form.create()(CustomerForm))
