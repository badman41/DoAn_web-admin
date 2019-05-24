import React from 'react'
import PropTypes from 'prop-types'
import { Table, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'

import WithLoading from '../../../hoc/loading'
import ToJS from '../../../hoc/toJs'
import router from '../../../constants/router'

const validateLatLng = (lat, lng) => lat > 9.17682 && lat < 22.82333 && lng > 103.02301 && lng < 109.32094

const columns = (onView, onEdit) => [
  {
    title: 'Mã giỏ',
    dataIndex: 'CartCode',
    align: 'center',
  },
  {
    title: 'Mã khách hàng',
    dataIndex: 'Code',
    render: (value, row) => (
      <Link to={router.CUSTOMER.EDIT.replace(':id', row.ID)} onClick={e => onView(e, row)}>
        {value}
      </Link>
    ),
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'Name',
    render: (value, row) => ({
      props: { style: validateLatLng(row.Address.Lat, row.Address.Lng) ? {} : { color: 'red' } },
      children: value,
    }),
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'PhoneNumber',
  },
  {
    title: 'Sửa',
    width: 50,
    render: (text, row) => (
      <Button type="primary" shape="circle" onClick={() => onEdit(row)}>
        <Icon type="edit" />
      </Button>
    ),
  },
]

const CustomerList = ({
  customers,
  meta,
  onEdit,
  onView,
  onChangePage,
  onChangeSize,
}) => (
  <Table
    size="small"
    columns={columns(onView, onEdit)}
    style={{ marginTop: '10px' }}
    dataSource={customers}
    rowKey={record => record.ID}
    rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
    pagination={{
      current: meta.current,
      total: meta.total,
      pageSize: meta.pageSize,
      onChange: onChangePage,
      showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} khách hàng`,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '15', '20'],
      onShowSizeChange: onChangeSize,
    }}
  />
)

CustomerList.propTypes = {
  customers: PropTypes.array,
  meta: PropTypes.object,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeSize: PropTypes.func,
}

CustomerList.defaultProps = {
  customers: [],
  meta: {},
  onEdit: () => {},
  onView: () => {},
  onChangePage: () => {},
  onChangeSize: () => {},
}

export default WithLoading(ToJS(CustomerList))
