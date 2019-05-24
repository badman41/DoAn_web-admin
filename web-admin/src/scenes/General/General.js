/* eslint react/prop-types: 0 */

import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, notification } from 'antd'
import GeneralComponent from './components/List'
import {
  getProductUnits,
  deleteProductUnit,
  insertProductUnit,
  getVehicleTypes,
  deleteVehicleType,
  insertVehicleType,
  getProductConditions,
  insertProductCondition,
  deleteProductCondition,
} from './actions'
import WithLoadingHOC from '../../hoc/loading'
import Config from '../../hoc/page'
import select from '../../util/select'

const { SelfList } = GeneralComponent

class GeneralPage extends React.Component {
  state = {}

  static getDerivedStateFromProps(nextProps) {
    nextProps.getProductUnits()
    nextProps.getVehicleTypes()
    nextProps.getProductConditions()
    return null
  }

  handleAdd = ({ name }) => {
    this.props.insertVehicleType(
      {
        Name: name,
        Code: name,
      },
      {
        onSuccess: () => notification.success({ message: 'Thêm thành công' }),
        onError: () => notification.error({ message: 'Thêm thất bại' }),
      },
    )
  };

  handleAddProductUnit = ({ name }) => this.props.insertProductUnit(
    {
      ProductUnit: {
        Name: name,
        Code: name,
      },
    },
    {
      onSuccess: () => notification.success({ message: 'Thêm thành công' }),
      onError: () => notification.error({ message: 'Thêm thất bại' }),
    },
  );

  handleAddProductCondition = ({ name }) => this.props.insertProductCondition(
    { Description: name },
    {
      onSuccess: () => notification.success({ message: 'Thêm thành công' }),
      onError: () => notification.error({ message: 'Thêm thất bại' }),
    },
  );

  handleDelete = id => this.props.deleteVehicleType(id, {
    onSuccess: () => notification.success({ message: 'Xóa thành công' }),
    onError: () => notification.error({ message: 'Xóa thất bại' }),
  });

  handleDeleteProductUnit = id => this.props.deleteProductUnit(id, {
    onSuccess: () => notification.success({ message: 'Xóa thành công' }),
    onError: () => notification.error({ message: 'Xóa thất bại' }),
  });

  handleDeleteProductCondition = id => this.props.deleteProductCondition(id, {
    onSuccess: () => notification.success({ message: 'Xóa thành công' }),
    onError: () => notification.error({ message: 'Xóa thất bại' }),
  });

  render() {
    const {
      productUnits,
      vehicleTypes,
      productConditions,
      isConditionFetching,
      isTypeFetching,
      isUnitFetching,
    } = this.props
    return (
      <Row gutter={24}>
        <Col span={12}>
          <SelfList
            isFetching={isUnitFetching}
            dataSource={productUnits}
            onSubmit={this.handleAddProductUnit}
            onDelete={this.handleDeleteProductUnit}
            placeholder="Đơn vị tính"
            title="Đơn vị tính"
          />
        </Col>
        <Col span={12}>
          <SelfList
            isFetching={isTypeFetching}
            dataSource={vehicleTypes}
            onSubmit={this.handleAdd}
            onDelete={this.handleDelete}
            placeholder="Loại phương tiện"
            title="Loại phương tiện"
          />
          <br />
          <SelfList
            isFetching={isConditionFetching}
            dataSource={productConditions}
            onSubmit={this.handleAddProductCondition}
            onDelete={this.handleDeleteProductCondition}
            placeholder="Điều kiện bảo quản"
            title="Điều kiện bảo quản"
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  productUnits: select(state, ['generalReducer', 'productUnit'], 'items'),
  vehicleTypes: select(state, ['generalReducer', 'vehicleType'], 'items'),
  productConditions: select(state, ['generalReducer', 'productCondition'], 'items'),
  isUnitFetching: select(state, ['generalReducer', 'productUnit'], 'isFetching'),
  isTypeFetching: select(state, ['generalReducer', 'vehicleType'], 'isFetching'),
  isConditionFetching: select(state, ['generalReducer', 'productCondition'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getProductUnits: () => dispatch(getProductUnits()),
  insertProductUnit: (payload, meta) => dispatch(insertProductUnit(payload, meta)),
  deleteProductUnit: (id, meta) => dispatch(deleteProductUnit(id, meta)),
  getVehicleTypes: () => dispatch(getVehicleTypes()),
  insertVehicleType: (payload, meta) => dispatch(insertVehicleType(payload, meta)),
  deleteVehicleType: (id, meta) => dispatch(deleteVehicleType(id, meta)),
  getProductConditions: () => dispatch(getProductConditions()),
  insertProductCondition: (payload, meta) => dispatch(insertProductCondition(payload, meta)),
  deleteProductCondition: (id, meta) => dispatch(deleteProductCondition(id, meta)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadingHOC(Config('item', 'general')(GeneralPage)))
