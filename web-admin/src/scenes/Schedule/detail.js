import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Map, List } from 'immutable'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd'
import { getSchedule } from './actions'
import { getRouteTracking, changeDriverOnRoute } from '../Route/actions'
import select from '../../util/select'
import Config from '../../hoc/page'
import WithLoading from '../../hoc/loading'
import { getDrivers } from '../Driver/actions'

import ScheduleComponents from './components/schedule-card'
import RouteComponents from './components/route-component'

const { ScheduleCard } = ScheduleComponents
const { RouteList, RouteDetail } = RouteComponents

class ScheduleDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentViewRoute: { Customers: [] },
      showRouteDetail: false,
    }
  }

  componentDidMount() {
    this.props.getSchedule(this.props.match.params.id)
    this.props.getDrivers()
  }

  viewDetail = route => {
    this.props.getRouteTracking({ RouteID: route.RouteID })
    this.setState({ currentViewRoute: route, showRouteDetail: true })
  };

  onCancel = () => this.setState({
    showRouteDetail: false,
    currentViewRoute: { Customers: [] },
  });

  mapData = () => {
    const mapData = {
      depot: {
        lat: 20.995271,
        lng: 105.780953,
      },
      nodes: [],
      path: [],
    }
    const routeTracking = this.props.routeTracking.toJS()
    const { currentViewRoute } = this.state
    if (currentViewRoute.Customers.length) {
      mapData.path = routeTracking.map(point => ({
        lat: point.Point.Lat,
        lng: point.Point.Lng,
      }))
      mapData.nodes = currentViewRoute.Customers.map(customer => ({
        lat: customer.Address.Lat,
        lng: customer.Address.Lng,
        info: customer.Name,
      }))
    }
    return mapData
  };

  changeDriverOnRoute = (routeId, driverId) => {
    const { changeDriverOnRoute } = this.props
    changeDriverOnRoute(routeId, driverId)
  };

  render() {
    const { schedule, isFetching, mapConfig, drivers } = this.props
    const { showRouteDetail, currentViewRoute } = this.state
    return (
      <div>
        <ScheduleCard isFetching={isFetching} solution={schedule} />
        <RouteList
          isFetching={isFetching}
          routes={schedule.get('Routes')}
          viewDetail={this.viewDetail}
          drivers={drivers}
          onUpdateDriver={this.changeDriverOnRoute}
        />
        {this.state.showRouteDetail && (
          <Modal
            width={1000}
            visible={showRouteDetail}
            closable={false}
            centered
            footer={[
              <Button key="close" onClick={this.onCancel}>
                              Đóng cửa sổ
              </Button>,
            ]}
          >
            <RouteDetail mapConfig={mapConfig} data={this.mapData()} route={currentViewRoute} />
          </Modal>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  schedule: select(state, ['scheduleReducer', 'detail'], 'item'),
  isFetching: select(state, ['scheduleReducer', 'detail'], 'isFetching'),
  routeTracking: select(state, 'scheduleReducer', 'routeTracking'),
  mapConfig: select(state, 'scheduleReducer', 'mapConfig'),
  drivers: select(state, 'driverReducer', 'items'),
})

const mapDispatchToProps = dispatch => ({
  getSchedule: id => dispatch(getSchedule(id)),
  getRouteTracking: params => dispatch(getRouteTracking(params)),
  getDrivers: () => dispatch(getDrivers()),
  changeDriverOnRoute: (routeId, driverId) => dispatch(changeDriverOnRoute(routeId, driverId)),
})

ScheduleDetail.propTypes = {
  getSchedule: PropTypes.func.isRequired,
  getRouteTracking: PropTypes.func.isRequired,
  getDrivers: PropTypes.func.isRequired,
  changeDriverOnRoute: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  schedule: ImmutablePropTypes.map,
  routeTracking: ImmutablePropTypes.list,
  mapConfig: ImmutablePropTypes.map,
  drivers: ImmutablePropTypes.list,
  match: PropTypes.object.isRequired,
}

ScheduleDetail.defaultProps = {
  schedule: Map(),
  mapConfig: Map(),
  routeTracking: List(),
  drivers: List(),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Config('schedule', 'route')(WithLoading(ScheduleDetail)))
