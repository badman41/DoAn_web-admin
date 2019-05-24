import React from 'react'
import { DropTarget } from 'react-dnd'
import { Card } from 'antd'
import Node from '../route-list/node'
import ToJS from '../../../../../hoc/toJs'
import ItemTypes from '../constants'

const color = '#5076b0'
const isOverColor = 'red'

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

class NodePool extends React.Component {
  render() {
    const {
      nodePool,
      onSwapNodes,
      onShowNodeInfo,
      connectDropTarget,
      isOver,
    } = this.props
    return connectDropTarget(
      <div style={{}}>
        <Card
          style={{
            margin: '20px 0px',
            backgroundColor: isOver ? isOverColor : color,
          }}
        >
          {nodePool.map((node, index) => (
            <span style={{ margin: '10px' }} key={`${index + 1}`}>
              <Node
                onSwapNodes={onSwapNodes}
                nodeIndex={node.invoice.numberOfOrder}
                onShowNodeInfo={onShowNodeInfo}
                node={node}
                routeIndex={-1}
              />
            </span>
          ))}
        </Card>
      </div>,
    )
  }
}

export default DropTarget(ItemTypes.NODE, dropTarget, collectDrop)(
  ToJS(NodePool),
)
