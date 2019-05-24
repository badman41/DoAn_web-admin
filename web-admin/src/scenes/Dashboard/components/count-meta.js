import React from 'react'
import { Row, Col, Card, Avatar } from 'antd'
import toJs from '../../../hoc/toJs'

const { Meta } = Card

const CountData = ({ count }) => {
  console.log(count)
  return (
    <Row>
      <Col span={5} offset={1}>
        <Card hoverable>
          <Meta
            avatar={(
              <Avatar
                size={48}
                style={{ backgroundColor: 'red' }}
              >
                {count.countAccount}

              </Avatar>
            )}
            title={<h2>Tài khoản</h2>}
          />
        </Card>
      </Col>
      <Col span={5} offset={1}>
        <Card hoverable>
          <Meta
            avatar={(
              <Avatar
                size={48}
                style={{ backgroundColor: 'blue' }}
              >
                {count.countProductCondition}

              </Avatar>
            )}
            title={<h2>Điều kiện bảo quản</h2>}
          />
        </Card>
      </Col>
      <Col span={5} offset={1}>
        <Card hoverable>
          <Meta
            avatar={(
              <Avatar
                size={48}
                style={{ backgroundColor: 'green' }}
              >
                {count.countProductUnit}

              </Avatar>
            )}
            title={<h2>Đơn vị tính</h2>}
          />
        </Card>
      </Col>
      <Col span={5} offset={1}>
        <Card hoverable>
          <Meta
            avatar={(
              <Avatar
                size={48}
                style={{ backgroundColor: 'orange' }}
              >
                {count.countVehicleType}

              </Avatar>
            )}
            title={<h2>Loại phương tiện</h2>}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default toJs(CountData)
