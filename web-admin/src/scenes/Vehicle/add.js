/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, notification, Radio, Divider } from 'antd'

import WithLoadingHOC from '../../hoc/loading'
import WithPageHOC from '../../hoc/page'
import UploadForm from '../../components/UploadForm'
import VehicleForm from './components/Form'
import { insertVehicle, importVehicles } from './actions'
import { getVehicleTypes } from '../General/actions'

import { getDrivers } from '../Driver/actions'
import select from '../../util/select'
import ROUTER from '../../constants/router'

class AddVehicle extends React.Component {
  state = { isBatch: false };

  componentDidMount() {
    this.props.getDrivers()
    this.props.getVehicleTypes()
  }

  onChangeInsertType = ({ target: { value } }) => this.setState(() => ({ isBatch: value }));

  handleUpload = ({ current: { files } }) => {
    const formData = new FormData()
    formData.append('file', files[0])
    this.props.importVehicles(formData, {
      onSuccess: () => {
        notification.success({ message: 'Thêm thành công' })
        this.props.history.push(ROUTER.VEHICLE.INDEX)
      },
      onError: error => notification.error({ message: `Thêm thất bại - ${error}` }),
    })
  };

  handleSubmit = payload => {
    this.props.insertVehicle(payload, {
      onSuccess: () => {
        notification.success({ message: 'Thêm phương tiện thành công ' })
        this.props.history.push(ROUTER.VEHICLE.INDEX)
      },
      onError: (error) => {
        console.log(error)
        notification.error({ message: `Thêm phương tiện thất bại` })
        this.props.history.push(ROUTER.VEHICLE.INDEX)
      } 
    })
  };


  render() {
    const { listDriver, vehicleTypes, isFetching } = this.props
    const { isBatch } = this.state
    return (
      <Row>
        <Col span={14} offset={5}>
          <Radio.Group value={isBatch} buttonStyle="solid" onChange={this.onChangeInsertType}>
            <Radio.Button value={false}>Thêm một phương tiện</Radio.Button>
            <Radio.Button value>Thêm nhiều tiện phương tiện</Radio.Button>
          </Radio.Group>
          <Divider dashed />
          <Card>
            <h1>Thêm phương tiện mới</h1>
            <hr />
            {isBatch ? (
              <UploadForm
                isFetching={isFetching}
                contentLoading="Đang xử lí dữ liệu"
                supportContent={(
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.google.com/spreadsheets/d/1Woc6UXPKngA9eKBxXe6k9zBEsPNZSwyiKKT2BJl4fm4/edit?usp=sharing"
                  >
                    Mẫu file excel
                  </a>
                )}
                onUpload={this.handleUpload}
              />
            ) : (
              <VehicleForm
                listDriver={listDriver}
                typeVehicle={vehicleTypes}
                onSubmit={this.handleSubmit}
              />
            )}
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  listDriver: select(state, 'driverReducer', 'items'),
  vehicleTypes: select(state, ['generalReducer', 'vehicleType'], 'items'),
  isFetching: select(state, 'vehicleReducer', 'isFetching') || select(state, 'driverReducer', 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getDrivers: () => dispatch(getDrivers()),
  getVehicleTypes: () => dispatch(getVehicleTypes()),
  insertVehicle: (payload, meta) => dispatch(insertVehicle(payload, meta)),
  importVehicles: (payload, meta) => dispatch(importVehicles(payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadingHOC(WithPageHOC('vehicle', 'data')(AddVehicle)))
