/* eslint react/prop-types: 0 */
import React, { Component, Fragment } from 'react'
import { Button, Row, Col, Modal } from 'antd'
import { connect } from 'react-redux'

import VehicleList from './components/List'
import VehicleCard from './components/Card'
import FilterRow from './components/Filter'
import UploadForm from '../../components/UploadForm'
import WithPageHOC from '../../hoc/page'
import { getVehicles, importVehicles } from './actions'
import { getDrivers } from '../Driver/actions'
import { getVehicleTypes } from '../General/actions'
import select from '../../util/select'
import ROUTER from '../../constants/router'

class VehiclesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: {},
      showVehicleModal: false,
      showUploadForm: false,
      filterOptions: {},
      pagingOptions: {
        page: 1,
        pageSize: 10,
      },
    }
  }

  componentDidMount() {
    const { meta } = this.props
    this.props.getVehicles({
      page: meta.get('current') === 0 ? 1 : meta.get('current'),
      pageSize: meta.get('pageSize') === 0 ? 10 : meta.get('pageSize'),
    })
    this.props.getDrivers()
    this.props.getVehicleTypes()
  }

  handleAdd = () => this.props.history.push(ROUTER.VEHICLE.ADD);

  viewVehicle = (e, vehicle) => {
    e.preventDefault()
    this.setState({ vehicle, showVehicleModal: true })
  };

  handleCancel = () => this.setState({ showVehicleModal: false });

  handleFilter = filterOptions => {
    this.setState({ filterOptions })
    this.props.getVehicles({
      ...filterOptions,
      ...this.state.pagingOptions,
    })
  };

  editVehicle = id => this.props.history.push(ROUTER.VEHICLE.EDIT.replace(':id', id));

  onChangePage = (page, pageSize) => this.props.getVehicles({
    ...this.state.filterOptions,
    page,
    pageSize,
  });

  render() {
    const { vehicle, showVehicleModal, showUploadForm } = this.state
    const { vehicles, meta, vehicleTypes, drivers, isFetching } = this.props
    return (
      <Fragment>
        <Row gutter={24}>
          <Col span={6}>
            <FilterRow
              vehicleTypes={vehicleTypes}
              disabled={isFetching}
              drivers={drivers}
              onFilter={this.handleFilter}
            />
          </Col>
          <Col span={18}>
            <Button icon="plus" onClick={this.handleAdd} disabled={isFetching}>
              Thêm phương tiện
            </Button>
            <VehicleList
              style={{ marginTop: 10 }}
              vehicles={vehicles}
              isFetching={isFetching}
              meta={meta}
              onEdit={this.editVehicle}
              onView={this.viewVehicle}
              onChangePage={this.onChangePage}
              onChangeSize={this.onChangePage}
            />
          </Col>
        </Row>

        <Modal
          title="Thêm từ file Excel"
          visible={showUploadForm}
          closable={false}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <UploadForm isFetching={isFetching} contentLoading="Đang xử lí dữ liệu" onUpload={this.upload} />
        </Modal>
        <Modal
          title="Chi tiết phương tiện"
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          visible={showVehicleModal}
          closable={false}
          footer={[
            <Button key="edit" type="primary" onClick={() => this.editVehicle(vehicle.ID)}>
              Cập nhật
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <VehicleCard vehicle={vehicle} />
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  vehicleTypes: select(state, ['generalReducer', 'vehicleType'], 'items'),
  drivers: select(state, 'driverReducer', 'items'),
  vehicles: select(state, 'vehicleReducer', 'items'),
  meta: select(state, 'vehicleReducer', 'meta'),
  isFetching: select(state, 'vehicleReducer', 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getVehicles: filterOptions => dispatch(getVehicles(filterOptions)),
  getVehicleTypes: () => dispatch(getVehicleTypes()),
  getDrivers: () => dispatch(getDrivers()),
  importVehicles: (payload, meta) => dispatch(importVehicles(payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPageHOC('vehicle', 'data')(VehiclesPage))
