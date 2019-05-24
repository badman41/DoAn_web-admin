/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, notification } from 'antd'
import VehicleForm from './components/Form'
import WithPageHOC from '../../hoc/page'
import { getVehicle, updateVehicle } from './actions'

import { getDrivers } from '../Driver/actions'
import { getVehicleTypes } from '../General/actions'
import select from '../../util/select'
import WithLoadingHOC from '../../hoc/loading'
import ROUTER from '../../constants/router'

class EditVehiclePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getVehicle(this.props.match.params.id)
    this.props.getVehicleTypes()
    this.props.getDrivers()
  }

  handleSubmit = payload => {
    this.props.updateVehicle(this.props.match.params.id, payload, {
      onSuccess: () => {
        notification.success({ message: 'Cập nhật thành công' })
        this.props.history.push(ROUTER.VEHICLE.INDEX)
      },
      onError: () => notification.error({ message: 'Cập nhật thất bại' }),
    })
  };

  render() {
    const { vehicle, vehicleTypes, listDriver } = this.props
    return (
      <Row>
        <Col span="14" offset="5">
          <Card>
            <h1>Sửa thông tin phương tiện</h1>
            <hr />
            <VehicleForm
              editMode
              vehicle={vehicle}
              listDriver={listDriver}
              typeVehicle={vehicleTypes}
              onSubmit={this.handleSubmit}
            />
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  vehicleTypes: select(state, ['generalReducer', 'vehicleType'], 'items'),
  listDriver: select(state, 'driverReducer', 'items'),
  vehicle: select(state, 'vehicleReducer', 'editingVehicle'),
  isFetching: select(state, 'vehicleReducer', 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getVehicle: id => dispatch(getVehicle(id)),
  getVehicleTypes: () => dispatch(getVehicleTypes()),
  getDrivers: () => dispatch(getDrivers()),
  updateVehicle: (id, payload, meta) => dispatch(updateVehicle(id, payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadingHOC(WithPageHOC('vehicle', 'data')(EditVehiclePage)))
