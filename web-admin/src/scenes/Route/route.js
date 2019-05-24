/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { Divider, Modal, Button } from 'antd'

import RouteFilter from './components/RouteFilter'
import RouteComponents from '../Schedule/components/route-component'

import WithPageHOC from '../../hoc/page'
import select from '../../util/select'
import { getRoutes, getRoutesIfNeed, getRouteTracking, changeDriverOnRoute } from './actions'
import { getDriversIfNeed } from '../Driver/actions'

const { RouteList, RouteDetail } = RouteComponents

class Route extends React.Component {
  state = {
    currentViewRoute: { Customers: [] },
    showRouteDetail: false,
  };

  static getDerivedStateFromProps(nextProps) {
    const { currentDriverId } = nextProps
    nextProps.getDriversIfNeed()
    if (currentDriverId) {
      nextProps.getRoutesIfNeed(currentDriverId)
    }
    return null
  }

  handleSubmit = params => this.props.getRoutes(params);

  viewDetail = route => {
    this.props.getRouteTracking({ RouteID: route.RouteID })
    this.setState({ currentViewRoute: route, showRouteDetail: true })
  };

  onCancel = () => this.setState({ showRouteDetail: false });

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
    const { routes, drivers, isFetching, mapConfig } = this.props
    const { showRouteDetail, currentViewRoute } = this.state
    return (
      <div>
        <RouteFilter drivers={drivers} disabled={isFetching} onSubmit={this.handleSubmit} />
        <Divider />
        <RouteList
          routes={routes}
          drivers={drivers}
          isFetching={isFetching}
          viewDetail={this.viewDetail}
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
  routes: select(state, ['routeReducer', 'list'], 'items'),
  currentDriverId: select(state, ['routeReducer', 'list'], 'driverId'),
  drivers: select(state, 'driverReducer', 'items'),
  isFetching: select(state, ['routeReducer', 'list'], 'isFetching'),
  didInvalidate: select(state, ['routeReducer', 'list'], 'didInvalidate'),
  routeTracking: select(state, ['routeReducer', 'list'], 'routeTracking'),
  mapConfig: select(state, ['routeReducer', 'list'], 'mapConfig'),
})

const mapDispatchToProps = dispatch => ({
  getRoutes: filterOptions => dispatch(getRoutes(filterOptions)),
  getRoutesIfNeed: driverId => dispatch(getRoutesIfNeed(driverId)),
  getDriversIfNeed: () => dispatch(getDriversIfNeed()),
  getRouteTracking: params => dispatch(getRouteTracking(params)),
  changeDriverOnRoute: (routeId, driverId) => dispatch(changeDriverOnRoute(routeId, driverId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithPageHOC('routes', 'route')(Route))
