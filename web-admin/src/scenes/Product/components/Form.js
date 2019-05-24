import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Button, InputNumber, Row, Col, Divider } from 'antd'
import ToJS from '../../../hoc/toJs'

const { Item } = Form
const { Option } = Select
const { TextArea } = Input

class ProductForm extends React.Component {
  state = { OtherUnitOfProduct: [], currentProductCode: '' };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.editMode
      && ((nextProps.product
        && nextProps.product.ProductInfo
        && nextProps.product.ProductInfo.OtherUnitOfProduct
        && prevState.OtherUnitOfProduct.length === 0
        && nextProps.product.ProductInfo.OtherUnitOfProduct.length > 0)
        || (nextProps.product
          && nextProps.product.ProductInfo
          && nextProps.product.ProductInfo.Code !== prevState.currentProductCode))
    ) {
      return {
        currentProductCode: nextProps.product.ProductInfo.Code,
        OtherUnitOfProduct: nextProps.product.ProductInfo.OtherUnitOfProduct ? nextProps.product.ProductInfo.OtherUnitOfProduct : [],
      }
    }
    return null
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { Code, Name, StoreCondition, UnitID, WeightPerUnit, Note } = values
        const condition = this.props.conditions.find(item => item.ID === StoreCondition)
        const OtherUnitOfProduct = this.state.OtherUnitOfProduct.filter(item => item.ID !== '')
        this.props.onSubmit({
          Product: {
            Code,
            Name,
            UnitID,
            WeightPerUnit,
            Note,
            OtherUnitOfProduct,
            Preservation: {
              ID: condition.ID,
              Description: condition.Description,
            },
          },
        })
      }
    })
  };

  onAddUnit = () => {
    const { OtherUnitOfProduct } = this.state
    OtherUnitOfProduct.push({
      ID: '',
      WPU: 1,
      Name: '',
    })
    this.setState({ OtherUnitOfProduct })
  };

  onRemoveUnit = index => {
    this.setState(prevState => ({ OtherUnitOfProduct: prevState.OtherUnitOfProduct.filter((item, idx) => idx !== index) }))
  };

  onChangeOtherUnit = (value, index, field) => {
    const { units } = this.props
    const { OtherUnitOfProduct } = this.state
    OtherUnitOfProduct[index][field] = value
    debugger;
    if (field === 'ID') {
      const unit = units.find(item => item.ID === value)
      OtherUnitOfProduct[index].Name = unit.Name
    }
    this.setState({ OtherUnitOfProduct })
  };

  renderOtherUnit = () => {
    const { units } = this.props
    return this.state.OtherUnitOfProduct.map((item, index) => (
      <React.Fragment key={`${index + 1}`}>
        <Col span={12}>
          <Item label={index === 0 ? 'Đơn vị tính' : ''}>
            <Select
              placeholder="Chọn đơn vị"
              value={item.ID}
              onChange={value => this.onChangeOtherUnit(value, index, 'ID')}
            >
              {units
                ? units.map((element, index) => (
                  <Option value={element.ID} key={`${index + 1}`}>
                    {element.Name}
                  </Option>
                ))
                : ''}
            </Select>
          </Item>
        </Col>
        <Col span={9}>
          <Item label={index === 0 ? 'Chuyển sang kg' : ''}>
            <InputNumber
              value={item.WPU}
              type="text"
              min={0}
              style={{ width: '100%' }}
              onChange={value => this.onChangeOtherUnit(value, index, 'WPU')}
            />
          </Item>
        </Col>
        <Col span={3}>
          <Item label={index === 0 ? 'Xoá' : ''}>
            {this.state.OtherUnitOfProduct.length > 1 && <Button shape="circle" icon="minus" onClick={() => this.onRemoveUnit(index)} />}
          </Item>
        </Col>
      </React.Fragment>
    ))
  };

  render() {
    const {
      units,
      conditions,
      product,
      editMode,
      form: { getFieldDecorator },
    } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Item label="Mã hàng hóa">
          {getFieldDecorator('Code', {
            initialValue: editMode ? product.ProductInfo && product.ProductInfo.Code : '',
            rules: [
              {
                required: true,
                message: 'Hãy nhập mã hàng hóa',
              },
            ],
          })(<Input type="text" placeholder="Mã hàng hóa" />)}
        </Item>
        <Item label="Tên hàng hóa">
          {getFieldDecorator('Name', {
            initialValue: editMode ? product.ProductInfo && product.ProductInfo.Name : '',

            rules: [{ required: true, message: 'Hãy nhập tên hàng hóa' }],
          })(<Input type="text" placeholder="Tên hàng hóa" />)}
        </Item>
        <Item label="Điều kiện bảo quản">
          {getFieldDecorator('StoreCondition', {
            initialValue: editMode
              ? product.ProductInfo && product.ProductInfo.Preservation && product.ProductInfo.Preservation.ID
              : null,
          })(
            <Select placeholder="Điều kiện bảo quản">
              {conditions.map((item, index) => (
                <Option value={item.ID} key={`${index + 1}`}>
                  {item.Description}
                </Option>
              ))}
            </Select>,
          )}
        </Item>
        <Divider>Đơn vị tính thông thường</Divider>
        <Row gutter={10}>
          <Col span={12}>
            <Item label="Đơn vị tính">
              {getFieldDecorator('UnitID', {
                initialValue: editMode ? product.ProductInfo && product.ProductInfo.Unit.ID : '',

                rules: [
                  {
                    required: true,
                    message: 'Chọn đơn vị tính cho hàng hóa',
                  },
                ],
              })(
                <Select placeholder="Chọn đơn vị">
                  {units
                    ? units.map((element, index) => (
                      <Option value={element.ID} key={`${index + 1}`}>
                        {element.Name}
                      </Option>
                    ))
                    : ''}
                </Select>,
              )}
            </Item>
          </Col>
          <Col span={9}>
            <Item label="Chuyển sang kg">
              {getFieldDecorator('WeightPerUnit', { initialValue: editMode ? product.ProductInfo && product.ProductInfo.WeightPerUnit : 0 })(<InputNumber type="text" min={0} style={{ width: '100%' }} />)}
            </Item>
          </Col>
          <Divider>Đơn vị tính trong báo giá</Divider>
          {this.renderOtherUnit()}
          <Col span={24}>
            <Button type="primary" onClick={this.onAddUnit} style={{ width: '100%' }}>
              Thêm đơn vị tính
            </Button>
          </Col>
        </Row>

        <Item label="Ghi chú">
          {getFieldDecorator('Note', { initialValue: editMode ? product.ProductInfo && product.ProductInfo.Note : '' })(<TextArea type="text" placeholder="Thông tin thêm ..." />)}
        </Item>

        <Item style={{ float: 'right' }}>
          <Button type="primary" htmlType="submit">
            {editMode ? 'Hoàn thành' : 'Thêm hàng hóa'}
          </Button>
        </Item>
      </Form>
    )
  }
}

ProductForm.propTypes = {
  units: PropTypes.array,
  conditions: PropTypes.array,
  product: PropTypes.object,
  editMode: PropTypes.bool,
  form: PropTypes.object,
  onSubmit: PropTypes.func,
}

ProductForm.defaultProps = {
  units: [],
  conditions: [],
  product: {},
  form: {},
  editMode: false,
  onSubmit: () => {},
}

export default Form.create()(ToJS(ProductForm))
