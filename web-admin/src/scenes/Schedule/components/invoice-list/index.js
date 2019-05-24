import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import { INVOICE_STATUS } from '../../../../constants/enum'
import ToJs from '../../../../hoc/toJs'
import WithLoading from '../../../../hoc/loading'

const InvoiceList = ({ invoices, selectedInvoices, onSelectInvoices, onView }) => {
  const rowSelection = {
    onChange: selectedRowKeys => {
      onSelectInvoices(selectedRowKeys)
    },
    selectedRowKeys: selectedInvoices.map(invoice => invoice.ID),
    getCheckboxProps: record => ({
      disabled:
        record.WeightTotal > 200
        || record.Status.Status !== 0
        || !(record.Address && record.Address.Lat && record.Address.Lng),
    }),
  }
  const columns = [
    {
      title: 'KH',
      key: 'CustomerName',
      render: (text, record) => ({
        props: { style: { backgroundColor: record.Status === 0 ? '' : 'whitesmoke' } },
        children: record.CustomerName,
      }),
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      render: (text, record) => ({
        props: { style: { backgroundColor: record.Status === 0 ? '' : 'whitesmoke' } },
        children:
          record.Address && `${record.Address.StreetNumber}, ${record.Address.Street}, ${record.Address.District}`,
      }),
    },
    {
      title: 'Tổng khối lượng',
      dataIndex: 'WeightTotal',
      render: (text, record) => ({
        props: { style: { backgroundColor: record.Status === 0 ? '' : 'whitesmoke' } },
        children: `${Math.floor(record.WeightTotal)} kg`,
      }),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.WeightTotal - b.WeightTotal,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      render: (text, record) => ({
        props: { style: { backgroundColor: record.Status === 0 ? '' : 'whitesmoke' } },
        children: INVOICE_STATUS[record.Status.Status],
      }),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.Status.Status - b.Status.Status,
    },
    {
      title: 'Hành động',
      render: (text, row) => (
        <div>
          <Button type="primary" ghost size="small" onClick={() => onView(row)}>
            Xem thông tin
          </Button>
        </div>
      ),
    },
  ]
  return (
    <div>
      <h2>
        {'Danh sách Đơn Hàng'}
        <span style={{ fontSize: 14, fontStyle: 'italic' }}>
          {`( Tổng số: ${invoices.length} - ${Math.floor(
            invoices.map(item => item.WeightTotal).reduce((a, b) => a + b, 0),
          )} kg)`}
        </span>
      </h2>
      <Table
        rowSelection={rowSelection}
        pagination={false}
        size="small"
        rowKey="ID"
        columns={columns}
        style={{ marginTop: 15 }}
        dataSource={invoices}
      />
    </div>
  )
}

InvoiceList.propTypes = {
  invoices: PropTypes.array.isRequired,
  selectedInvoices: PropTypes.array.isRequired,
  onView: PropTypes.func.isRequired,
  onSelectInvoices: PropTypes.func.isRequired,
}

export default WithLoading(ToJs(InvoiceList))
