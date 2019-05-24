/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Row, Col } from 'antd'

import CountData from './components/count-data'
import CountMeta from './components/count-meta'
import Chart from './components/chart'
import Pie from './components/pie'

import Actions from '../actions'
import select from '../../util/select'

const {
  getDrivers,
  getCustomers,
  getVehicles, getInvoices, getProducts, getSchedules,
  getVehicleTypes, getProductConditions, getProductUnits, getAccounts,
} = Actions

class DashBoard extends Component {
  state = {}

  componentDidMount() {
    this.props.getCustomers({ page: 1, pageSize: 10 })
    this.props.getDrivers({ Page: 1, PageSize: 10 })
    this.props.getProducts({ Page: 1, PageSize: 10 })
    this.props.getVehicles({ page: 1, pageSize: 10 })
    this.props.getSchedules({ Page: 1, PageSize: 10 })

    this.props.getAccounts()
    this.props.getInvoices()

    this.props.getProductConditions()
    this.props.getProductUnits()
    this.props.getVehicleTypes()
  }

  render() {
    const {
      countDriver, countInvoice, countCustomer, countVehicle, countProduct,
      countProductCondition, countProductUnit, countVehicleType, countAccount,
      account, invoice,
    } = this.props
    return (
      <div>
        <CountData count={{
          countDriver: countDriver.get('total'),
          countCustomer: countCustomer.get('total'),
          countVehicle: countVehicle.get('total'),
          countProduct: countProduct.get('total'),
        }}
        />
        <Row style={{ marginTop: 100, marginBottom: 100 }}>
          <Col span={12}>
            <Chart />
          </Col>
          <Col span={6}>
            <Pie data={account} />
            <h2 style={{ textAlign: 'center' }}>{`${countAccount} Tài khoản `}</h2>
          </Col>
          <Col span={6}>
            <Pie data={invoice} />
            <h2 style={{ textAlign: 'center' }}>{`${countInvoice.get('total')} Đơn hàng`}</h2>
          </Col>
        </Row>
        <CountMeta
          count={{ countProductCondition, countProductUnit, countVehicleType, countAccount }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  countDriver: select(state, 'driverReducer', 'meta'),
  countProduct: select(state, ['productReducer', 'list'], 'meta'),
  countInvoice: select(state, ['invoiceReducer', 'list'], 'meta'),
  countCustomer: select(state, ['customerReducer', 'customer'], 'meta'),
  countVehicle: select(state, 'vehicleReducer', 'meta'),

  countVehicleType: select(state, 'dashboardReducer', 'countVehicleType'),
  countProductCondition: select(state, 'dashboardReducer', 'countProductCondition'),
  countProductUnit: select(state, 'dashboardReducer', 'countProductUnit'),
  countAccount: select(state, 'dashboardReducer', 'countAccount'),

  account: select(state, 'dashboardReducer', 'account'),
  invoice: select(state, 'dashboardReducer', 'invoice'),
})

const mapDispatchToProps = dispatch => ({
  getCustomers: params => dispatch(getCustomers(params)),
  getDrivers: params => dispatch(getDrivers(params)),
  getInvoices: params => dispatch(getInvoices(params)),
  getProducts: params => dispatch(getProducts(params)),
  getVehicles: params => dispatch(getVehicles(params)),
  getSchedules: params => dispatch(getSchedules(params)),
  getAccounts: params => dispatch(getAccounts(params)),

  getVehicleTypes: () => dispatch(getVehicleTypes()),
  getProductConditions: () => dispatch(getProductConditions()),
  getProductUnits: () => dispatch(getProductUnits()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
