import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Node from './node'
import Depot from './depot'
import NodeConnector from './nodeConnector'

class Route extends Component {
  render() {
    const {
      route,
      onChangeNodePosition,
      onSwapNodes,
      onShowNodeInfo,
      routeIndex,
    } = this.props
    return (
      <Fragment>
        <Depot />
        <NodeConnector
          nodeIndex={-1}
          routeIndex={routeIndex}
          onChangeNodePosition={onChangeNodePosition}
        />
        {route.nodes.map((node, nodeIndex) => (
          <Fragment key={nodeIndex}>
            <Node
              onSwapNodes={onSwapNodes}
              nodeIndex={nodeIndex}
              onShowNodeInfo={onShowNodeInfo}
              node={node}
              routeIndex={routeIndex}
            />
            <NodeConnector
              nodeIndex={nodeIndex}
              routeIndex={routeIndex}
              onChangeNodePosition={onChangeNodePosition}
            />
          </Fragment>
        ))}
        <Depot />
      </Fragment>
    )
  }
}

Route.propTypes = {
  route: PropTypes.object.isRequired,
  routeIndex: PropTypes.number.isRequired,
  onChangeNodePosition: PropTypes.func.isRequired,
  onSwapNodes: PropTypes.func.isRequired,
  onShowNodeInfo: PropTypes.func.isRequired,
}

export default Route
