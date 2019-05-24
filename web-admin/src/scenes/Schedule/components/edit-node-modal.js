import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Row, Col, Radio } from 'antd'

const NodeModal = ({ visible, driver, node, onChange, onUpdate, onCancel }) => (
  <Modal
    title="Cập nhật thông tin"
    visible={visible}
    centered
    closable={false}
    footer={[
      <Button key="update" onClick={() => onUpdate(driver.role)}>Cập nhật</Button>,
      <Button key="close" onClick={onCancel}>Đóng cửa sổ</Button>,
    ]}
  >
    <Row gutter={24}>
      <Col span={6}>Lái xe</Col>
      <Col span={18}>{`${driver.name} (${driver.phone})`}</Col>
    </Row>
    <Row gutter={24}>
      <Col span={6}>Khách hàng</Col>
      <Col span={18}>{`${node?.invoice?.CustomerName}`}</Col>
    </Row>
    <Row gutter={24}>
      <Col span={6}>Vai trò</Col>
      <Col span={18}>
        <Radio.Group value={driver.role} onChange={onChange} buttonStyle="solid">
          <Radio.Button value={0}> Vân chuyển</Radio.Button>
          <Radio.Button value={2}>Giao hàng</Radio.Button>
          <Radio.Button value={4}>Cá 2</Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  </Modal>
)

NodeModal.propTypes = {
  visible: PropTypes.bool,
  driver: PropTypes.object,
  node: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

NodeModal.defaultProps = {
  visible: false,
  driver: {},
  node: {},
}

export default NodeModal
