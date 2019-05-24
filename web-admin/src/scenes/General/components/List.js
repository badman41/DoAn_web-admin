import React from 'react'
import PropTypes from 'prop-types'
import { List, Popconfirm, Button, Form, Input, Card } from 'antd'
import ToJS from '../../../hoc/toJs'
import WithLoadingHOC from '../../../hoc/loading'

const { Item } = Form


class SelfList extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
        this.props.form.resetFields()
      }
    })
  }

  render() {
    const { dataSource, onDelete, isFetching, form: { getFieldDecorator }, placeholder, title } = this.props
    return (
      <Card title={<h3>{title}</h3>} hoverable>
        <List
          size="small"
          header={(
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Item span={18} required>
                {
                  getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: 'Tên là bắt buộc',
                      },
                    ],
                  })(<Input placeholder={placeholder} />)
                }
              </Item>
              <Item span={6}>
                <Button icon="plus" type="primary" htmlType="submit" disabled={isFetching}>
                  Thêm
                </Button>
              </Item>
            </Form>
          )}
          dataSource={dataSource}
          pagination={dataSource.length > 10}
          renderItem={(item, index) => (
            <List.Item
              className={index % 2 ? 'whitesmoke' : ''}
              style={{ paddingLeft: 10 }}
              actions={[
                <Popconfirm
                  key=""
                  title="Bạn chắc chắn xóa ?"
                  onConfirm={() => onDelete(item.ID)}
                  okText="OK"
                  cancelText="Cancel"
                >
                  <Button type="danger" size="small" icon="delete">
                    {'Xóa'}
                  </Button>
                </Popconfirm>,
              ]}
            >
              {item.Name ? item.Name : item.Description}
            </List.Item>
          )}
        />
      </Card>
    )
  }
}


SelfList.propTypes = {
  dataSource: PropTypes.array,
  onDelete: PropTypes.func,
  form: PropTypes.object,
  isFetching: PropTypes.bool,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
}

SelfList.defaultProps = {
  dataSource: [],
  form: {},
  onDelete: () => {},
  onSubmit: () => {},
  isFetching: false,
  placeholder: '',
}

export default { SelfList: ToJS(WithLoadingHOC(Form.create()(SelfList))) }
