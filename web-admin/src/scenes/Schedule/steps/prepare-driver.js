/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import DriverList from '../components/driver-list'

import { getDriversIfNeed, getDrivers } from '../../Driver/actions'
import { selectDriversForVrp } from '../actions'

import select from '../../../util/select'

class PrepareDriver extends Component {
  state = {}

  static getDerivedStateFromProps(nextProps) {
    nextProps.getDriversIfNeed()
    return null
  }

  onSelectDrivers = selectedDrivers => {
    this.props.selectDriversForVrp(this.props.drivers.filter(driver => selectedDrivers.includes(driver.get('ID'))))
  };

  render() {
    const { drivers, selectedDrivers } = this.props
    return (
      <div>
        <DriverList
          drivers={drivers}
          selectedDrivers={selectedDrivers}
          onSelectDrivers={this.onSelectDrivers}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drivers: select(state, 'driverReducer', 'items'),
  selectedDrivers: select(state, 'routingReducer', 'drivers'),
})

const mapDispatchToProps = dispatch => ({
  getDriversIfNeed: () => dispatch(getDriversIfNeed()),
  selectDriversForVrp: selectedDrivers => dispatch(selectDriversForVrp(selectedDrivers)),
  getDrivers: () => dispatch(getDrivers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrepareDriver)
