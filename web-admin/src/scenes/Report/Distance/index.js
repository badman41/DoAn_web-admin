import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'


import Filter from '../components/DistanceFilter'
import { getDistanceReport } from '../actions'
import { getDrivers } from '../../Driver/actions'
import Config from '../../../hoc/page'
import DistanceList from '../components/DistanceList'
import select from '../../../util/select'

class DistanceReport extends React.Component {
  componentDidMount() {
    this.props.getDrivers()
  }

  handleFilter = filterOptions => this.props.getDistanceReport(filterOptions);

  formatData = () => {
    const distanceList = this.props.distanceList.toJS()
    let dataList = []
    distanceList.forEach(item => {
      const data = {}
      data.date = item.DeliveredAt
      if (item.Drivers) {
        item.Drivers.forEach(subItem => {
          data[subItem.DriverID] = subItem.Distance
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
    const { isFetching } = this.props
    return (
      <div>
        <Filter onFilter={this.handleFilter} />
        <DistanceList dataSource={this.formatData()} columns={this.formatColumns()} isFetching={isFetching} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  distanceList: select(state, ['reportReducer', 'distance'], 'items'),
  drivers: select(state, 'driverReducer', 'items'),
  isFetching: select(state, ['reportReducer', 'distance'], 'isFetching'),
})
const mapDispatchToProps = dispatch => ({
  getDistanceReport: filterOptions => dispatch(getDistanceReport(filterOptions)),
  getDrivers: () => dispatch(getDrivers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Config('distance', 'report')(DistanceReport))
