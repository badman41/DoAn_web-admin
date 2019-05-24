/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, notification } from 'antd'

import DriverForm from './components/Form'
import { getDriver, updateDriver, deleteDriver } from './actions'

import { getVehicleTypes } from '../General/actions'

import select from '../../util/select'
import WithLoadingHOC from '../../hoc/loading'
import WithPageHOC from '../../hoc/page'
import ROUTER from '../../constants/router'

class EditDriverPage extends React.Component {
  componentDidMount() {
    this.props.getDriver(this.props.match.params.id)
    this.props.getVehicleTypes()
  }

  handleSubmit = payload => {
    this.props.updateDriver(this.props.match.params.id, payload, {
      onSuccess: () => {
        notification.success({ message: 'Cập nhập thành công' })
        this.props.history.push(ROUTER.DRIVER.INDEX)
      },
      onError: error => notification.error({ message: `${error}, "Cập nhật gặp lỗi !"` }),
    })
  };

  handleDelete = () => {
    this.props.deleteDriver(this.props.match.params.id, {
      onSuccess: () => {
        this.props.history.push(ROUTER.DRIVER.INDEX)
        notification.success({ message: 'Xoá lái xe thành công' })
      },
      onError: error => notification.error({ message: `${error}, "Cập nhật gặp lỗi !"` }),
    })
  }

  render() {
    const { driver, vehicleTypes, isFetching } = this.props
    return (
      <Row>
        <Col span="14" offset="5">
          <Card>
            <h1>Sửa thông tin lái xe</h1>
            <hr />
            <DriverForm
              editMode
              isFetching={isFetching}
              driver={driver}
              vehicleTypes={vehicleTypes}
              onSubmit={this.handleSubmit}
              onDelete={this.handleDelete}
            />
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  driver: select(state, 'driverReducer', 'editingDriver'),
  vehicleTypes: select(state, ['generalReducer', 'vehicleType'], 'items'),
  isFetching: select(state, 'driverReducer', 'isFetching') || select(state, 'vehicleReducer', 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getDriver: id => dispatch(getDriver(id)),
  getVehicleTypes: () => dispatch(getVehicleTypes()),
  updateDriver: (id, payload, meta) => dispatch(updateDriver(id, payload, meta)),
  deleteDriver: (id, meta) => dispatch(deleteDriver(id, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadingHOC(WithPageHOC('driver', 'data')(EditDriverPage)))
