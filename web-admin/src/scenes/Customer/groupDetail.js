/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import {
  getCustomerOfGroup,
  addCustomerToGroup,
  removeCustomerFromGroup,
  getCustomers,
} from './actions'
import select from '../../util/select'

import CustomerList from './components/List'
import SelectCustomerForm from './components/SelectCustomerForm'
import ROUTER from '../../constants/router'

class DetailGroup extends Component {
  async componentDidMount() {
    this.props.getCustomerOfGroup(this.props.match.params.id, { page: 1, page_size: 10 })
    this.props.getCustomers()
  }


  handleSubmit = selected => {
    Promise.all(
      selected.map(item => this.props.addCustomerToGroup(this.props.match.params.id, { customer_id: item })),
    ).then(() => this.props.getCustomerOfGroup(this.props.match.params.id))
  };

  onChangePage = (page, pageSize) => this.props.getCustomerOfGroup(this.props.match.params.id, { page, page_size: pageSize });
  
  editCustomer = customer => {
    this.props.history.push(ROUTER.CUSTOMER.EDIT.replace(':id', customer.ID))
  };

  render() {
    const { customers, isFetching, allCustomers, meta } = this.props
    return (
      <Card>
        <SelectCustomerForm customers={allCustomers} onSubmit={this.handleSubmit} />
        <CustomerList
          customers={customers}
          meta={meta}
          isFetching={isFetching}
          onEdit={this.editCustomer}
          onChangePage={this.onChangePage}
          onChangeSize={this.onChangePage}
        />
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  allCustomers: select(state, ['customerReducer', 'customer'], 'items'),
  customers: select(state, ['customerReducer', 'listByGroup'], 'items'),
  meta: select(state, ['customerReducer', 'listByGroup'], 'meta'),
  isFetching: select(state, ['customerReducer', 'listByGroup'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getCustomers: () => dispatch(getCustomers()),
  getCustomerOfGroup: (id, params) => dispatch(getCustomerOfGroup(id, params)),
  addCustomerToGroup: (id, payload) => dispatch(addCustomerToGroup(id, payload)),
  removeCustomerFromGroup: (payload, meta) => dispatch(removeCustomerFromGroup(payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailGroup)
