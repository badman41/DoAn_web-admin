/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Row, Col } from 'antd'

import moment from 'moment'
import InvoiceList from '../components/invoice-list'
import InvoiceModal from '../../Invoice/components/InvoiceModal'
import InvoiceFilterForm from '../components/invoice-filter-form'
import MethodForm from '../components/method-form'

import { selectInvoicesForVrp, setFilterTime } from '../actions'
import { getInvoices } from '../../Invoice/actions'

import select from '../../../util/select'

class PrepareInvoice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInvoiceDetail: false,
      invoice: {},
    }
  }

  handleView = invoice => this.setState({ showInvoiceDetail: true, invoice });

  handleCancel = () => this.setState({ showInvoiceDetail: false });

  filterInvoices = time => {
    this.props.setFilterTime(time)
    this.props.getInvoices({ from_time: time })
  };

  onSelectInvoices = selectedInvoices => {
    this.props.selectInvoicesForVrp(
      this.props.invoices.filter(invoice => selectedInvoices.includes(invoice.get('ID'))),
    )
  };

  render() {
    const { invoices, isFetching, selectedInvoices, isVrp, onChangeMethod } = this.props
    const { showInvoiceDetail, invoice } = this.state
    return (
      <div>
        <Row gutter={24}>
          <Col span={12}>
            <InvoiceFilterForm onSubmit={this.filterInvoices} />
          </Col>
          <Col span={12}>
            <MethodForm isVrp={isVrp} onChangeMethod={onChangeMethod} />
          </Col>
        </Row>

        <InvoiceList
          invoices={invoices}
          isFetching={isFetching}
          selectedInvoices={selectedInvoices}
          onSelectInvoices={this.onSelectInvoices}
          onView={this.handleView}
        />
        <Divider />
        <InvoiceModal
          title={invoice && `${invoice.CustomerName} - ${moment(invoice.DeliveryTime).format('DD/MM/YYYY')}`}
          visible={showInvoiceDetail}
          invoice={invoice}
          onCancel={this.handleCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  invoices: select(state, ['invoiceReducer', 'list'], 'items'),
  isFetching: select(state, ['invoiceReducer', 'list'], 'isFetching'),
  selectedInvoices: select(state, 'routingReducer', 'invoices'),
})

const mapDispatchToProps = dispatch => ({
  selectInvoicesForVrp: selectedInvoices => dispatch(selectInvoicesForVrp(selectedInvoices)),
  setFilterTime: time => dispatch(setFilterTime(time)),
  getInvoices: filterOptions => dispatch(getInvoices(filterOptions)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrepareInvoice)
