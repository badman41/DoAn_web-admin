import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Table, Form, Button, Select, Divider, Input } from 'antd'
import toJs from '../../../hoc/toJs'


class CustomerRequest extends Component {
    state = { status: null, currentId: null, edit: false, response: null };

    componentDidMount() {
      this.onFilter()
    }

    onChangeStatus = status => this.setState({ status });

    onChangeResponse = ({ target: { value } }) => this.setState({ response: value });

    onFilter = () => this.props.onFilter({ status: this.state.status });

    toggleEdit = currentId => {
      if (this.state.edit) {
        this.props.onResolve(this.state.currentId, { response: this.state.response })
        this.onFilter()
      }
      this.setState(prevState => ({ currentId, edit: !prevState.edit }))
    };

    render() {
      const { edit, currentId, response } = this.state
      const columns = [
        {
          title: 'Khách hàng',
          dataIndex: 'CustomerName',
        },
        {
          title: 'Yêu cầu',
          dataIndex: 'ProductName',
        },
        {
          title: 'Số lượng',
          dataIndex: 'Quantity',
        },
        {
          title: 'Ghi chú',
          dataIndex: 'Description',
        },
        {
          title: 'Trạng thái',
          dataIndex: 'Status',
          render: (text, record) => (edit && record.ID === currentId ? (
            <Input value={response} onChange={this.onChangeResponse} />
          ) : (
            `${text ? 'Đã xử lí' : 'Đang xử lí'} (${record.Response})`
          )),
        },
        {
          title: 'Trả lời',
          dataIndex: 'Key',
          render: (text, record) => (edit && record.ID === currentId ? (
            <Button icon="check" onClick={() => this.toggleEdit()} />
          ) : (
            <Button icon="edit" onClick={() => this.toggleEdit(record.ID)} />
          )),
        },
      ]
      const { requests } = this.props

      return (
        <React.Fragment>
          <Form layout="inline">
            <Form.Item>
              <Select style={{ width: 300 }} onChange={this.onChangeStatus}>
                <Select.Option key={-1} value={null}>
                                Tất cả
                </Select.Option>
                <Select.Option key={0} value={0}>
                                Đang xử lí
                </Select.Option>
                <Select.Option key={1} value={1}>
                                Đã xử lí
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.onFilter}>
                            Lọc yêu cầu
              </Button>
            </Form.Item>
          </Form>
          <Divider />
          <Table columns={columns} rowKey="ID" dataSource={requests} bordered />
        </React.Fragment>
      )
    }
}

CustomerRequest.propTypes = {
  requests: PropTypes.array,
  onResolve: PropTypes.func,
  onFilter: PropTypes.func,
}

CustomerRequest.defaultProps = {
  requests: [],
  onResolve: () => {},
  onFilter: () => {},
}

export default toJs(CustomerRequest)
