import React from 'react'
import { Card, Row, Col } from 'antd'
import moment from 'moment'
import { formatDuration } from '../../../util/vrp'
import WithLoading from '../../../hoc/loading'
import ToJS from '../../../hoc/toJs'

const InfoField = ({ label, data }) => (
  <Row>
    <Col span={8}>
      <p>{label}</p>
    </Col>
    <Col span={16}>
      {data !== undefined ? (
        <p style={{ fontWeight: 'bold' }}>{data}</p>
      ) : (
        <p style={{ fontStyle: 'italic' }}>Chưa cập nhật</p>
      )}
    </Col>
  </Row>
)

const SolutionCard = ({ solution }) => (
  <Card style={{ marginBottom: '24px' }} hoverable>
    <Row gutter={24}>
      <Col span={12}>
        {' '}
        <InfoField label="Tên lịch" data={solution.Name} />
        <InfoField
          label="Ngày giao"
          data={moment(solution.DeliveredAt).format('DD/MM/YYYY')}
        />

        <InfoField
          label="Loại lịch"
          data={
            solution.RouteManagerType === 0 ? 'lịch thường' : 'lịch mẫu'
          }
        />
        <InfoField
          label="Số lượng khách hàng"
          data={solution.NumberOfCustomers}
        />

      </Col>
      <Col span={12}>
        <InfoField
          label="Tổng khoảng cách dự kiến"
          data={`${solution.EstimatedDistance / 1000} km`}
        />
        <InfoField
          label="Tổng thời gian dự kiến"
          data={formatDuration(solution.EstimatedDuration)}
        />
        <InfoField
          label="Tổng khối lượng"
          data={`${solution.Weight && Math.round(solution.Weight * 10) / 10} kg`}
        />
      </Col>
    </Row>
  </Card>
)

export default { ScheduleCard: ToJS(WithLoading(SolutionCard)), InfoField }
