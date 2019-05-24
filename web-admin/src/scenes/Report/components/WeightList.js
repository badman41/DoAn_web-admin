import React, { Component } from 'react'
import { Table, Input } from 'antd'

import ToJS from '../../../hoc/toJs'
import { changeAlias } from '../../../util/formatText'
import WithLoadingHOC from '../../../hoc/loading'

class WeightList extends Component {
  state = { dataSource: [], valueSearch: '', columns: [] };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { columns } = nextProps
    return {
      ...prevState,
      columns: columns.filter(
        item => changeAlias(item.title.toLowerCase()).indexOf(changeAlias(prevState.valueSearch.toLowerCase())) >= 0
          || item.title === 'Ngày'
          || item.title === 'Tổng',
      ),
      dataSource: nextProps.dataSource,
    }
  }

  onChangeValueSearch = ({ target: { value } }) => this.setState(() => ({ valueSearch: value }));

  render() {
    const { dataSource, valueSearch, columns } = this.state
    return (
      <Table
        style={{ marginTop: 10 }}
        title={() => <Input value={valueSearch} placeholder="Tìm kiếm" onChange={this.onChangeValueSearch} />}
        dataSource={dataSource}
        columns={columns}
        rowKey="date"
        size="small"
        scroll={{ x: 100 * (columns.length - 1) }}
      />
    )
  }
}

export default WithLoadingHOC(ToJS(WeightList))
