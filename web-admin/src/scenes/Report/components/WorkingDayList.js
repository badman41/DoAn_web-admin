import React, { Component } from 'react'
import { Table, Input } from 'antd'

import ToJS from '../../../hoc/toJs'
import { changeAlias } from '../../../util/formatText'
import WithLoadingHOC from '../../../hoc/loading'

const columns = [
  {
    title: 'Lái xe',
    dataIndex: 'DriverName',
  },
  {
    title: 'Ngày làm việc',
    dataIndex: 'Days',
  },
]

class WorkingDayList extends Component {
  state = { dataSource: [], valueSearch: '' };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      dataSource: nextProps.dataSource.filter(
        item => changeAlias(item.DriverName.toLowerCase()).indexOf(changeAlias(prevState.valueSearch.toLowerCase())) >= 0,
      ),
    }
  }

  onChangeValueSearch = ({ target: { value } }) => this.setState(() => ({ valueSearch: value }));

  render() {
    const { dataSource, valueSearch } = this.state
    return (
      <Table
        style={{ marginTop: 10 }}
        title={() => <Input value={valueSearch} placeholder="Tìm kiếm" onChange={this.onChangeValueSearch} />}
        dataSource={dataSource}
        columns={columns}
        rowKey="DriverID"
        size="small"
      />
    )
  }
}

export default WithLoadingHOC(ToJS(WorkingDayList))
