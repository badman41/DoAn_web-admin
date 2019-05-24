import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Row } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'

import WithLoading from '../../../hoc/loading'
import ToJS from '../../../hoc/toJs'
import { INVOICE_STATUS } from '../../../constants/enum'
import { formatAddress } from '../../../util/formatAddress'
import router from '../../../constants/router'

const columns = (onView, onShowDetail) => [
  {
    title: 'Mã đơn hàng',
    dataIndex: 'Code',
    width: 100,
    align: 'center',
    render: (text, row) => (
      <Link to={router.INVOICE.DETAIL.replace(':id', row.ID)} onClick={e => onView(e, row)}>
        {text}
      </Link>
    ),
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'CustomerName',
    width: 160,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'Address',
    width: 160,
    render: value => formatAddress(value),
  },
  {
    title: 'Ngày giao hàng',
    dataIndex: 'DeliveryTime',
    width: 100,
    align: 'center',
    render: value => moment(value).format('DD/MM/YYYY'),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'Status',
    align: 'center',
    width: 100,
    render: value => INVOICE_STATUS[value],
  },
  {
    title: 'Chi tiết',
    key: 'Detail',
    align: 'center',
    width: 30,
    render: (text, record) => (
      <Button type="primary" shape="circle" icon="info" onClick={() => onShowDetail(record.ID)} />
    ),
  },
]

const InvoiceList = ({
  invoices,
  meta: { current, pageSize, total },
  onView,
  onChangePage,
  onChangeSize,
  onAdd,
  onCheckOrdered,
  onShowDetail,
  onReport,
}) => (
  <Table
    title={() => (
      <Row>
        <Button icon="plus" onClick={onAdd}>
          {'Thêm đơn hàng'}
        </Button>
        <Button icon="clock-circle" style={{ float: 'right' }} onClick={onCheckOrdered}>
          {'Kiểm tra đặt hàng'}
        </Button>
        <Button icon="clock-circle" style={{ float: 'right', marginRight: 10 }} onClick={onReport}>
          {'Tổng hợp đơn hàng'}
        </Button>
      </Row>
    )}
    size="small"
    pagination={{
      current,
      pageSize,
      total,
      showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} đơn hàng`,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '15', '20'],
      onShowSizeChange: onChangeSize,
      onChange: onChangePage,
    }}
    style={{ marginTop: '10px' }}
    columns={columns(onView, onShowDetail)}
    rowKey={record => record.ID}
    rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
    dataSource={invoices}
  />
)

InvoiceList.propTypes = {
  invoices: PropTypes.array,
  meta: PropTypes.object,
  onAdd: PropTypes.func,
  onCheckOrdered: PropTypes.func,
  onView: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeSize: PropTypes.func,
  onShowDetail: PropTypes.func,
  onReport: PropTypes.func.isRequired,
}

InvoiceList.defaultProps = {
  invoices: [],
  meta: {},
  onAdd: () => {},
  onCheckOrdered: () => {},
  onView: () => {},
  onChangePage: () => {},
  onChangeSize: () => {},
  onShowDetail: () => {},
}

export default ToJS(WithLoading(InvoiceList))
