import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import DragableItem from './dragableItem'

class DriverList extends Component {
    moveItem = (dragIndex, hoverIndex) => {
      const { drivers } = this.props
      const dragDriver = drivers[dragIndex]
      const updatedDrivers = update(drivers, { $splice: [[dragIndex, 1], [hoverIndex, 0, dragDriver]] })
      this.props.onSortDrivers(updatedDrivers)
    };

    render() {
      const { drivers } = this.props
      return (
        <div>
          {drivers.map((driver, index) => (
            <div
              key={driver.ID}
              ref={node => {
                this.node = node
              }}
            >
              <DragableItem
                driver={driver}
                node={this.node}
                index={index}
                moveItem={this.moveItem}
                onChangeDriverNote={this.props.onChangeDriverNote}
              />
            </div>
          ))}
        </div>
      )
    }
}

DriverList.propTypes = {
  drivers: PropTypes.array.isRequired,
  onSortDrivers: PropTypes.func.isRequired,
  onChangeDriverNote: PropTypes.func.isRequired,
}

export default DriverList
