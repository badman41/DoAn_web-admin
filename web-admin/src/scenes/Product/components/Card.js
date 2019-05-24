import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Card } from 'antd'
import toJs from '../../../hoc/toJs'

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
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

InfoField.defaultProps = { data: '' }

const ProductCard = ({ product }) => (
  <Card>
    <InfoField label="Mã" data={product.ProductInfo.Code} />
    <InfoField label="Tên mặt hàng" data={product.ProductInfo.Name} />
    <InfoField label="Đơn vị" data={product.ProductInfo.Unit.Name} />
    <InfoField
      label="Điều kiện bảo quản"
      data={product.ProductInfo.Preservation && product.ProductInfo.Preservation.Description}
    />
    <InfoField
      label="Chuyển đổi đơn vị"
      data={
        product.ProductInfo.WeightPerUnit && product.ProductInfo.Unit.Name
          ? product.ProductInfo.Unit.Name !== 'kg'
            ? `${product.ProductInfo.WeightPerUnit} kg/${product.ProductInfo.Unit.Name}`
            : 1
          : null
      }
    />
    <InfoField label="Ghi chú" data={product.ProductInfo.Note} />
  </Card>
)

ProductCard.propTypes = { product: PropTypes.object }

ProductCard.defaultProps = { product: {} }

export default toJs(ProductCard)
