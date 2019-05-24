/* eslint react/prop-types: 0 */
import React, { Component, Fragment } from 'react'
import { Row, Col, notification } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import { json2excel } from 'js2excel'

import InvoiceList from './components/List'
import InvoiceModal from './components/InvoiceModal'
import Filter from './components/Filter'
import ResultModal from './components/result-modal'
import ReportModal from './components/report-modal'

import select from '../../util/select'
import { getResetTimeString } from '../../util/formatTime'
import { getInvoices, checkOrdered, reportInvoices } from './actions'
import { getCustomers } from '../Customer/actions'

import WithPageHOC from '../../hoc/page'
import router from '../../constants/router'
import { INVOICE_STATUS } from '../../constants/enum';

class InvoicePage extends Component {
  state = {
    showOrderResult: false,
    showInvoiceCard: false,
    showReportModal: false,
    filterOptions: {},
  };

  componentDidMount() {
    const { meta } = this.props
    this.props.getCustomers()
    this.props.getInvoices({
      page: meta.get('current') === 0 ? 1 : meta.get('current'),
      page_size: meta.get('pageSize') === 0 ? 10 : meta.get('pageSize'),
    })
  }

  handleAdd = () => this.props.history.push(router.INVOICE.ADD);

  handleView = (e, invoice) => {
    e.preventDefault()
    this.setState({ invoice, showInvoiceCard: true })
  };

  handleCancel = () => this.setState({
    showInvoiceCard: false,
    showOrderResult: false,
    showReportModal: false,
  });

  handleFilter = filterOptions => {
    this.setState({
      filterOptions: {
        ...filterOptions,
        from_time: getResetTimeString(filterOptions.from_time),
      },
    })
    this.props.getInvoices({
      ...filterOptions,
      from_time: getResetTimeString(filterOptions.from_time),
      page: 1,
      page_size: 10,
    })
  };

  onChangePage = (page, pageSize) => this.props.getInvoices({
    ...this.state.filterOptions,
    page,
    page_size: pageSize,
  });

  exportExcel = async () => {
    const { invoice } = this.state
    const data = await invoice.Items.map((item, index) => {
      const newItem = {}
      newItem.STT = index + 1
      newItem['Vật tư'] = item.ProductName
      newItem['ĐVT'] = item.UnitName
      newItem['Số lượng'] = item.Quantity
      return newItem
    })
    try {
      json2excel({
        data,
        name: invoice.CustomerCode,
        formateDate: 'yyyy/mm/dd',
      })
    } catch (e) {
      console.log(e)
      notification.error({ message: 'Lỗi ! Có thể trình duyệt của bạn không hỗ trợ ! Vui lòng liên hệ nhà phát triển !' })
    }
  };

  onShowDetail = id => this.props.history.push(router.INVOICE.DETAIL.replace(':id', id));

  checkOrdered = () => {
    this.setState({ showOrderResult: true })
  };

  onCheckOrdered = params => this.props.checkOrdered(params);

  handleReport = () => this.setState(() => ({ showReportModal: true }));

  handleReportInvoice = date => this.props.reportInvoices(
    { date },
    {
      onSuccess: url => window.open(url),
      onError: error => notification.error({ message: `${error} - Vui lòng thử lại sau !` }),
    },
  )

  render() {
    const { invoice, showInvoiceCard, showOrderResult, showReportModal } = this.state
    const { invoices, customers, isFetching, meta, checkResult, isCheckingResult } = this.props
    return (
      <Fragment>
        <Row gutter={24}>
          <Col span={6}>
            <Filter customers={customers} disabled={isFetching} onFilter={this.handleFilter} />
          </Col>
          <Col span={18}>
            <InvoiceList
              style={{ marginTop: 10 }}
              invoices={invoices}
              isFetching={isFetching}
              meta={meta}
              onAdd={this.handleAdd}
              onView={this.handleView}
              onChangePage={this.onChangePage}
              onChangeSize={this.onChangePage}
              onShowDetail={this.onShowDetail}
              onCheckOrdered={this.checkOrdered}
              onReport={this.handleReport}
            />
          </Col>
        </Row>
        <InvoiceModal
          title={invoice && `${invoice.Code} - ${moment(invoice.DeliveryTime).format('DD/MM/YYYY')} - ${INVOICE_STATUS[invoice.Status]}`}
          visible={showInvoiceCard}
          invoice={invoice}
          onCancel={this.handleCancel}
          onExportExcel={this.exportExcel}
        />
        <ResultModal
          visible={showOrderResult}
          onCancel={this.handleCancel}
          isFetching={isCheckingResult}
          dataSource={checkResult}
          onCheck={this.onCheckOrdered}
        />
        <ReportModal
          visible={showReportModal}
          onCancel={this.handleCancel}
          onSubmit={this.handleReportInvoice}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: select(state, ['invoiceReducer', 'list'], 'isFetching'),
  checkResult: select(state, ['invoiceReducer', 'checkResult'], 'items'),
  invoices: select(state, ['invoiceReducer', 'list'], 'items'),
  meta: select(state, ['invoiceReducer', 'list'], 'meta'),
  isCheckingResult: select(state, ['invoiceReducer', 'checkResult'], 'isFetching'),
  customers: select(state, ['customerReducer', 'customer'], 'items'),
})

const mapDispatchToProps = dispatch => ({
  getInvoices: filterOptions => dispatch(getInvoices(filterOptions)),
  getCustomers: () => dispatch(getCustomers()),
  checkOrdered: params => dispatch(checkOrdered(params)),
  reportInvoices: (params, meta) => dispatch(reportInvoices(params, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPageHOC('invoice', 'data')(InvoicePage))
