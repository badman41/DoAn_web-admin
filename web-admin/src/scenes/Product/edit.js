/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, notification } from 'antd'
import WithLoadingHOC from '../../hoc/loading'
import WithPageHOC from '../../hoc/page'
import select from '../../util/select'
import { getProduct, updateProduct } from './actions'
import { getProductUnits, getProductConditions } from '../General/actions'
import ProductForm from './components/Form'

class EditProductPage extends React.Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
    this.props.getProductUnits()
    this.props.getProductConditions()
  }

  handleSubmit = payload => {
    this.props.updateProduct(this.props.match.params.id, payload, {
      onSuccess: () => notification.success({ message: 'Sửa mặt hàng thành công' }),
      onError: error => notification.error({ message: `${error} - Sửa mặt hàng thất bại` }),
    })
  };

  render() {
    const { product, units, conditions } = this.props
    return (
      <Row>
        <Col span="14" offset="5">
          <Card>
            <h1>Sửa thông tin hàng hóa</h1>
            <hr />
            <ProductForm
              editMode
              product={product}
              units={units}
              conditions={conditions}
              onSubmit={this.handleSubmit}
            />
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  units: select(state, ['generalReducer', 'productUnit'], 'items'),
  conditions: select(state, ['generalReducer', 'productCondition'], 'items'),
  product: select(state, ['productReducer', 'detail'], 'item'),
  isFetching: select(state, ['productReducer', 'detail'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(getProduct(id)),
  getProductUnits: () => dispatch(getProductUnits()),
  getProductConditions: () => dispatch(getProductConditions()),
  updateProduct: (id, payload, meta) => dispatch(updateProduct(id, payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadingHOC(WithPageHOC('product', 'data')(EditProductPage)))
