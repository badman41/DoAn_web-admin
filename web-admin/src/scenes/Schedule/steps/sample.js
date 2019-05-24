/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import _ from 'lodash'

import SolutionMap from '../components/solution-map'
import EditRouteCard from '../components/edit-route-card'
import {
  showNodeInfo,
  sortDrivers,
  updateRoutes,
  updateDriverNote,
  updateSolution,
  selectSampleSchedule,
  setNodePool,
  getSchedules,
  getSchedule,
} from '../actions'
import { moveElement } from '../../../util/array'

import select from '../../../util/select'

class SampleStep extends Component {
  state = {
    mapData: {
      depot: {
        lat: 20.995271,
        lng: 105.780953,
      },
      nodes: [],
      routes: [],
    },
  };

  componentDidMount() {
    this.props.getSchedules({ Type: 2 })
  }

  collectMapData = solution => {
    let invoices = this.props.selectedInvoices.toJS()
    const drivers = this.props.drivers.toJS()
    const mapData = {
      depot: {
        lat: 20.995271,
        lng: 105.780953,
      },
      nodes: [],
      routes: [],
    }
    if (!_.isEmpty(solution)) {
      mapData.depot = {
        lat: 20.995271,
        lng: 105.780953,
      }
      mapData.routes = solution.Routes.map((route, index) => {
        const customerIds = route.Customers.map(item => item.ID)
        const routeNodes = invoices.filter(invoice => customerIds.includes(invoice.CustomerID))
        invoices = invoices.filter(item => !customerIds.includes(item.CustomerID))
        return {
          depot: mapData.depot,
          distance: route.EstimatedDistance,
          duration: route.EstimatedDuration,
          weight: routeNodes.map(item => item.WeightTotal).reduce((a, b) => a + b, 0),
          numberOfOrder: index,
          nodes: routeNodes.map(invoice => ({
            invoice,
            lat: invoice.Address.Lat,
            lng: invoice.Address.Lng,
            id: invoice.CustomerID,
          })),
        }
      })
      if (drivers.length > mapData.routes.length) {
        while (mapData.routes.length < drivers.length) {
          mapData.routes.push({
            depot: mapData.depot,
            distance: 0,
            duration: 0,
            weight: 0,
            nodes: [],
            numberOfOrder: mapData.routes.length,
          })
        }
      }
      this.props.setNodePool(
        invoices.map(node => ({
          lat: node.Address.Lat,
          lng: node.Address.Lng,
          id: node.CustomerID,
          invoice: node,
        })),
      )

      this.props.updateSolution(mapData.routes).then(({ response, error }) => {
        if (!error) {
          const { data } = response
          mapData.routes = mapData.routes.map((route, index) => ({
            depot: mapData.depot,
            distance: data[index].distance,
            duration: data[index].duration,
            weight: data[index].customers.map(item => item.weight).reduce((a, b) => a + b, 0),
            numberOfOrder: index,
            nodes: route.nodes,
          }))
          this.props.selectSampleSchedule({
            routes: mapData.routes,
            distance: solution.EstimatedDistance,
            duration: solution.EstimatedDuration,
          })
        }
      })
    }

    this.setState({ mapData })
  };

  onChangeNodePosition = (node, source, target) => {
    const solution = this.props.solution.toJS()
    const nodePool = this.props.nodePool.toJS()
    const { routes } = solution
    let updatedRoutes = []
    let tempNode = {}
    if (node.invoice.numberOfOrder !== -1) {
      if (target.routeIndex === -1) {
        updatedRoutes = routes.map((route, routeIndex) => {
          if (routeIndex === source.routeIndex) {
            tempNode = route.nodes[source.nodeIndex]
            return {
              ...route,
              nodes: route.nodes.filter((node, nodeIndex) => nodeIndex !== source.nodeIndex),
            }
          }
          return route
        })
        this.props.setNodePool(nodePool.concat(tempNode))
      } else if (source.routeIndex === -1) {
        updatedRoutes = update(routes, { [target.routeIndex]: { nodes: { $splice: [[target.nodeIndex + 1, 0, node]] } } })
        this.props.setNodePool(nodePool.filter(item => item.id !== node.id))
      } else if (source.routeIndex === target.routeIndex) {
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
    }
  };

  onShowNodeInfo = node => {
    if (node.invoice.numberOfOrder !== -1) this.props.showNodeInfo(node)
  };

  onSwapNodes = (source, target) => {
    let replaceTargetWithSource = []
    let replaceSourceWithTarget = []
    let hasUpdated = false
    if (target.routeIndex !== -1 && source.routeIndex !== -1) {
      hasUpdated = true
      const { routes } = this.props.solution.toJS()
      replaceSourceWithTarget = routes.map((route, routeIndex) => {
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
      replaceTargetWithSource = replaceSourceWithTarget.map((route, routeIndex) => {
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
    }
    if (hasUpdated) {
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
    }
  };

  selectSampleSolution = async id => {
    await this.props.getSchedule(id)
    this.collectMapData(this.props.sampleSolution.toJS())
  };

  onSortDrivers = updatedDrivers => {
    this.props.sortDrivers(updatedDrivers)
  };

  onChangeDriverNote = (driver, note) => {
    this.props.updateDriverNote(driver, note)
  };

  render() {
    const { drivers, solution, mapConfig, isFetching, onSolve, sampleSolutions, nodePool } = this.props

    const defaultNodes = this.props.selectedInvoices.toJS().map(item => ({
      lat: item.Address.Lat,
      lng: item.Address.Lng,
      invoice: item,
    }))
    return (
      <div>
        <SolutionMap
          data={this.state.mapData}
          defaultNodes={defaultNodes}
          mapConfig={mapConfig}
          onShowNodeInfo={this.onShowNodeInfo}
        />

        <EditRouteCard
          onSolve={onSolve}
          drivers={drivers}
          nodePool={nodePool}
          sampleSolutions={sampleSolutions}
          isBlur
          isFetching={isFetching}
          solution={solution}
          onSelectSampleSolution={this.selectSampleSolution}
          onShowNodeInfo={this.onShowNodeInfo}
          onSortDrivers={this.onSortDrivers}
          onChangeNodePosition={this.onChangeNodePosition}
          onSwapNodes={this.onSwapNodes}
          onChangeDriverNote={this.onChangeDriverNote}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  nodePool: select(state, 'routingReducer', 'nodePool'),
  solution: select(state, 'routingReducer', 'solution'),
  drivers: select(state, 'routingReducer', 'drivers'),
  invoices: select(state, 'invoiceReducer', 'items'),
  selectedInvoices: select(state, 'routingReducer', 'invoices'),
  isFetching: select(state, 'routingReducer', 'isFetching'),
  mapConfig: select(state, 'routingReducer', 'mapConfig'),
  sampleSolutions: select(state, 'scheduleReducer', 'solutions'),
  sampleSolution: select(state, 'routingReducer', 'item'),
})

const mapDispatchToProps = dispatch => ({
  showNodeInfo: node => dispatch(showNodeInfo(node)),
  sortDrivers: updatedDrivers => dispatch(sortDrivers(updatedDrivers)),
  updateRoutes: updatedRoutes => dispatch(updateRoutes(updatedRoutes)),
  updateDriverNote: (driver, note) => dispatch(updateDriverNote(driver, note)),
  updateSolution: (change, source, meta) => dispatch(updateSolution(change, source, meta)),
  getSchedules: filterOptions => dispatch(getSchedules(filterOptions)),
  getSchedule: scheduleId => dispatch(getSchedule(scheduleId)),
  selectSampleSchedule: payload => dispatch(selectSampleSchedule(payload)),
  setNodePool: payload => dispatch(setNodePool(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SampleStep)
