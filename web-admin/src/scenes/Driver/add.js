/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, notification, Radio, Divider } from 'antd'

import DriverForm from './components/Form'
import UploadForm from '../../components/UploadForm'
import WithLoadingHOC from '../../hoc/loading'
import WithPageHOC from '../../hoc/page'

import { insertDriver, importDrivers } from './actions'
import { getVehicleTypes } from '../General/actions'

import ROUTER from '../../constants/router'
import select from '../../util/select'

class AddDriverPage extends React.Component {
  state = { isBatch: false };

  componentDidMount() {
    this.props.getVehicleTypes()
  }

  onChangeInsertType = ({ target: { value } }) => this.setState(() => ({ isBatch: value }));

  handleUpload = async ({ current: { files } }) => {
    const formData = new FormData()
    formData.append('file', files[0])
    this.props.importDrivers(formData, {
      onSuccess: () => {
        notification.success({ message: 'Thêm thành công' })
        this.props.history.push(ROUTER.DRIVER.INDEX)
      },
      onError: error => notification.error({ message: `Thêm thất bại - ${error}` }),
    })
  };

  handleSubmit = payload => {
    this.props.insertDriver(payload, {
      onSuccess: () => {
        notification.success({ message: 'Thêm thành công' })
        this.props.history.push(ROUTER.DRIVER.INDEX)
      },
      onError: error => notification.error({ message: `Thêm thất bại - ${error}` }),
    })
  };

  render() {
    const { vehicleTypes, isFetching } = this.props
    const { isBatch } = this.state
    return (
      <Row>
        <Col span="14" offset="5">
          <Radio.Group value={isBatch} buttonStyle="solid" onChange={this.onChangeInsertType}>
            <Radio.Button value={false}>Thêm một lái xe</Radio.Button>
            <Radio.Button value>Thêm nhiều lái xe </Radio.Button>
          </Radio.Group>
          <Divider dashed />
          <Card>
            <h1>Thêm lái xe mới</h1>
            <hr />
            {isBatch ? (
              <UploadForm
                isFetching={isFetching}
                contentLoading="Đang xử lí dữ liệu"
                supportContent={(
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/spreadsheets/d/1EktwtKGhhblKWVowUsMcVS2HeSE3o1kUI5kClp-8SUc/edit?usp=sharing"
                  >
                    Mẫu file excel
                  </a>
                )}
                onUpload={this.handleUpload}
              />
            ) : (
              <DriverForm vehicleTypes={vehicleTypes} onSubmit={this.handleSubmit} />
            )}
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  vehicleTypes: select(state, ['generalReducer', 'vehicleType'], 'items'),
  isFetching: select(state, 'driverReducer', 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getVehicleTypes: () => dispatch(getVehicleTypes()),
  insertDriver: (payload, meta) => dispatch(insertDriver(payload, meta)),
  importDrivers: (payload, meta) => dispatch(importDrivers(payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadingHOC(WithPageHOC('driver', 'data')(AddDriverPage)))
