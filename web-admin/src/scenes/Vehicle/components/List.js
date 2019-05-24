import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table, Icon } from 'antd'
import { Link } from 'react-router-dom'

import ToJS from '../../../hoc/toJs'
import WithLoading from '../../../hoc/loading'
import router from '../../../constants/router'

const columns = (onView, onEdit) => [
  {
    title: 'Mã phương tiện',
    dataIndex: 'Code',
    width: 180,
    render: (text, record) => (
      <Link to={router.VEHICLE.EDIT.replace(':id', record.ID)} onClick={e => onView(e, record)}>
        {text}
      </Link>
    ),
  },
  {
    title: 'Kiểu',
    key: 'type',
    render: (text, record) => (record.Type ? record.Type.Name : '(Chưa cập nhật)'),
  },
  {
    title: 'Biển số',
    dataIndex: 'LicensePlate',
  },
  {
    title: 'Chủ sở hữu',
    key: 'owner',
    render: (text, record) => (record.Driver ? record.Driver.Name : '(Chưa cập nhật)'),
  },
  {
    title: 'Sửa',
    width: 50,
    key: 'edit',
    render: (text, row) => (
      <Button type="primary" shape="circle" onClick={() => onEdit(row.ID)}>
        <Icon type="edit" />
      </Button>
    ),
  },
]

const VehicleList = ({ vehicles, meta: { current, total, pageSize }, onEdit, onView, onChangePage, onChangeSize }) => (
  <Table
    size="small"
    style={{ marginTop: '10px' }}
    pagination={{
      current,
      total,
      pageSize,
      onChange: onChangePage,
      showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} phương tiện`,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '15', '20'],
      onShowSizeChange: onChangeSize,
    }}
    columns={columns(onView, onEdit)}
    rowKey={record => record.ID}
    rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
    dataSource={vehicles}
  />
)

VehicleList.propTypes = {
  vehicles: PropTypes.array,
  meta: PropTypes.object,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeSize: PropTypes.func,
}

VehicleList.defaultProps = {
  vehicles: [],
  meta: {},
  onEdit: () => {},
  onView: () => {},
  onChangePage: () => {},
  onChangeSize: () => {},
}

export default WithLoading(ToJS(VehicleList))
