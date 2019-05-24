/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, notification, Radio, Divider } from 'antd'

import WithLoadingHOC from '../../hoc/loading'
import WithPageHOC from '../../hoc/page'
import UploadForm from '../../components/UploadForm'
import select from '../../util/select'
import { insertProduct, importProducts } from './actions'
import { getProductUnits, getProductConditions } from '../General/actions'
import ProductForm from './components/Form'
import router from '../../constants/router'

class AddProductPage extends React.Component {
  state = { isBatch: false };

  componentDidMount() {
    this.props.getProductUnits()
    this.props.getProductConditions()
  }

  onChangeInsertType = ({ target: { value } }) => this.setState(() => ({ isBatch: value }));

  handleUpload = async ({ current: { files } }) => {
    const formData = new FormData()
    formData.append('file', files[0])
    this.props.importProducts(formData, {
      onSuccess: () => {
        notification.success({ message: 'Thêm thành công' })
        this.props.history.push(router.PRODUCT.INDEX)
      },
      onError: error => notification.error({ message: `Thêm thất bại - ${error}` }),
    })
  };

  handleSubmit = payload => {
    this.props.insertProduct(payload, {
      onSuccess: () => notification.success({ message: 'Thêm mặt hàng thành công' }),
      onError: error => notification.error({ message: `${error} - Thêm mặt hàng thất bại` }),
    })
  };

  render() {
    const { units, conditions, isFetching } = this.props
    const { isBatch } = this.state
    return (
      <Row>
        <Col span="14" offset="5">
          <Radio.Group value={isBatch} buttonStyle="solid" onChange={this.onChangeInsertType}>
            <Radio.Button value={false}>Thêm một mặt hàng</Radio.Button>
            <Radio.Button value>Thêm nhiều mặt hàng </Radio.Button>
          </Radio.Group>
          <Divider dashed />
          <Card>
            <h1>Thêm hàng hóa mới</h1>
            <hr />
            {isBatch ? (
              <UploadForm
                isFetching={isFetching}
                contentLoading="Đang xử lí dữ liệu"
                supportContent={(
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/spreadsheets/d/1YWiAi0Ki0mefipmaDMGwJMINwL9smv1MBLqQjUoyTAs/edit?usp=sharing"
                  >
                    Mẫu file excel
                  </a>
                )}
                onUpload={this.handleUpload}
              />
            ) : (
              <ProductForm units={units} conditions={conditions} onSubmit={this.handleSubmit} />
            )}
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  units: select(state, ['generalReducer', 'productUnit'], 'items'),
  conditions: select(state, ['generalReducer', 'productCondition'], 'items'),
  isFetching: select(state, ['generalReducer', 'productCondition'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  insertProduct: (payload, meta) => dispatch(insertProduct(payload, meta)),
  importProducts: (payload, meta) => dispatch(importProducts(payload, meta)),
  getProductUnits: () => dispatch(getProductUnits()),
  getProductConditions: () => dispatch(getProductConditions()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadingHOC(WithPageHOC('product', 'data')(AddProductPage)))
