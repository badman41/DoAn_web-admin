import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Icon } from 'antd'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DriverList from '../routing-table/driver-list'
import RouteList from '../routing-table/route-list'
import SampleSolutionForm from '../select-sample-form'
import NodePool from '../routing-table/node-pool'
import WithLoading from '../../../../hoc/loading'
import ToJs from '../../../../hoc/toJs'

class EditRouteCard extends Component {
  handleSubmit = values => this.props.onSelectSampleSolution(values.SolutionID);

  render() {
    const {
      drivers,
      solution,
      onShowNodeInfo,
      onSortDrivers,
      onChangeNodePosition,
      onSwapNodes,
      onSolve,
      sampleSolutions,
      nodePool,
      isFetching,
    } = this.props
    console.log(solution)
    return (
      <Card
        title={
          sampleSolutions ? (
            <SampleSolutionForm disabled={isFetching} sampleSolutions={sampleSolutions} onSubmit={this.handleSubmit} />
          ) : (
            'Bảng điều khiển'
          )
        }
        extra={
          sampleSolutions ? null : (
            <Button
              style={{ marginRight: 10 }}
              type="primary"
              ghost="ghost"
              onClick={onSolve}
            >
              <Icon type="check" />
              Tìm đường
            </Button>
          )
        }
        style={{ width: '100%' }}
      >
        {nodePool ? (
          <NodePool
            routeIndex={-1}
            nodePool={nodePool}
            onSwapNodes={onSwapNodes}
            onShowNodeInfo={onShowNodeInfo}
            onChangeNodePosition={onChangeNodePosition}
          />
        ) : null}
        <div style={{ width: '20%', float: 'left' }}>
          <DriverList
            drivers={drivers}
            onSortDrivers={onSortDrivers}
            onChangeDriverNote={this.props.onChangeDriverNote}
          />
        </div>
        <div style={{ width: '80%', float: 'left' }}>
          <RouteList
            onChangeNodePosition={onChangeNodePosition}
            onSwapNodes={onSwapNodes}
            routes={solution.routes}
            onShowNodeInfo={onShowNodeInfo}
          />
        </div>
      </Card>
    )
  }
}

EditRouteCard.propTypes = {
  solution: PropTypes.object,
  drivers: PropTypes.array,
  onShowNodeInfo: PropTypes.func.isRequired,
  onSortDrivers: PropTypes.func.isRequired,
  onChangeNodePosition: PropTypes.func.isRequired,
  onSwapNodes: PropTypes.func.isRequired,
  onChangeDriverNote: PropTypes.func.isRequired,
}

EditRouteCard.defaultProps = {
  solution: {},
  drivers: [],
}

export default WithLoading(ToJs(DragDropContext(HTML5Backend)(EditRouteCard)))
