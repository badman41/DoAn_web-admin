import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { DRIVER_STATUS } from '../../../../constants/enum'
import ToJs from '../../../../hoc/toJs'

const DriverList = ({ drivers, selectedDrivers, onSelectDrivers }) => {
  const rowSelection = {
    onChange: selectedRowKeys => {
      onSelectDrivers(selectedRowKeys)
    },
    selectedRowKeys: selectedDrivers.map(selectedDrivers => selectedDrivers.ID),
    getCheckboxProps: record => ({ disabled: record.DriverInfo.Status !== 0 }),
  }
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'DriverInfo.Code',
      key: 'code',
    },
    {
      title: 'Tên',
      dataIndex: 'DriverInfo.Name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'DriverInfo.PhoneNumber',
      key: 'phone',
    },
    {
      title: 'Trạng thái',
      key: 'DriverInfo.Status',
      render: (text, record) => DRIVER_STATUS[record.DriverInfo.Status],
    },
  ]

  return (
    <div>
      <h2>
        {'Danh sách tài xế '}
        <span style={{ fontSize: 14, fontStyle: 'italic' }}>
          {`( Tổng số: ${drivers.length})`}
        </span>
      </h2>
      <Table
        rowSelection={rowSelection}
        pagination={false}
        size="small"
        dataSource={drivers}
        columns={columns}
        rowKey={record => record.ID}
        rowClassName={(r, index) => (index % 2 ? 'whitesmoke' : '')}
      />
    </div>
  )
}

DriverList.propTypes = {
  drivers: PropTypes.array,
  selectedDrivers: PropTypes.array,
  onSelectDrivers: PropTypes.func.isRequired,
}

DriverList.defaultProps = {
  drivers: [],
  selectedDrivers: [],
}

export default ToJs(DriverList)
