/* eslint react/prop-types: 0 */
import React from 'react'
import { Row, Col, Card, notification, Radio, Divider } from 'antd'
import { connect } from 'react-redux'

import { insertCustomer, importCustomers } from './actions'
import CustomerForm from './components/customer-form'
import UploadForm from '../../components/UploadForm'
import WithPageHOC from '../../hoc/page'

import ROUTER from '../../constants/router'
import select from '../../util/select'

class AddCustomerPage extends React.Component {
  state = { isBatch: false }

  onChangeInsertType = ({ target: { value } }) => this.setState(() => ({ isBatch: value }))

  handleSubmit = formData => {
    this.props.insertCustomer(formData, {
      onSuccess: () => {
        notification.success({ message: 'Thêm khách hàng thành công' })
        this.props.history.push(ROUTER.CUSTOMER.INDEX)
      },
      onError: error => notification.error({ message: `${error} - Thêm khách hàng thất bại` }),
    })
  }

  handleUpload = async ({ current: { files } }) => {
    const formData = new FormData()
    formData.append('file', files[0])
    this.props.importCustomers(formData, {
      onSuccess: () => {
        notification.success({ message: 'Thêm thành công' })
        this.props.history.push(ROUTER.CUSTOMER.INDEX)
      },
      onError: error => notification.error({ message: `Thêm thất bại - ${error}` }),
    })
  }

  render() {
    const { isBatch } = this.state
    const { isFetching } = this.props
    return (
      <Row>
        <Col span={24}>
          <Radio.Group value={isBatch} buttonStyle="solid" onChange={this.onChangeInsertType}>
            <Radio.Button value={false}>Thêm một khách hàng</Radio.Button>
            <Radio.Button value>Thêm nhiều khách hàng </Radio.Button>
          </Radio.Group>
          <Divider dashed />
          <Card title={<h1>Thêm khách hàng mới</h1>}>
            {isBatch ? (
              <UploadForm
                isFetching={isFetching}
                contentLoading="Đang xử lí dữ liệu"
                supportContent={(
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/spreadsheets/d/1i4FIMuMNgcVfTSg1PbruLDFQk9XEAbwMsfxsRVDMbjU/edit?usp=sharing"
                  >
                    Mẫu file excel
                  </a>
                )}
                onUpload={this.handleUpload}
              />
            ) : (
              <CustomerForm onSubmit={this.handleSubmit} />
            )}
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({ isFetching: select(state, ['customerReducer', 'customer'], 'isFetching') })

const mapDispatchToProps = dispatch => ({
  insertCustomer: (payload, meta) => dispatch(insertCustomer(payload, meta)),
  importCustomers: (payload, meta) => dispatch(importCustomers(payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithPageHOC('customer', 'data')(AddCustomerPage))
