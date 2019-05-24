import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Select, Form, InputNumber } from 'antd'
import toJs from '../../../../hoc/toJs'
import { changeAlias } from '../../../../util/formatText'

class PriceForm extends Component {
  state = { allowedUnits: [], currentProductCode: '' };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.editMode) {
      const product = nextProps.products.find(item => item.ProductInfo.Code === nextProps.price.ProductCode)
      const allowedUnits = product.ProductInfo.OtherUnitOfProduct ? product.ProductInfo.OtherUnitOfProduct : []
      return {
        allowedUnits,
        currentProductCode: nextProps.price.ProductCode,
      }
    }
    const product = nextProps.products.find(item => item.ProductInfo.Code === prevState.currentProductCode)
    if (product) {
      const allowedUnits = product.ProductInfo.OtherUnitOfProduct ? product.ProductInfo.OtherUnitOfProduct : []
      return {
        ...prevState,
        allowedUnits,
      }
    }
    return null
  }

  componentDidMount() {
    if (!this.props.editMode) this.setState({ allowedUnits: [], currentProductCode: '' })
  }

  onChangeProduct = value => this.setState(() => ({ currentProductCode: value }));

  filterOption = (input, option) => changeAlias(option.props.children.toLowerCase()).indexOf(changeAlias(input.toLowerCase())) >= 0

  render() {
    const {
      products,
      price,
      editMode,
      form: { getFieldDecorator },
    } = this.props
    const { allowedUnits, currentProductCode } = this.state
    return (
      <Form>
        <Form.Item label="Tên sản phẩm">
          {getFieldDecorator('ProductCode', {
            initialValue: editMode ? price.ProductCode : '',
            rules: [
              {
                required: true,
                message: 'Chọn sản phẩm',
              },
            ],
          })(
            <Select
              showSearch
              disabled={editMode}
              optionFilterProp="children"
              onChange={this.onChangeProduct}
              filterOption={(input, option) => changeAlias(option.props.children.toLowerCase()).indexOf(changeAlias(input.toLowerCase())) >= 0
              }
            >
              {products.map((item, index) => (
                <Select.Option key={`${index + 1}`} value={item.ProductInfo.Code}>
                  {`(${item.ProductInfo.Code}) ${item.ProductInfo.Name}`}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Đơn vị tính">
          {getFieldDecorator('UnitID', {
            initialValue: editMode ? price.Prices.length && price.Prices[0].UnitID : '',
            rules: [
              {
                required: true,
                message: 'Chọn đơn vị tính',
              },
            ],
          })(
            <Select
              showSearch
              disabled={currentProductCode === ''}
              optionFilterProp="children"
              filterOption={this.filterOption}
            >
              {allowedUnits.map((item, index) => (
                <Select.Option key={`${index + 1}`} value={item.ID}>
                  {item.Name}
                </Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Giá sản phẩm">
          {getFieldDecorator('Price', {
            initialValue: editMode ? price.Prices.length && price.Prices[0].Price : 0,
            rules: [
              {
                required: true,
                message: 'Nhập giá sản phẩm',
              },
            ],
          })(
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={10000000}
              step={100}
              formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|đ|(,*)/g, '')}
            />,
          )}
        </Form.Item>
      </Form>
    )
  }
}

PriceForm.propTypes = {
  products: PropTypes.array,
  // eslint-disable-next-line react/no-unused-prop-types
  units: PropTypes.array,
  price: PropTypes.object,
  editMode: PropTypes.bool,
  form: PropTypes.object,
}

PriceForm.defaultProps = {
  products: [],
  units: [],
  price: {},
  editMode: false,
  form: {},
}

export default toJs(Form.create()(PriceForm))
