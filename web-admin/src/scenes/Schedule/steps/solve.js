/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import _ from 'lodash'

import SolutionMap from '../components/solution-map'
import EditRouteCard from '../components/edit-route-card'
import UpdateNodeModal from '../components/edit-node-modal'

import { showNodeInfo, sortDrivers, updateRoutes, updateDriverNote, updateSolution, updateNodeInfo } from '../actions'
import { moveElement } from '../../../util/array'
import select from '../../../util/select'

class SolutionStep extends Component {
  state = {
    driver: {},
    node: {},
    showUpdateNodeModal: false,
  }

  collectMapData = () => {
    const solution = this.props.solution.toJS()
    const invoices = this.props.selectedInvoices.toJS()
    const mapData = {
      depot: {
        lat: 20.995271,
        lng: 105.780953,
      },
      nodes: [],
      routes: [],
    }
    if (!_.isEmpty(solution)) {
      const { routes } = solution
      mapData.depot = routes[0].depot
      routes.forEach(route => {
        mapData.routes.push(route)
        route.nodes.forEach(node => {
          const invoice = invoices.find(item => item.CustomerID === node.id)
          mapData.nodes.push({
            ...node,
            invoice,
            showInfo: false,
            driverRole: 2,
          })
        })
      })
    }
    return mapData
  };

  onChangeNodePosition = (node, source, target) => {
    const solution = this.props.solution.toJS()
    const { routes } = solution
    let updatedRoutes = []
    if (source.routeIndex === target.routeIndex) {
      updatedRoutes = routes.map((route, routeIndex) => {
        if (routeIndex === source.routeIndex) {
          return {
            ...route,
            nodes: moveElement(route.nodes, source.nodeIndex, target.nodeIndex),
          }
        }
        return route
      })
    } else {
      const deleteSource = update(routes, { [source.routeIndex]: { nodes: { $splice: [[source.nodeIndex, 1]] } } })
      updatedRoutes = update(deleteSource, { [target.routeIndex]: { nodes: { $splice: [[target.nodeIndex + 1, 0, node]] } } })
    }

    this.props
      .updateSolution(
        updatedRoutes.filter(
          item => item.numberOfOrder === source.routeIndex || item.numberOfOrder === target.routeIndex,
        ),
        updatedRoutes,
        { onSuccess: newRoutes => this.props.updateRoutes(newRoutes) },
      )
  };

  onShowNodeInfo = (node, routeIndex) => {
    const drivers = this.props.drivers.toJS()
    this.setState(() => ({
      driver: {
        name: drivers[routeIndex].DriverInfo.Name,
        phone: drivers[routeIndex].DriverInfo.PhoneNumber,
        role: node.driverRole,
      },
      node,
      showUpdateNodeModal: true,
    }))
    this.props.showNodeInfo(node)
  };

  closeUpdateModal = () => {
    this.setState(() => ({ showUpdateNodeModal: false }))
  }

  changeDriverRole = e => {
    this.setState(prevState => ({ driver: { ...prevState.driver, role: e.target.value } }))
  }

  updateDriverRole = driverRole => {
    this.props.updateNodeInfo({ ...this.state.node, driverRole })
    this.setState({ showUpdateNodeModal: false })
  }

  onSwapNodes = (source, target) => {
    const { routes } = this.props.solution.toJS()
    const replaceSourceWithTarget = routes.map((route, routeIndex) => {
      if (source.routeIndex === routeIndex) {
        const updatedNodes = route.nodes.map((node, nodeIndex) => {
          if (nodeIndex === source.nodeIndex) {
            return target.node
          }
          return node
        })
        return {
          ...route,
          nodes: updatedNodes,
        }
      }
      return route
    })
    const replaceTargetWithSource = replaceSourceWithTarget.map((route, routeIndex) => {
      if (target.routeIndex === routeIndex) {
        const updatedNodes = route.nodes.map((node, nodeIndex) => {
          if (nodeIndex === target.nodeIndex) {
            return source.node
          }
          return node
        })
        return {
          ...route,
          nodes: updatedNodes,
        }
      }
      return route
    })
    this.props
      .updateSolution(
        replaceTargetWithSource.filter(
          item => item.numberOfOrder === source.routeIndex || item.numberOfOrder === target.routeIndex,
        ),
        replaceTargetWithSource,
        {
          onSuccess: newRoutes => {
            this.props.updateRoutes(newRoutes)
          },
          onError: error => console.log(error),
        },
      )
  };

  onSortDrivers = updatedDrivers => {
    this.props.sortDrivers(updatedDrivers)
  };

  onChangeDriverNote = (driver, note) => {
    this.props.updateDriverNote(driver, note)
  };

  render() {
    const { drivers, solution, mapConfig, isFetching, onSolve } = this.props
    const { driver, node, showUpdateNodeModal } = this.state

    const defaultNodes = this.props.selectedInvoices.toJS().map(item => ({
      lat: item.Address.Lat,
      lng: item.Address.Lng,
      invoice: item,
    }))
    return (
      <div>
        <SolutionMap
          data={this.collectMapData()}
          defaultNodes={defaultNodes}
          mapConfig={mapConfig}
          onShowNodeInfo={this.onShowNodeInfo}
        />
        <EditRouteCard
          onSolve={onSolve}
          drivers={drivers}
          isFetching={isFetching}
          isBlur
          solution={solution}
          onShowNodeInfo={this.onShowNodeInfo}
          onSortDrivers={this.onSortDrivers}
          onChangeNodePosition={this.onChangeNodePosition}
          onSwapNodes={this.onSwapNodes}
          onChangeDriverNote={this.onChangeDriverNote}
        />
        <UpdateNodeModal
          visible={showUpdateNodeModal}
          node={node}
          driver={driver}
          onCancel={this.closeUpdateModal}
          onChange={this.changeDriverRole}
          onUpdate={this.updateDriverRole}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  solution: select(state, 'routingReducer', 'solution'),
  drivers: select(state, 'routingReducer', 'drivers'),
  invoices: select(state, ['invoiceReducer', 'listForRouting'], 'items'),
  selectedInvoices: select(state, 'routingReducer', 'invoices'),
  isFetching: select(state, 'routingReducer', 'isFetching'),
  mapConfig: select(state, 'routingReducer', 'mapConfig'),
})

const mapDispatchToProps = dispatch => ({
  showNodeInfo: node => dispatch(showNodeInfo(node)),
  updateNodeInfo: node => dispatch(updateNodeInfo(node)),
  sortDrivers: updatedDrivers => dispatch(sortDrivers(updatedDrivers)),
  updateRoutes: updatedRoutes => dispatch(updateRoutes(updatedRoutes)),
  updateDriverNote: (driver, note) => dispatch(updateDriverNote(driver, note)),
  updateSolution: (change, source, meta) => dispatch(updateSolution(change, source, meta)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SolutionStep)
