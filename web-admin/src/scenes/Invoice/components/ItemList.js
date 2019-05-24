import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, InputNumber } from 'antd'
import toJs from '../../../hoc/toJs'
import './index.css'

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})

class ItemList extends Component {
  render() {
    const { dataSource, footer, edit, onChangeQuantity } = this.props
    const columns = [
      {
        title: 'STT',
        dataIndex: 'index',
        render: (t, r, index) => index + 1,
      },
      {
        title: 'Tên mặt hàng',
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
        render: (text, r, index) => (edit ? (
          <InputNumber defaultValue={text} min={0} max={1000} onChange={value => onChangeQuantity(value, index)} />
        ) : (
          text
        )),
      },
      {
        title: 'Khối lượng',
        dataIndex: 'Weight',
        align: 'right',
        render: text => `${Math.round(text * 10) / 10} kg`,
      },
      {
        title: 'Thành tiền',
        dataIndex: 'TotalPrice',
        render: text => formatter.format(text),
      },
    ]
    return (
      <Table
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="ID"
        footer={footer}
        rowClassName={record => (record.Quantity !== record.DeliveriedQuantity ? 'missing' : '')}
      />
    )
  }
}

ItemList.propTypes = {
  dataSource: PropTypes.array,
  footer: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  onChangeQuantity: PropTypes.func,
}

ItemList.defaultProps = {
  dataSource: [],
  edit: false,
  onChangeQuantity: () => {},
}

export default toJs(ItemList)
