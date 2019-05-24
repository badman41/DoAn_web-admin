import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { notification } from 'antd'

import SaveRouteForm from '../components/save-route-form'

import { insertSolution } from '../actions'
import select from '../../../util/select'
import ROUTER from '../../../constants/router'

class SaveDataStep extends Component {
  saveSolution = formValue => {
    const { solution, drivers, invoices } = this.props
    const { name, note, routeType } = formValue
    this.props.insertSolution(
      {
        solution: solution.toJS(),
        drivers: drivers.toJS(),
        invoices: invoices.toJS(),
        name,
        note,
        routeType,
      },
      {
        onSuccess: () => {
          notification.success({ message: 'Thêm lịch thành công' })
          this.props.history.push(ROUTER.SCHEDULE.INDEX)
        },

        onError: () => notification.error({ message: 'Thêm lịch thất bại' }),
      },
    )
  };

  render() {
    const { drivers, invoices, solution, time } = this.props
    return (
      <div>
        <SaveRouteForm
          time={time}
          drivers={drivers}
          invoices={invoices}
          solution={solution}
          onSubmit={this.saveSolution}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  solution: select(state, 'routingReducer', 'solution'),
  drivers: select(state, 'routingReducer', 'drivers'),
  invoices: select(state, 'routingReducer', 'invoices'),
  time: select(state, 'routingReducer', 'time'),
})

const mapDispatchToProps = dispatch => ({ insertSolution: (payload, meta) => dispatch(insertSolution(payload, meta)) })

SaveDataStep.propTypes = {
  solution: ImmutablePropTypes.map,
  drivers: ImmutablePropTypes.list,
  invoices: ImmutablePropTypes.list,
  insertSolution: PropTypes.func.isRequired,
  time: PropTypes.string,
  history: PropTypes.object,
}

SaveDataStep.defaultProps = {
  solution: new Map(),
  drivers: new List(),
  invoices: new List(),
  time: '',
  history: {},
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SaveDataStep))
