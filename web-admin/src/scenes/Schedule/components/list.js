import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Table, Icon, Button } from 'antd'
import { formatDuration } from '../../../util/vrp'
import ToJS from '../../../hoc/toJs'
import WithLoading from '../../../hoc/loading'
import ROUTER from '../../../constants/router'

class ScheduleList extends Component {
    onDelete = (e, id) => {
      e.preventDefault()
      this.props.onDelete(id)
    };

    render() {
      const {
        schedules,
        onChange,
        onShowSizeChange,
        meta: { pageSize, current, total },
      } = this.props
      const columns = [
        {
          title: 'Tên lịch',
          dataIndex: 'Name',
          render: (text, record) => ({
            props: { style: { color: record.RouteManagerType === 0 ? '' : 'red' } },
            children: record.Name,
          }),
        },
        {
          title: 'Ngày giao',
          dataIndex: 'DeliveredAt',
          render: (text, record) => moment(record.DeliveredAt).format('DD/MM/YYYY'),
        },
        {
          title: 'Tổng khoảng cách',
          dataIndex: 'EstimatedDistance',
          render: (text, record) => (record.EstimatedDistance
            ? `${Math.round((record.EstimatedDistance / 1000) * 10) / 10} km`
            : 'Chưa cập nhật'),
        },
        {
          title: 'Tổng thời gian',
          dataIndex: 'EstimatedDuration',
          render: (text, record) => (record.EstimatedDuration ? formatDuration(record.EstimatedDuration) : 'Chưa cập nhật'),
        },
        {
          title: 'Tổng khối lượng',
          dataIndex: 'Weight',
          align: 'center',
          render: (text, record) => Math.round(record.Weight * 10) / 10,
        },
        {
          title: 'Số lượng khách hàng',
          dataIndex: 'NumberOfCustomers',
          align: 'center',
        },
        {
          title: 'Chỉnh sửa',
          dataIndex: 'ID',
          render: (text, record) => (
            <div>
              <Link to={ROUTER.SCHEDULE.DETAIL.replace(':id', record.ID)}>
                <Button shape="circle">
                  <Icon type="info" />
                </Button>
                {' '}
              </Link>
              <Button shape="circle" type="danger" onClick={e => this.onDelete(e, record.ID)}>
                <Icon type="delete" />
              </Button>
            </div>
          ),
        },
      ]
      return (
        <Table
          size="small"
          style={{ marginTop: 10 }}
          pagination={{
            current,
            pageSize,
            total,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} lich`,
            onChange,
            showSizeChanger: true,
            onShowSizeChange,
            pageSizeOptions: ['5', '10'],
          }}
          columns={columns}
          rowKey="ID"
          rowClassName={(r, idx) => (idx % 2 ? 'whitesmoke' : '')}
          dataSource={schedules}
        />
      )
    }
}

ScheduleList.propTypes = {
  schedules: PropTypes.array,
  meta: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onShowSizeChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

ScheduleList.defaultProps = {
  schedules: [],
  meta: {},
}

export default ToJS(WithLoading(ScheduleList))
