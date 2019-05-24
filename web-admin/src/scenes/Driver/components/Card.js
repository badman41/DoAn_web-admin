import React from 'react'
import { Card, Row, Col, Divider } from 'antd'
import { formatAddress } from '../../../util/formatAddress'
import ToJS from '../../../hoc/toJs'

const InfoField = ({ label, data }) => (
  <Row>
    <Col span="11">
      <p style={{ fontWeight: 'bold' }}>{label}</p>
    </Col>
    <Col span="11">
      {data ? (
        <p style={{ fontWeight: 'bold' }}>{data}</p>
      ) : (
        <p style={{ fontStyle: 'italic' }}>Chưa cập nhật</p>
      )}
    </Col>
  </Row>
)

const DriverCard = ({ driver }) => (
  <Card>
    <InfoField label="Mã" data={driver.DriverInfo.Code} />
    <InfoField label="Tên lái xe" data={driver.DriverInfo.Name} />
    <InfoField label="SĐT" data={driver.DriverInfo.PhoneNumber} />
    <InfoField
      label="Trạng thái"
      data={
        driver.DriverInfo.Status === 0
          ? 'Đang làm việc'
          : driver.DriverInfo.Status === 2
            ? 'Nghỉ hẳn'
            : 'Tạm dừng'
      }
    />
    <Divider />
    <InfoField label="Giới tính" data={driver.DriverInfo.Sex} />
    <InfoField label="Ngày sinh" data={driver.DriverInfo.DoB} />
    <InfoField
      label="Ngày bắt đầu"
      data={driver.DriverInfo.StartDate}
    />
    <InfoField
      label="Số căn cước/Hộ chiếu"
      data={driver.DriverInfo.IDCardNumber}
    />
    <InfoField
      label="Địa chỉ"
      data={
        driver.DriverInfo.Address
          ? formatAddress(driver.DriverInfo.Address)
          : null
      }
    />
  </Card>
)

export default ToJS(DriverCard)
