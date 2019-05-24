import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DatePicker, Divider, Table, Form, Button, Input, Modal } from 'antd'
import moment from 'moment'
import ToJS from '../../../hoc/toJs'
import { changeAlias } from '../../../util/formatText'

const columns = (valueSearch, onChangeSearch) => [
  {
    title: <Input placeholder="Tìm kiếm khách hàng" value={valueSearch} onChange={onChangeSearch} />,
    dataIndex: 'CustomerName',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'Status',
    filters: [
      {
        text: 'Đã đặt hàng',
        value: 'true',
      },
      {
        text: 'Chưa đặt hàng',
        value: 'false',
      },
    ],
    onFilter: (value, record) => String(record.Status).indexOf(value) === 0,
    render: (text, record) => (text ? `Đã đặt ${record.InvoiceIDs.length} đơn hàng` : 'Chưa đặt hàng'),
  },
]

class CustomerResult extends Component {
  state = {
    valueSearch: '',
    dataSource: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      dataSource: nextProps.dataSource.filter(
        item => changeAlias(item.CustomerName.toLowerCase()).indexOf(changeAlias(prevState.valueSearch.toLowerCase())) >= 0,
      ),
    }
  }

  componentDidMount() {
    this.props.onCheck({ date: moment().toISOString() })
  }

  onChangeSearch = ({ target: { value } }) => this.setState(() => ({ valueSearch: value }));

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onCheck({ date: values.date.toISOString() })
      }
    })
  }

  render() {
    const { dataSource, valueSearch } = this.state
    const { visible, onCancel, isFetching, form: { getFieldDecorator } } = this.props
    return (
      <Modal
        width={1000}
        visible={visible}
        title="Kiểm tra đặt hàng"
        closable={false}
        centered
        footer={[
          <Button key="back" onClick={onCancel}>
              Đóng
          </Button>,
        ]}
      >
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Form.Item label="Ngày cần kiểm tra">
              {
                getFieldDecorator('date', {
                  initialValue: moment(),
                  rules: [
                    {
                      required: true,
                      message: 'Chọn ngày cần kiểm tra',
                    },
                  ],
                })(
                  <DatePicker format="DD/MM/YYYY" />,
                )
              }
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button icon="search" htmlType="submit" type="primary">
              Kiểm tra
            </Button>
          </Form.Item>
        </Form>

        <Divider />
        <Table
          size="small"
          loading={isFetching}
          columns={columns(valueSearch, this.onChangeSearch)}
          dataSource={dataSource}
          rowKey="CustomerID"
          bordered
        />
      </Modal>
    )
  }
}

CustomerResult.propTypes = {
  form: PropTypes.object,
  onCheck: PropTypes.func,
  visible: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}

CustomerResult.defaultProps = {
  onCheck: () => {},
  form: {},
}

export default ToJS(Form.create()(CustomerResult))
