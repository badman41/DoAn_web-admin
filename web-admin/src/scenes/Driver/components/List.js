import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table, Icon, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import WithLoading from '../../../hoc/loading'
import ToJS from '../../../hoc/toJs'
import { DRIVER_STATUS } from '../../../constants/enum'
import router from '../../../constants/router'

const columns = (onView, onEdit, onResetPassword) => [
  {
    title: 'Mã lái xe',
    key: 'DriverInfo.Code',
    width: 160,
    render: (text, row) => (
      <Link to={router.DRIVER.EDIT.replace(':id', row.ID)} onClick={e => onView(e, row)}>
        {row.DriverInfo.Code}
      </Link>
    ),
  },
  {
    title: 'Họ tên',
    dataIndex: 'DriverInfo.Name',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'DriverInfo.PhoneNumber',
  },
  {
    title: 'Trạng thái',
    key: 'state',
    width: 150,
    render: (text, record) => DRIVER_STATUS[record.DriverInfo.Status],
  },
  {
    title: 'Sửa',
    width: 110,
    align: 'center',
    render: (text, record) => (
      <React.Fragment>
        <Button type="primary" shape="circle" onClick={() => onEdit(record.ID)}>
          <Icon type="edit" />
        </Button>
        {' '}
        <Tooltip title="Đặt lại mật khẩu">
          <Button type="primary" shape="circle" onClick={() => onResetPassword(record)}>
            <Icon type="sync" />
          </Button>
        </Tooltip>
      </React.Fragment>
    ),
  },
]

const DriverList = ({
  drivers,
  meta: { current, pageSize, total },
  onEdit,
  onView,
  onChangePage,
  onChangeSize,
  onResetPassword,
}) => (
  <Table
    size="small"
    pagination={{
      current,
      pageSize,
      total,
      showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} lái xe`,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '15', '20'],
      onShowSizeChange: onChangeSize,
      onChange: onChangePage,
    }}
    style={{ marginTop: '10px' }}
    columns={columns(onView, onEdit, onResetPassword)}
    rowKey="ID"
    rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
    dataSource={drivers}
  />
)

DriverList.propTypes = {
  drivers: PropTypes.array,
  meta: PropTypes.object,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeSize: PropTypes.func,
  onResetPassword: PropTypes.func,
}

DriverList.defaultProps = {
  drivers: [],
  meta: {},
  onEdit: () => {},
  onView: () => {},
  onChangePage: () => {},
  onChangeSize: () => {},
  onResetPassword: () => {},
}

export default WithLoading(ToJS(DriverList))
