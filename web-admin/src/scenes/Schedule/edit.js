/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'
import { getSchedule, updateSchedule, updateSolution, stopLoading } from './actions'
import select from '../../util/select'
import Config from '../../hoc/page'
import ROUTER from '../../constants/router'

import ScheduleForm from './components/schedule-form'
import SolutionMap from './components/solution-map'
import EditRouteCard from './components/edit-route-card'

class EditSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updatedData: [],
      UpdatedDuration: 0,
      UpdatedDistance: 0,
    }
  }

  async componentDidMount() {
    await this.props.getSchedule(this.props.match.params.id)
    // this.props
    //   .updateSolution(
    //     this.props.schedule.Routes.map((item, index) => ({
    //       depot: {
    //         lat: 20.995271,
    //         lng: 105.780953,
    //       },
    //       distance: 0,
    //       duration: 0,
    //       order: index,
    //       weight: 0,
    //       nodes: item.Customers.map((customer, index) => ({
    //         invoice: {
    //           CustomerID: customer.ID,
    //           Address: {
    //             Lat: customer.Address.Lat,
    //             Lng: customer.Address.Lng,
    //           },
    //           numberOfOrder: index,
    //           WeightTotal: 0,
    //         },
    //       })),
    //     })),
    //   )
    //   .then(({ response: { data }, error }) => {
    //     this.setState({
    //       updatedData: data,
    //       UpdatedDistance: data
    //         .map(item => item.distance)
    //         .reduce((a, b) => a + b),
    //       UpdatedDuration: data
    //         .map(item => item.duration)
    //         .reduce((a, b) => a + b),
    //     });
    //     this.props.stopLoading();
    //   });
  }

  collectMapData = () => {
    const solution = this.props.schedule.toJS()
    const mapData = {
      depot: {
        lat: 20.995271,
        lng: 105.780953,
      },
      nodes: [],
      routes: [],
    }
    if (!_.isEmpty(solution)) {
      const { Routes } = solution
      mapData.depot = {
        lat: Routes[0].Depot.Lat,
        lng: Routes[0].Depot.Lng,
      }
      Routes.forEach(route => {
        const parsedRoute = {
          depot: {
            lat: Routes[0].Depot.Lat,
            lng: Routes[0].Depot.Lng,
          },
          nodes: route.Customers.map(customer => ({
            lat: customer.Address.Lat,
            lng: customer.Address.Lng,
            invoice: customer.Invoices ? customer.Invoices : [],
            ID: customer.ID,
          })),
        }
        mapData.routes.push(parsedRoute)
        route.Customers.forEach(customer => {
          mapData.nodes.push({
            lat: customer.Address.Lat,
            lng: customer.Address.Lng,
            invoice: customer.Invoices ? customer.Invoices : [],
            ID: customer.ID,
          })
        })
      })
    }
    return mapData
  };

  collectDrivers = () => {
    const schedule = this.props.schedule.toJS()
    const { Routes } = schedule
    if (Routes) {
      return Routes.map(_ => ({
        ID: _.DriverInfo.ID,
        DriverInfo: _.DriverInfo,
      }))
    }
    return []
  }

  collectSolution = () => {
    const schedule = this.props.schedule.toJS()
    const { Routes } = schedule
    let routes = []
    if (Routes) {
      routes = Routes.map((route, routeIndex) => ({
        depot: {
          lat: route.Depot.Lat,
          lng: route.Depot.Lng,
        },
        distance: route.EstimatedDistance,
        duration: route.EstimatedDuration,
        numberOfOrder: routeIndex,
        weight: route.Weight,
        nodes: route.Customers.map(customer => ({
          driverRole: customer.DriverRole,
          id: customer.ID,
          invoice: { CustomerCode: customer.Name },
          lat: customer.Address.Lat,
          lng: customer.Address.Lng,
        })),
      }))
    }
    return { routes }
  }

    handleSubmit = async values => {
      const { updatedData } = this.state
      await this.props.updateSchedule(this.props.match.params.id, {
        ...this.props.schedule,
        ...values,
        Routes: this.props.schedule.Routes.map((item, index) => ({
          ...item,
          DriverID: item.DriverInfo.ID,
          Depot: {
            Address:
                        'Nhà A tầng 2 khu VL1, khu Trung tâm Thương mại Dịch Vụ Trung Văn 1',
            Lat: 20.995271,
            Lng: 105.780953,
            WarehouseId: '',
          },
          Weight: 0,
          Status: 0,
          EstimatedDuration: updatedData[index].duration,
          EstimatedDistance: updatedData[index].distance,
          Customers: item.Customers.map(customer => ({
            ...customer,
            CustomerID: customer.ID,
            Invoices: [],
            Status: 0,
            Weight: 0,
          })),
        })),
      })
      this.props.history.push(ROUTER.ROUTE.SCHEDULE.INDEX)
    };

    onShowNodeInfo = () => {}

    onSortDrivers = () => {}

    onChangeNodePosition = () => {}

    onSwapNodes = () => {}

    onChangeDriverNote = () => {}

    render() {
      const { schedule, isFetching, mapConfig } = this.props
      const { UpdatedDuration, UpdatedDistance } = this.state
      return (
        <div>
          <SolutionMap
            data={this.collectMapData()}
            mapConfig={mapConfig}
            onShowNodeInfo={this.onShowNodeInfo}
          />
          <EditRouteCard
            drivers={this.collectDrivers()}
            solution={this.collectSolution()}
            isFetching={isFetching}
            isBlur
            onShowNodeInfo={this.onShowNodeInfo}
            onSortDrivers={this.onSortDrivers}
            onChangeNodePosition={this.onChangeNodePosition}
            onSwapNodes={this.onSwapNodes}
            onChangeDriverNote={this.onChangeDriverNote}
          />
          <ScheduleForm
            UpdatedDistance={UpdatedDistance}
            UpdatedDuration={UpdatedDuration}
            schedule={schedule}
            isFetching={isFetching}
            contentLoading="Đang tính toán"
            isBlur
            onSubmit={this.handleSubmit}
          />
        </div>
      )
    }
}

const mapStateToProps = state => ({
  schedule: select(state, ['scheduleReducer', 'detail'], 'item'),
  mapConfig: select(state, ['scheduleReducer', 'detail'], 'mapConfig'),
  isFetching: select(state, ['scheduleReducer', 'detail'], 'isFetching') || select(state, 'routingReducer', 'isFetching'),
})

const mapDispatchToProps = dispatch => ({
  getSchedule: id => dispatch(getSchedule(id)),
  updateSchedule: (id, payload) => dispatch(updateSchedule(id, payload)),
  updateSolution: routes => dispatch(updateSolution(routes)),
  stopLoading: () => dispatch(stopLoading()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Config('schedule', 'route')(EditSchedule))
