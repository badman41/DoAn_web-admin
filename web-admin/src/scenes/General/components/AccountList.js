import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import toJs from '../../../hoc/toJs'
import { ROLE } from '../../../constants/enum'
import WithLoadingHOC from '../../../hoc/loading'

const columns = [
  {
    title: 'Tên tài khoản',
    dataIndex: 'UserName',
  },
  {
    title: 'Tên hiển thị',
    dataIndex: 'DisplayName',
  },
  {
    title: 'Vai trò',
    dataIndex: 'Role',
    render: text => ROLE[text],
  },
]

const AccountList = ({
  dataSource,
  meta: { pageSize, current, total },
  onChange,
  onShowSizeChange,
}) => (
  <Table
    columns={columns}
    dataSource={dataSource}
    rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
    rowKey="ID"
    size="small"
    pagination={{
      current,
      pageSize,
      total,
      onChange,
      onShowSizeChange,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40'],
      showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} tài khoản`,
    }}
  />
)

AccountList.propTypes = {
  dataSource: PropTypes.array,
  meta: PropTypes.object,
  onChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
}

AccountList.defaultProps = {
  dataSource: [],
  meta: {},
  onChange: () => {},
  onShowSizeChange: () => {},
}

export default WithLoadingHOC(toJs(AccountList))
