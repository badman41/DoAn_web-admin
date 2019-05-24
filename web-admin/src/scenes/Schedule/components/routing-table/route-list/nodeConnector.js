import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../constants'

const color = '#5076b0'
const isOverColor = '#ff0000'

const dropTarget = {
  drop(props, monitor) {
    const targetNodeIndex = props.nodeIndex
    const targetRouteIndex = props.routeIndex

    const dragNode = monitor.getItem()
    const sourceNodeIndex = dragNode.nodeIndex
    const sourceRouteIndex = dragNode.routeIndex

    if (
      targetRouteIndex === sourceRouteIndex
            && (targetNodeIndex === sourceNodeIndex
                || targetNodeIndex === sourceNodeIndex - 1)
    ) return
    props.onChangeNodePosition(
      dragNode.node,
      { routeIndex: sourceRouteIndex, nodeIndex: sourceNodeIndex },
      { routeIndex: targetRouteIndex, nodeIndex: targetNodeIndex },
    )
  },
}

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

class NodeConnector extends Component {
  render() {
    const { connectDropTarget, isOver } = this.props
    return connectDropTarget(
      <div
        style={{
          height: 30,
          width: 30,
          display: 'inline-block',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderBottom: `5px solid ${
              isOver ? isOverColor : color
            }`,
          }}
        />
      </div>,
    )
  }
}

NodeConnector.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
}

export default DropTarget(ItemTypes.NODE, dropTarget, collectDrop)(
  NodeConnector,
)
