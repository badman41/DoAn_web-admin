import React from 'react'
import { Row, Col, Card, Avatar } from 'antd'
import toJs from '../../../hoc/toJs'

const { Meta } = Card

const CountData = ({ count }) => (
  <Row>
    <Col span={5} offset={1}>
      <Card hoverable>
        <Meta
          avatar={<Avatar size={48} style={{ backgroundColor: 'red' }}>{count.countVehicle}</Avatar>}
          title={<h2>Phương tiện</h2>}
        />
      </Card>
    </Col>
    <Col span={5} offset={1}>
      <Card hoverable>
        <Meta
          avatar={<Avatar size={48} style={{ backgroundColor: 'blue' }}>{count.countDriver}</Avatar>}
          title={<h2>Lái xe</h2>}
        />
      </Card>
    </Col>
    <Col span={5} offset={1}>
      <Card hoverable>
        <Meta
          avatar={<Avatar size={48} style={{ backgroundColor: 'green' }}>{count.countCustomer}</Avatar>}
          title={<h2>Khách hàng</h2>}
        />
      </Card>
    </Col>
    <Col span={5} offset={1}>
      <Card hoverable>
        <Meta
          avatar={<Avatar size={48} style={{ backgroundColor: 'orange' }}>{count.countProduct}</Avatar>}
          title={<h2>Hàng hoá</h2>}
        />
      </Card>
    </Col>
  </Row>
)

export default toJs(CountData)
