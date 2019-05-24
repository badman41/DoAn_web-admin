import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Form, List, Divider, message, Row, Col, Skeleton, Card } from 'antd'
import ToJS from '../../../hoc/toJs'
import WithLoading from '../../../hoc/loading'

const FormItem = Form.Item
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
})

class ProductList extends Component {
  state = {
    hasProduct: false,
    productUnit: null,
    products: {},
  };

  onAddItem = (e, id) => {
    e.preventDefault()
    if (Number(this.state.products[id]) && Number(this.state.products[id]) > 0) {
      const product = this.props.products.find(item => item.ID === id)
      this.props.onAddItem(product, this.state.products[id])
      const { products } = this.state
      delete products[id]
      this.setState(() => ({ products }))
    } else {
      message.warning('Vui lòng nhập số lượng lớn hơn 0 !')
    }
  };

  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAddItem(this.state.product, values.quantity)
        this.props.form.resetFields()
        this.setState({
          hasProduct: false,
          productUnit: null,
          products: {},
        })
      }
    })
  };

  onChangeQuantity = ({ target: { value } }, id) => {
    this.setState({ products: { [id]: Number(value) } })
  };

  render() {
    const { products, onFilterProduct, loading } = this.props
    return (
      <Card title="Danh sách mặt hàng">
        <Form>
          <FormItem label="Gõ tên sản phẩm để tìm">
            <Input placeholder="Tên sản phẩm" onChange={onFilterProduct} />
          </FormItem>
        </Form>
        <Divider />
        <List
          size="small"
          dataSource={products}
          pagination={{ pageSize: 14 }}
          renderItem={item => (
            <List.Item
              actions={
                !loading && [
                  <Button
                    key="adds"
                    type="primary"
                    shape="circle"
                    size="small"
                    icon="plus"
                    onClick={e => this.onAddItem(e, item.ID)}
                  />,
                ]
              }
            >
              <Skeleton loading={loading} active>
                <List.Item.Meta
                  title={(
                    <React.Fragment>
                      <Row gutter={10}>
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 24 }}
                          md={{ span: 8 }}
                          lg={{ span: 8 }}
                          style={{ textAlign: 'left' }}
                        >
                          {item.ProductInfo.Name}
                        </Col>
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 24 }}
                          md={{ span: 8 }}
                          lg={{ span: 8 }}
                          style={{ textAlign: 'center' }}
                        >
                          {`${formatter.format(item.ProductInfo.OtherUnitOfProduct[0].Price)}/ ${
                            item.ProductInfo.OtherUnitOfProduct[0].Name
                          } `}
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
                          <Input
                            type="number"
                            min="0"
                            max="1000"
                            key="quantity"
                            value={this.state.products[item.ID] ? this.state.products[item.ID] : 0}
                            style={{ width: 200 }}
                            addonAfter={
                              <div style={{ width: '50px' }}>{item.ProductInfo.OtherUnitOfProduct[0].Name}</div>
                            }
                            onChange={e => this.onChangeQuantity(e, item.ID)}
                          />
                        </Col>
                      </Row>
                    </React.Fragment>
                  )}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

ProductList.propTypes = {
  form: PropTypes.object.isRequired,
  onAddItem: PropTypes.func,
  products: PropTypes.array,
  onFilterProduct: PropTypes.func,
  loading: PropTypes.bool,
}

ProductList.defaultProps = {
  onAddItem: () => {},
  onFilterProduct: () => {},
  products: [],
  loading: false,
}

export default WithLoading(ToJS(Form.create()(ProductList)))
