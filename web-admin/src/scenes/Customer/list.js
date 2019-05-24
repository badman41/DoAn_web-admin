/* eslint react/prop-types: 0 */
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Modal, Row, Col, Button } from 'antd'

import WithPageHOC from '../../hoc/page'
import CustomerList from './components/List'
import CustomerCard from './components/Card'
import FilterRow from './components/Filter'

import { getCustomers, importCustomers } from './actions'

import ROUTER from '../../constants/router'

import select from '../../util/select'

class CustomersPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customer: {},
      showCustomerModal: false,
    }
  }

  componentDidMount() {
    const { meta } = this.props
    this.props.getCustomers({
      page: meta.get('current') === 0 ? 1 : meta.get('current'),
      pageSize: meta.get('pageSize') === 0 ? 10 : meta.get('pageSize'),
    })
  }

  handleAdd = () => this.props.history.push(ROUTER.CUSTOMER.ADD);

  handleFilter = filterOptions => {
    this.props.getCustomers({
      ...filterOptions,
      page: 1,
      pageSize: 10,
    })
  };

  viewCustomer = (e, customer) => {
    e.preventDefault()
    this.setState({ customer, showCustomerModal: true })
  };

  handleCancel = () => this.setState({ showCustomerModal: false });

  editCustomer = customer => {
    this.props.history.push(ROUTER.CUSTOMER.EDIT.replace(':id', customer.ID))
  };

  onChangePage = (page, pageSize) => this.props.getCustomers({
    ...this.state.pagingOptions,
    pageSize,
    page,
  });

  render() {
    const { showCustomerModal, customer } = this.state
    const { customers, meta, isFetching } = this.props
    return (
      <Fragment>
        <Row gutter={24}>
          <Col span={6}>
            <FilterRow onFilter={this.handleFilter} disabled={isFetching} />
          </Col>
          <Col span={18}>
            <Button icon="plus" onClick={this.handleAdd}>
              Thêm khách hàng
            </Button>
            <CustomerList
              style={{ marginTop: 10 }}
              customers={customers}
              isFetching={isFetching}
              meta={meta}
              onView={this.viewCustomer}
              onEdit={this.editCustomer}
              onChangePage={this.onChangePage}
              onChangeSize={this.onChangePage}
            />
          </Col>
        </Row>

        <Modal
          title="Chi tiết khách hàng"
          visible={showCustomerModal}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          closable={false}
          footer={[
            <Button key="edit" type="primary" onClick={() => this.editCustomer(customer)}>
              Cập nhật
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <CustomerCard customer={customer} />
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  customers: select(state, ['customerReducer', 'customer'], 'items'),
  meta: select(state, ['customerReducer', 'customer'], 'meta'),
  isFetching: select(state, ['customerReducer', 'customer'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getCustomers: params => dispatch(getCustomers(params)),
  importCustomers: (payload, meta) => dispatch(importCustomers(payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPageHOC('customer', 'data')(CustomersPage))
