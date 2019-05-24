import React, { Component } from 'react'
import { connect } from 'react-redux'

import Filter from '../components/WorkingDayFilter'
import WorkingDayList from '../components/WorkingDayList'
import { getWorkingDaysReport } from '../actions'
import select from '../../../util/select'

class workingDays extends Component {
  handleFilter = values => {
    this.props.getWorkingDaysReport(values)
  };

  render() {
    const { workingDays, isFetching } = this.props
    return (
      <React.Fragment>
        <Filter onFilter={this.handleFilter} />
        <WorkingDayList dataSource={workingDays} isFetching={isFetching} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  workingDays: select(state, ['reportReducer', 'workingDays'], 'items'),
  isFetching: select(state, ['reportReducer', 'workingDays'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({ getWorkingDaysReport: params => dispatch(getWorkingDaysReport(params)) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(workingDays)
