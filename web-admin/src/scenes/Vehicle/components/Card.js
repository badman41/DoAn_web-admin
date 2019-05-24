import React from 'react'
import PropTypes from 'prop-types'

import { Card, Col, Row } from 'antd'

const InfoField = ({ label, data }) => (
  <Row>
    <Col span={11}>
      <p style={{ fontWeight: 'bold' }}>{label}</p>
    </Col>
    <Col span={11}>
      {data ? <p style={{ fontWeight: 'bold' }}>{data}</p> : <p style={{ fontStyle: 'italic' }}>Chưa cập nhật</p>}
    </Col>
  </Row>
)

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

InfoField.defaultProps = { data: '' }

const VehicleCard = ({ vehicle }) => (
  <Card>
    <InfoField label="Mã" data={vehicle.Code} />
    <InfoField label="Tên phương tiện" data={vehicle.Name} />
    <InfoField label="Loại phương tiện" data={vehicle.Type ? vehicle.Type.Name : null} />
    <InfoField label="Lái xe" data={vehicle.Driver ? vehicle.Driver.Name : null} />
    <InfoField label="Biển số" data={vehicle.LicensePlate} />
    <InfoField label="Tải trọng tối đa" data={vehicle.MaxLoad} />
    <InfoField
      label="Kích thước thùng xe"
      data={
        vehicle.MaxVolume && vehicle.MaxVolume[0] && vehicle.MaxVolume[1] && vehicle.MaxVolume[2]
          ? `${vehicle.MaxVolume[0]} x ${vehicle.MaxVolume[1]} x ${vehicle.MaxVolume[2]}`
          : null
      }
    />
    <InfoField label="Ghi chú" data={vehicle.Note} />
  </Card>
)

VehicleCard.propTypes = { vehicle: PropTypes.object }

VehicleCard.defaultProps = { vehicle: {} }

export default VehicleCard
