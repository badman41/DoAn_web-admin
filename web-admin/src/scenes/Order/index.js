/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Row, Col, Card, notification, message, Radio, Divider } from 'antd'
import moment from 'moment'

import select from '../../util/select'
import {
  getCustomerProducts,
  addItem,
  insertInvoice,
  importInvoices,
} from './actions'
import { getInvoiceById } from '../Invoice/actions'
import { getCustomers } from '../Customer/actions'
import { changeAlias } from '../../util/formatText'

import ProductList from './components/ProductList'
import OrderForm from './components/OrderForm'
import UploadForm from './components/Form'

import router from '../../constants/router'
import PropTypes from 'prop-types'

class OrderPage extends Component {
  state = {
    products: [],
    filterText: '',
    isBatch: false,
    isImporting: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const products = nextProps.products.toJS()
    return {
      ...prevState,
      products: products.filter(
        item => changeAlias(item.ProductInfo.Name.toLowerCase()).indexOf(changeAlias(prevState.filterText.toLowerCase()))
          >= 0,
      ),
    }
  }

  componentDidMount = () => {
    this.props.getCustomers();
    if (this.props.editMode) {
      this.props.getInvoiceById(this.props.match.params.id);
    }else {
      this.props.addItem({ Items: [] });
    }
  };

  onChangeInsertType = ({ target: { value } }) => this.setState(() => ({ isBatch: value }));

  onChangeQuantity = (value, id) => {
    const order = this.props.order.toJS()
    order.Items = order.Items.map(item => {
      if (item.ProductID === id) {
        return {
          ...item,
          Quantity: Number(value),
        }
      }
      return item
    })
    this.props.addItem(order)
  };

  onAddItem = (product, Quantity) => {
    const order = this.props.order.toJS()
    let isExist = false
    if (order.Items.find(item => item.ProductID === product.ID)) {
      order.Items = order.Items.map(item => {
        if (item.ProductID === product.ID) {
          isExist = true
          return {
            ...item,
            Quantity: item.Quantity + Number(Quantity),
          }
        }
        return item
      })
    }
    if (!isExist) {
      order.Items = order.Items.concat({
        Deliveried: false,
        DeliveriedQuantity: 0,
        Note: '',
        ProductID: product.ID,
        ProductName: product.ProductInfo.Name,
        Quantity: Number(Quantity),
        UnitID: product.ProductInfo.OtherUnitOfProduct[0].UnitId,
        UnitName: product.ProductInfo.OtherUnitOfProduct[0].Name,
        Price: product.ProductInfo.OtherUnitOfProduct[0].Price,
        TotalPrice: product.ProductInfo.OtherUnitOfProduct[0].Price * Number(Quantity),
        Weight: 0,
      })
    }
    this.props.addItem(order)
  };

  removeProduct = id => {
    const order = this.props.order.toJS()
    order.Items = order.Items.filter(item => item.ProductID !== id)
    this.props.addItem(order)
  };

  onFilterProduct = ({ target: { value } }) => this.setState(() => ({ filterText: value }));

  handleChangeCustomer = value => {
    this.props.getProducts(value)
  }

  handleSubmit = orderMeta => {
    const orderItems = this.props.order.toJS()
    if (orderItems.Items.length) {
      this.props.insertInvoice(
        {
          ...orderItems,
          ...orderMeta,
        },
        {
          onSuccess: () => {
            notification.success({ message: 'Đơn hàng đã được tiếp nhận' })
            this.props.history.push(router.INVOICE.INDEX)
            this.props.addItem({ Items: [] })
          },
          onError: () => notification.error({ message: 'Có lỗi xảy ra, vui lòng thử lại !' }),
        },
      )
    } else {
      message.warning('Giỏ hàng trống')
    }
  };

  handleUpload = async ({ current: { files } }, date) => {
    this.setState({ isImporting: true })
    const formData = new FormData()
    formData.append('file', files[0])
    this.props.importInvoices(
      {
        date: moment(date).toISOString(),
        payload: formData,
        //params: { date: moment(date).toISOString() },
      },
      {
        onSuccess: data => {
          notification.success({
            message: 'Chi tiết',
            description: (
              <div>
                <div>{`${data.Success && data.Success.length} đơn hàng được thêm`}</div>
                <div>{`${data.CustomerFail.length} mã khách hàng lỗi: ${data.CustomerFail.join(' , ')}`}</div>
                <div>{`${data.ProductFail.length} mã sản phẩm lỗi: ${data.ProductFail.join(' , ')}`}</div>
              </div>
            ),
            duration: 15,
          })
          this.setState({ isImporting: false })
          this.props.history.push(router.INVOICE.INDEX)
          this.props.getInvoices({
            page: 1,
            page_size: 10,
          })
        },
        onError: error => {
          notification.error({ message: `${error} - Thêm thất bại ! Vui lòng thử lại !` })
        },
      },
    )
  };

  render() {
    const { editMode, order, customers, isFetching } = this.props;
    debugger;
    console.log(order);
    const { products, isBatch, isImporting } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col span={10} offset={7}>
            <Radio.Group value={isBatch} buttonStyle="solid" onChange={this.onChangeInsertType}>
              <Radio.Button value={false}>Thêm một đơn hàng</Radio.Button>
              <Radio.Button value>Thêm nhiều đơn hàng </Radio.Button>
            </Radio.Group>
            <Divider dashed />
          </Col>
        </Row>
        {isBatch ? (
          <Card>
            <UploadForm
              isFetching={isImporting}
              supportContent={(
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/spreadsheets/d/1fj510bhmC-bRKf8Yc6RUUOnLlKP7MksW_ESCViQVahM/edit?usp=sharing"
                >
                  Mẫu file excel
                </a>
              )}
              contentLoading="Đang xử lí dữ liệu"
              onUpload={this.handleUpload}
            />
          </Card>
        ) : (
          <Row gutter={10}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ marginTop: 10 }}>
              <ProductList products={products} onFilterProduct={this.onFilterProduct} onAddItem={this.onAddItem} isFetching={isFetching} />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ marginTop: 10 }}>
              <OrderForm
                editMode={editMode}
                options={customers}
                order={order}
                disabled={isFetching}
                onChangeQuantity={this.onChangeQuantity}
                onChangeCustomer={this.handleChangeCustomer}
                onSubmit={this.handleSubmit}
              />
            </Col>
          </Row>
        )}
      </React.Fragment>
    )
  }
}
OrderPage.propTypes = {
  getInvoiceById: PropTypes.func,
  getProducts: PropTypes.func,
  getCustomers: PropTypes.func,
  addItem: PropTypes.func,
  insertInvoice: PropTypes.func,
  importInvoices: PropTypes.func,
};
OrderPage.defaultProps = {
  getInvoiceById: () => {},
};
const mapStateToProps = state => ({
  customers: select(state, ['customerReducer', 'listAll'], 'items'),
  products: select(state, ['orderReducer', 'product'], 'items'),
  order: select(state, ['orderReducer', 'order'], 'item'),
  isFetching: select(state, ['orderReducer', 'product'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getProducts: id => dispatch(getCustomerProducts(id)),
  getCustomers: () => dispatch(getCustomers()),
  addItem: payload => dispatch(addItem(payload)),
  insertInvoice: (payload, meta) => dispatch(insertInvoice(payload, meta)),
  importInvoices: (date, payload, meta) => dispatch(importInvoices(date, payload, meta)),
  getInvoiceById: id => dispatch(getInvoiceById(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  //state => ({ order: select(state, 'orderReducer', 'order'), user: select(state, 'authReducer', 'authUser') }),
)((withRouter(OrderPage)))
