/* eslint react/prop-types: 0 */
import React from 'react'
import { Row, Col, Card, notification, Tabs } from 'antd'
import { connect } from 'react-redux'

import WithPageHOC from '../../hoc/page'
import CustomerForm from './components/customer-form'
import PriceTable from './components/price-table'
import UploadFrom from './components/price-table-modal'

import select from '../../util/select'
import {
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getPriceTable,
  getPriceTableIfNeed,
  addItemToPriceTable,
  removeItemFromPriceTable,
  updateItemInPriceTable,
  importPriceTable,
} from './actions'
import { getProducts } from '../Product/actions'
import { getProductUnits } from '../General/actions'
import ROUTER from '../../constants/router'

class EditCustomerPage extends React.Component {
  state = {
    showImportModal: false,
    error: false,
    hasResult: false,
    result: {},
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getProductUnits()
  }

  static getDerivedStateFromProps(props) {
    const { meta } = props
     props.getCustomer(props.match.params.id)
    if (props.customer.get('Code')) {
      props.getPriceTableIfNeed(props.customer.get('Code'), {
        page: meta.get('current'),
        pageSize: meta.get('pageSize'),
      })
    }
    return null
  }

  onChangePage = (page, pageSize) => this.props.getPriceTable(this.props.customer.get('Code'), { page, pageSize })

  toggleImportModal = () => this.setState(prevState => ({ showImportModal: !prevState.showImportModal }))

  handleUpload = (params, payload) => {
    this.props.importPriceTable(params, payload, {
      onSuccess: result => {
        this.setState(
          () => ({ result, hasResult: true, error: false }),
          () => {
            notification.success({ message: 'Thêm thành công' })
          }
        )
      },
      onError: error => {
        this.setState(
          () => ({ result: { error }, hasResult: true, error: true }),
          () => {
            notification.success({ message: 'Thêm thất bại' })
          }
        )
      },
    })
  }

  handleSubmit = formData => {
    debugger;
    this.props.updateCustomer(this.props.match.params.id, formData, {
      onSuccess: () => {
        notification.success({ message: 'Sửa thông tin khách hàng thành công' })
        this.props.history.push(ROUTER.CUSTOMER.INDEX)
      },
      onError: error => notification.error({ message: `${error} - Sửa thông tin khách hàng thất bại` }),
    })
  }

  handleDelete = () => {
    this.props.history.push(ROUTER.CUSTOMER.INDEX)
    this.props.deleteCustomer(this.props.match.params.id, {
      onSuccess: () => {
        notification.success({ message: 'Xoá khách hàng thành công' })
      },
      onError: error => notification.error({ message: `${error} - Xóa khách hàng thất bại` }),
    })
  }

  render() {
    const {
      customer,
      products,
      units,
      priceTable,
      meta,
      isFetching,
      isPriceTableFetching,
      addItemToPriceTable,
      removeItemFromPriceTable,
      updateItemInPriceTable,
    } = this.props
    const { showImportModal, error, hasResult, result } = this.state
    return (
      <Row>
        <Col span={24}>
          <Tabs>
            <Tabs.TabPane key="customer" tab="Thông tin">
              <Card title="Sửa thông tin khách hàng">
                <CustomerForm
                  isFetching={isFetching}
                  editMode
                  customer={customer}
                  onSubmit={this.handleSubmit}
                  onDelete={this.handleDelete}
                />
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane key="priceTable" tab="Báo giá">
              <PriceTable
                dataSource={priceTable}
                meta={meta}
                onChangePage={this.onChangePage}
                isFetching={!showImportModal && isPriceTableFetching}
                products={products}
                units={units}
                addItem={addItemToPriceTable}
                updateItem={updateItemInPriceTable}
                removeItem={removeItemFromPriceTable}
                isCustomerGroup={false}
                onOpenImportModal={this.toggleImportModal}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
        <UploadFrom
          visible={showImportModal}
          onCloseModal={this.toggleImportModal}
          customerCode={customer.get('Code')}
          isFetching={showImportModal && isPriceTableFetching}
          showGroup={false}
          onUpload={this.handleUpload}
          hasResult={hasResult}
          error={error}
          result={result}
        />
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  customer: select(state, ['customerReducer', 'customer'], 'editingCustomer'),
  units: select(state, ['generalReducer', 'productUnit'], 'items'),
  products: select(state, ['productReducer', 'list'], 'items'),
  priceTable: select(state, ['customerReducer', 'priceTable'], 'items'),
  meta: select(state, ['customerReducer', 'priceTable'], 'meta'),
  didInvalidate: select(state, ['customerReducer', 'priceTable'], 'didInvalidate'),
  isFetching: select(state, ['customerReducer', 'customer'], 'isFetching'),
  isPriceTableFetching: select(state, ['customerReducer', 'priceTable'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getCustomer: id => dispatch(getCustomer(id)),
  getProducts: () => dispatch(getProducts()),
  getProductUnits: () => dispatch(getProductUnits()),
  getPriceTable: (code, params) => dispatch(getPriceTable(code, params)),
  getPriceTableIfNeed: (code, params) => dispatch(getPriceTableIfNeed(code, params)),
  updateCustomer: (id, payload, meta) => dispatch(updateCustomer(id, payload, meta)),
  addItemToPriceTable: (id, payload, meta) => dispatch(addItemToPriceTable(id, payload, meta)),
  removeItemFromPriceTable: (id, payload, meta) => dispatch(removeItemFromPriceTable(id, payload, meta)),
  updateItemInPriceTable: (id, payload, meta) => dispatch(updateItemInPriceTable(id, payload, meta)),
  importPriceTable: (params, payload, meta) => dispatch(importPriceTable(params, payload, meta)),
  deleteCustomer: (id, meta) => dispatch(deleteCustomer(id, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithPageHOC('customer', 'data')(EditCustomerPage))
