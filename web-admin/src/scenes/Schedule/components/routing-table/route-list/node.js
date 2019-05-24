import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { compose } from 'redux'
import ItemTypes from '../constants'

const roleColor = {
  0: 'red',
  2: 'blue',
  4: 'green',
}

const dragSource = {
  beginDrag(props) {
    return {
      node: props.node,
      nodeIndex: props.nodeIndex,
      routeIndex: props.routeIndex,
    }
  },
}

const dropTarget = {
  drop(props, monitor) {
    if (
      monitor.getItem().routeIndex === props.routeIndex
            && monitor.getItem().nodeIndex === props.nodeIndex
    ) {
      return
    }
    props.onSwapNodes(monitor.getItem(), props)
  },
}

function collectDrop(connect) {
  return { connectDropTarget: connect.dropTarget() }
}

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

export class Node extends Component {
  render() {
    const {
      isDragging,
      connectDragSource,
      connectDropTarget,
      onShowNodeInfo,
      node,
    } = this.props
    const opacity = isDragging ? 0.5 : 1
    return (
      connectDragSource
            && connectDropTarget
            && connectDragSource(
              connectDropTarget(
                <div
                  style={{
                    height: 30,
                    width: 'auto',
                    opacity,
                    position: 'relative',
                    backgroundColor: roleColor[node.driverRole],
                    color: '#ffffff',
                    borderRadius: 5,
                    padding: 3,
                    cursor: 'pointer',
                    display: 'inline-block',
                  }}
                  onClick={() => onShowNodeInfo(node)}
                >
                  {`${node.invoice.CustomerCode}`}
                </div>,
              ),
            )
    )
  }
}

Node.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  onShowNodeInfo: PropTypes.func.isRequired,
  node: PropTypes.object.isRequired,
}

const dragDrop = compose(
  DropTarget(ItemTypes.NODE, dropTarget, collectDrop),
  DragSource(ItemTypes.NODE, dragSource, collectDrag),
)

export default dragDrop(Node)
