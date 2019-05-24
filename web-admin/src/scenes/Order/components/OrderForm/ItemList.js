import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, List, Button, Icon, Row, Col } from 'antd'
import ToJS from '../../../../hoc/toJs'

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})

class ItemList extends Component {
    checkQuantity = ({ target: { value } }, id) => {
      if (Number(value) > 0) {
        this.props.onChangeQuantity(value, id)
      } else {
        this.props.onChangeQuantity(0, id)
      }
    };

    render() {
      const { dataSource, removeProduct, title } = this.props
      return (
        <List
          header={title()}
          dataSource={dataSource}
          renderItem={(record, index) => (
            <List.Item
              key={`${index + 1}`}
              actions={[
                <Button
                  key="delete"
                  shape="circle"
                  type="danger"
                  onClick={() => removeProduct(record.ProductID)}
                >
                  <Icon type="delete" />
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={(
                  <Row gutter={10} style={{ textAlign: 'center' }}>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                      {record.ProductName}
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                      {`${formatter.format(record.TotalPrice)}/ ${record.Quantity} ${
                        record.UnitName
                      } `}
                    </Col>
                  </Row>
                )}
                description={(
                  <Input
                    type="number"
                    defaultValue={record.Quantity}
                    value={record.Quantity}
                    addonAfter={<div style={{ width: '50px' }}>{record.UnitName}</div>}
                    onChange={e => this.props.onChangeQuantity(e.target.value, record.ProductID)}
                    onBlur={e => this.checkQuantity(e, record.ProductID)}
                  />
                )}
              />
            </List.Item>
          )}
        />
      )
    }
}

ItemList.propTypes = {
  dataSource: PropTypes.array,
  removeProduct: PropTypes.func,
  onChangeQuantity: PropTypes.func,
  title: PropTypes.func,
  isConfirm: PropTypes.bool,
}

ItemList.defaultProps = {
  dataSource: [],
  removeProduct: () => {},
  onChangeQuantity: () => {},
  title: () => {},
  isConfirm: false,
}

export default ToJS(ItemList)
