import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import { compose } from 'redux'

import ItemTypes from '../constants'
import DriverItem from './item'

const dragSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const dropTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null
    }
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) {
      return
    }
    props.moveItem(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
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

class DragableDriverItem extends Component {
  render() {
    const {
      driver,
      index,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props
    const opacity = isDragging ? 0.5 : 1

    return (
      connectDragSource
            && connectDropTarget
            && connectDragSource(
              connectDropTarget(
                <div style={{ opacity }}>
                  <DriverItem
                    driver={driver}
                    index={index}
                    onChangeNote={this.props.onChangeDriverNote}
                  />
                </div>,
              ),
            )
    )
  }
}

DragableDriverItem.propTypes = {
  driver: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  onChangeDriverNote: PropTypes.func.isRequired,
}

const dragDrop = compose(
  DropTarget(ItemTypes.DRIVER, dropTarget, collectDrop),
  DragSource(ItemTypes.DRIVER, dragSource, collectDrag),
)

export default dragDrop(DragableDriverItem)
