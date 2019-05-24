/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import WeightList from './components/WeightList'
import Filter from './components/WeightFilter'
import { getWeighReport, getWeighsReport } from './actions'
import { getDrivers } from '../Driver/actions'
import select from '../../util/select'
import Config from '../../hoc/page'

class WeightReport extends React.Component {
  componentDidMount() {
    this.props.getDrivers()
  }

  handleFilter = filterOptions => {
    this.props.getWeighsReport(filterOptions)
  };

  formatData = () => {
    const weightList = this.props.weightList.toJS()
    let dataList = []
    weightList.forEach(item => {
      const data = {}
      data.date = item.DeliveredAt
      if (item.Drivers) {
        item.Drivers.forEach(subItem => {
          data[subItem.DriverID] = subItem.Weight
        })
        dataList = dataList.concat(data)
      }
    })
    return dataList
  };

  formatColumns = () => {
    const drivers = this.props.drivers.toJS()
    const columns = drivers.map(item => ({
      title: item.DriverInfo.Name,
      dataIndex: item.ID,
      width: 100,
      render: value => Math.round(value * 10) / 10,
    }))
    const newColumns = [
      {
        title: 'Ngày',
        dataIndex: 'date',
        width: 70,
        render: value => moment(value).format('DD/MM'),
      },
    ]
      .concat(columns)
      .concat({
        title: 'Tổng',
        key: 'operation',
        fixed: 'right',
        render: (value, record) => Math.round(
          Object.keys(record)
            .filter(item => item !== 'date')
            .map(item => record[item])
            .reduce((a, b) => a + b, 0) * 10,
        ) / 10,
      })

    return newColumns
  };

  render() {
    const { drivers, isFetching } = this.props
    return (
      <div>
        <Filter drivers={drivers} onFilter={this.handleFilter} />
        <WeightList dataSource={this.formatData()} columns={this.formatColumns()} isFetching={isFetching} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  weightList: select(state, ['reportReducer', 'weight'], 'items'),
  drivers: select(state, 'driverReducer', 'items'),
  isFetching: select(state, ['reportReducer', 'weight'], 'isFetching'),
})
const mapDispatchToProps = dispatch => ({
  getWeighReport: filterOptions => dispatch(getWeighReport(filterOptions)),
  getWeighsReport: filterOptions => dispatch(getWeighsReport(filterOptions)),
  getDrivers: () => dispatch(getDrivers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Config('weight', 'report')(WeightReport))
