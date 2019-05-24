/* eslint react/prop-types: 0 */
import React, { Component, Fragment } from 'react'
import { Button, Row, Col, Modal, notification } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import DriverList from './components/List'
import DriverCard from './components/Card'
import FilterRow from './components/Filter'
import ResetPasswordForm from './components/ResetPasswordForm'
import { getDrivers, resetDriverPassword } from './actions'
import { getVehicleTypes } from '../General/actions'
import WithPageHOC from '../../hoc/page'
import ROUTER from '../../constants/router'
import select from '../../util/select'

class DriversPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      driver: {},
      showDriverModal: false,
      showResetForm: false,
      filterOptions: {},
    }
  }

  componentDidMount() {
    const { meta } = this.props
    this.props.getDrivers({
      Page: meta.get('current') === 0 ? 1 : meta.get('current'),
      PageSize: meta.get('pageSize') === 0 ? 10 : meta.get('pageSize'),
    })
    this.props.getVehicleTypes()
  }

  handleAdd = () => {
    this.props.history.push(ROUTER.DRIVER.ADD)
  };

  viewDriver = (e, driver) => {
    e.preventDefault()
    this.setState({ driver, showDriverModal: true })
  };

  onResetPassword = driver => this.setState({ showResetForm: true, driver });

  handleCancel = () => this.setState({ showDriverModal: false, showResetForm: false });

  handleResetForm = () => {
    const { form } = this.formRef.props
    form.validateFields((errors, values) => {
      const { DriverID, NewPassword } = values
      this.props.resetDriverPassword(
        { DriverID, NewPassword },
        {
          onSuccess: () => {
            notification.success({ message: 'Cập nhật mật khẩu thành công' })
            this.handleCancel()
          },
          onError: error => notification.error({ message: `${error} - Cập nhật mật khẩu thất bại !` }),
        },
      )
    })
  };

  saveFormRef = formRef => {
    this.formRef = formRef
  };

  editDriver = id => this.props.history.push(ROUTER.DRIVER.EDIT.replace(':id', id));

  handleFilter = filterOptions => {
    this.setState({ filterOptions })
    this.props.getDrivers({
      ...filterOptions,
      Page: 1,
      PageSize: 10,
      DoB: filterOptions.DoB ? moment(filterOptions.DoB).format('DD/MM/YYYY') : null,
    })
  };

  onChangePage = (Page, PageSize) => {
    const { filterOptions } = this.state
    this.setState(() => ({
      pagingOptions: {
        Page,
        PageSize,
      },
    }))
    this.props.getDrivers({ ...filterOptions, Page, PageSize })
  };

  render() {
    const { showDriverModal, driver, showResetForm } = this.state
    const { drivers, isFetching, meta, vehicleTypes } = this.props
    return (
      <Fragment>
        <Row gutter={24}>
          <Col span={6}>
            <FilterRow vehicleTypes={vehicleTypes} disabled={isFetching} onFilter={this.handleFilter} />
          </Col>
          <Col span={18}>
            <Button icon="plus" onClick={this.handleAdd}>
              Thêm lái xe
            </Button>
            <DriverList
              style={{ marginTop: 10 }}
              drivers={drivers}
              isFetching={isFetching}
              meta={meta}
              onEdit={this.editDriver}
              onDelete={this.deleteDriver}
              onView={this.viewDriver}
              onChangePage={this.onChangePage}
              onChangeSize={this.onChangePage}
              onResetPassword={this.onResetPassword}
            />
          </Col>
        </Row>
        <Modal
          title="Chi tiết lái xe"
          visible={showDriverModal}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          closable={false}
          footer={[
            <Button type="primary" key="edit" onClick={() => this.editDriver(driver.ID)}>
              Cập nhật
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <DriverCard driver={driver} />
        </Modal>
        <Modal
          title="Đặt lại mật khẩu cho lái xe"
          visible={showResetForm}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
          closable={false}
          centered
          footer={[
            <Button key="edit" type="primary" onClick={() => this.handleResetForm()}>
              Cập nhật
            </Button>,
            <Button key="back" onClick={this.handleCancel}>
              Đóng
            </Button>,
          ]}
        >
          <ResetPasswordForm wrappedComponentRef={this.saveFormRef} driver={driver} />
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  drivers: select(state, 'driverReducer', 'items'),
  vehicleTypes: select(state, ['generalReducer', 'vehicleType'], 'items'),
  meta: select(state, 'driverReducer', 'meta'),
  isFetching: select(state, 'driverReducer', 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getDrivers: filterOptions => dispatch(getDrivers(filterOptions)),
  getVehicleTypes: () => dispatch(getVehicleTypes()),
  resetDriverPassword: (payload, meta) => dispatch(resetDriverPassword(payload, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPageHOC('driver', 'data')(DriversPage))
