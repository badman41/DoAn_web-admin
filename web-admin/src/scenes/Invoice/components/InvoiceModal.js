import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Modal } from 'antd'

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})

const columns = [
  {
    title: 'STT',
    dataIndex: 'Index',
    render: (t, r, index) => index,
  },
  {
    title: 'Tên hàng hóa',
    dataIndex: 'ProductName',
  },
  {
    title: 'Đơn giá',
    dataIndex: 'UnitName',
    render: (text, record) => `${formatter.format(record.Price)}/${text}`,
  },
  {
    title: 'Số lượng',
    dataIndex: 'Quantity',
    render: (text, record) => `${Math.floor(record.Quantity * 10) / 10} ${record.UnitName}`,
  },
  {
    title: 'Thành tiền',
    dataIndex: 'TotalPrice',
    render: text => formatter.format(text),
  },
  {
    title: 'Khối lượng',
    dataIndex: 'Weight',
    width: 150,
    align: 'right',
    render: (text, record) => `${Math.floor(record.Weight * 10) / 10} kg`,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.Weight - b.Weight,
  },
]

const InvoiceModal = ({ invoice, onCancel, onExportExcel, visible, title }) => (
  <Modal
    width={1000}
    visible={visible}
    title={title}
    closable={false}
    centered
    footer={[
      <Button key="excel" onClick={onExportExcel} type="primary">
              Xuất file excel
      </Button>,
      <Button key="back" onClick={onCancel}>
              Đóng
      </Button>,
    ]}
  >
    <Table
      size="small"
      pagination={false}
      bordered
      columns={columns}
      dataSource={invoice.Items}
      rowKey="ID"
      footer={() => (
        <div>
          <b>Tổng cộng</b>
          <b style={{ float: 'right' }}>
            {`${formatter.format(invoice.TotalPrice)}/${Math.round(invoice.WeightTotal * 10)
          / 10} kg`}
          </b>
        </div>
      )}
    />

  </Modal>
)

InvoiceModal.propTypes = {
  invoice: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onExportExcel: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
}

InvoiceModal.defaultProps = {
  invoice: { Items: [] },
  title: '',
  onExportExcel: () => {},
}

export default InvoiceModal
