import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, notification, Row, Col } from 'antd'

import { getAccounts, registerAdmin } from './actions'
import select from '../../util/select'
import AccountList from './components/AccountList'
import Filter from './components/filterAccount'
import AdminForm from './components/AdminForm'
import ROUTER from '../../constants/router'

class Account extends Component {
  state = { filterOptions: {} }

  componentDidMount() {
    this.props.getAccounts({ Page: 1, PageSize: 10 })
  }

  changePage = (Page, PageSize) => this.props.getAccounts({ ...this.state.filterOptions, Page, PageSize });

  handleRegister = values => {
    this.props.registerAdmin(values, {
      onSuccess: () => {
        notification.success({ message: 'Tạo tài khoản quản lí thành công' })
        this.props.getAccounts({ Page: 1, PageSize: 10 })
      },
      onError: () => {
        notification.success({ message: 'Tạo tài khoản quản lí thành công' })
        this.props.getAccounts({ Page: 1, PageSize: 10 })
      },
    })
  };

  handleFilter = filterOptions => {
    this.setState({ filterOptions })
    this.props.getAccounts({ ...filterOptions, Page: 1, PageSize: 10 })
  }

  render() {
    const { accounts, meta, isFetching } = this.props
    return (
      <React.Fragment>
        <AdminForm onRegister={this.handleRegister} />
        <Divider />
        <Row gutter={24}>
          <Col span={6}>
            <Filter onFilter={this.handleFilter} disabled={isFetching} />
          </Col>
          <Col span={18}>
            <AccountList
              dataSource={accounts}
              meta={meta}
              isFetching={isFetching}
              onChange={this.changePage}
              onShowSizeChange={this.changePage}
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  accounts: select(state, ['generalReducer', 'account'], 'items'),
  isFetching: select(state, ['generalReducer', 'account'], 'isFetching'),
  meta: select(state, ['generalReducer', 'account'], 'meta'),
})

const mapDispatchToProps = dispatch => ({
  getAccounts: params => dispatch(getAccounts(params)),
  registerAdmin: (payload, meta) => dispatch(registerAdmin(payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account)
