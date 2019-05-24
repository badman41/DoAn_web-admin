import React from 'react'
import PropTypes from 'prop-types'
import { Table, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'

import WithLoading from '../../../hoc/loading'
import toJs from '../../../hoc/toJs'
import router from '../../../constants/router'

const columns = (onView, onEdit) => [
  {
    title: 'Mã hàng hóa',
    dataIndex: 'ProductInfo.Code',
    render: (value, row) => (
      <Link to={router.PRODUCT.EDIT.replace(':id', row.ID)} onClick={e => onView(e, row)}>
        {value}
      </Link>
    ),
  },
  {
    title: 'Tên hàng hóa',
    dataIndex: 'ProductInfo.Name',
    render: (value, row) => ({
      props: { style: { color: row.ProductInfo.Unit.Name !== 'kg' && row.ProductInfo.WeightPerUnit === undefined ? 'red' : '' } },
      children: value,
    }),
  },
  {
    title: 'Đơn vị',
    dataIndex: 'ProductInfo.Unit.Name',
    align: 'center',
  },
  {
    title: 'Khối lượng chuyển đổi',
    dataIndex: 'ProductInfo.WeightPerUnit',
    align: 'center',
    render: value => `${value} kg`,
  },
  {
    title: 'Chỉnh sửa',
    width: 50,
    render: (text, row) => (
      <Button type="primary" shape="circle" onClick={() => onEdit(row.ID)}>
        <Icon type="edit" />
      </Button>
    ),
  },
]

const ProductList = ({ products, meta: { pageSize, current, total }, onEdit, onView, onChangePage, onChangeSize }) => (
  <Table
    size="small"
    columns={columns(onView, onEdit)}
    style={{ marginTop: '10px' }}
    dataSource={products}
    rowKey="ID"
    rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
    pagination={{
      current,
      total,
      pageSize,
      onChange: onChangePage,
      showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} hàng hóa`,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '15', '20'],
      onShowSizeChange: onChangeSize,
    }}
  />
)

ProductList.propTypes = {
  products: PropTypes.array,
  meta: PropTypes.object,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeSize: PropTypes.func,
}

ProductList.defaultProps = {
  products: [],
  meta: {},
  onEdit: () => {},
  onView: () => {},
  onChangePage: () => {},
  onChangeSize: () => {},
}

export default WithLoading(toJs(ProductList))
