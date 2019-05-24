/* eslint react/prop-types: 0 */
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Modal, Row, Col, Button } from 'antd'
import WithPageHOC from '../../hoc/page'
import select from '../../util/select'
import ProductList from './components/List'
import ProductCard from './components/Card'
import FilterRow from './components/Filter'
import CustomerRequest from './components/CustomerRequest'
import ROUTER from '../../constants/router'

import { getProducts, getRequests, replyRequest } from './actions'
import { getProductConditionsIfNeed } from '../General/actions'

class ProductsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      showProductModal: false,
      showRequestModal: false,
      filterOptions: {},
    }
  }

  static getDerivedStateFromProps(props) {
    props.getProductConditionsIfNeed()
    return null
  }

  componentDidMount() {
    const { meta } = this.props
    this.props.getProducts({
      Page: meta.get('current'),
      PageSize: meta.get('pageSize'),
    })
  }

  handleAdd = () => this.props.history.push(ROUTER.PRODUCT.ADD);

  handleFilter = filterOptions => {
    this.setState({ filterOptions })
    this.props.getProducts({
      ...filterOptions,
      Page: 1,
      PageSize: 10,
    })
  };

  viewProduct = (e, product) => {
    e.preventDefault()
    this.setState({ product, showProductModal: true })
  };

  handleCancel = () => this.setState({ showProductModal: false, showRequestModal: false });

  editProduct = id => this.props.history.push(ROUTER.PRODUCT.EDIT.replace(':id', id));

  onChangePage = (Page, PageSize) => this.props.getProducts({
    ...this.state.filterOptions,
    Page,
    PageSize,
  });

  showRequest = () => this.setState({ showRequestModal: true });

  onFilterRequest = params => this.props.getRequests(params);

  onResolve = (id, payload) => this.props.replyRequest(id, payload);

  render() {
    const { products, meta, isFetching, conditions, requests } = this.props
    const { showProductModal, product, showRequestModal } = this.state
    return (
      <Fragment>
        <Row gutter={24}>
          <Col span={6}>
            <FilterRow conditions={conditions} onFilter={this.handleFilter} disabled={isFetching} />
          </Col>
          <Col span={18}>
            <Row>
              <Button icon="plus" disabled={isFetching} onClick={this.handleAdd}>
                Thêm hàng hóa
              </Button>

              <Button style={{ float: 'right' }} icon="database" disabled={isFetching} onClick={this.showRequest}>
                Yêu cầu mặt hàng
              </Button>
            </Row>
            <ProductList
              style={{ marginTop: 10 }}
              products={products}
              meta={meta}
              isFetching={isFetching}
              onEdit={this.editProduct}
              onView={this.viewProduct}
              onChangePage={this.onChangePage}
              onChangeSize={this.onChangePage}
            />
          </Col>
        </Row>

        <Modal
          title="Chi tiết hàng hóa"
          visible={showProductModal}
          closable={false}
          footer={[
            <Button key="edit" type="primary" onClick={() => this.editProduct(product.ID)}>
              Cập nhật
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <ProductCard product={product} />
        </Modal>
        <Modal
          width={1000}
          title="Yêu cầu mặt hàng"
          visible={showRequestModal}
          closable={false}
          centered
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <CustomerRequest requests={requests} onFilter={this.onFilterRequest} onResolve={this.onResolve} />
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  products: select(state, ['productReducer', 'list'], 'items'),
  conditions: select(state, ['generalReducer', 'productCondition'], 'items'),
  meta: select(state, ['productReducer', 'list'], 'meta'),
  isFetching: select(state, ['productReducer', 'list'], 'isFetching'),
  requests: select(state, ['productReducer', 'request'], 'items'),
})

const mapDispatchToProps = dispatch => ({
  getProducts: params => dispatch(getProducts(params)),
  getProductConditionsIfNeed: () => dispatch(getProductConditionsIfNeed()),
  getRequests: params => dispatch(getRequests(params)),
  replyRequest: (id, payload) => dispatch(replyRequest(id, payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPageHOC('product', 'data')(ProductsPage))
