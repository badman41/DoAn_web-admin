import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Row, Col } from 'antd'
import { formatAddress } from '../../../util/formatAddress'
import ToJS from '../../../hoc/toJs'

const InfoField = ({ label, data }) => (
  <Row>
    <Col span="11">
      <p style={{ fontWeight: 'bold' }}>{label}</p>
    </Col>
    <Col span="11">
      {data ? <p style={{ fontWeight: 'bold' }}>{data}</p> : <p style={{ fontStyle: 'italic' }}>Chưa cập nhật</p>}
    </Col>
  </Row>
)

InfoField.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

InfoField.defaultProps = { data: '' }

const CustomerCard = ({ customer }) => (
  <Card>
    <InfoField label="Mã giỏ" data={customer.CartCode} />
    <InfoField label="Mã" data={customer.Code} />
    <InfoField label="Tên khách hàng" data={customer.Name} />
    <InfoField label="Địa chỉ" data={customer.Address ? formatAddress(customer.Address) : null} />
    <InfoField
      label="Thời gian phục vụ"
      data={
        customer.TimeWindows
          ? `${moment(1000 * customer.TimeWindows.FromTime).format('HH:mm')} - ${moment(
            1000 * customer.TimeWindows.ToTime,
          ).format('HH:mm')} (${customer.ServerTime} phút)`
          : null
      }
    />
    <InfoField label="Số điện thoại" data={customer.PhoneNumber} />
    <InfoField label="Email" data={customer.Email} />
    <InfoField label="Ghi chú" data={customer.Note} />
    <InfoField label="Trạng thái" data={customer.Status === 0 ? 'Đang phục vụ' : 'Ngừng phục vụ'} />
  </Card>
)

CustomerCard.propTypes = { customer: PropTypes.object }

CustomerCard.defaultProps = { customer: {} }

export default ToJS(CustomerCard)
