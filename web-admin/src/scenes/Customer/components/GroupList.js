import React from 'react'
import PropTypes from 'prop-types'

import { List, Button, Card } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import toJs from '../../../hoc/toJs'
import router from '../../../constants/router'
import WithLoadingHOC from '../../../hoc/loading'

const GroupList = ({ dataSource, removeGroup, onOpenModal }) => (
  <Card
    style={{ marginTop: 10 }}
    title="Nhóm khách hàng"
    extra={(
      <Button icon="plus" type="primary" onClick={onOpenModal}>
        {'Nhập báo giá'}
      </Button>
    )}
  >
    <List
      dataSource={dataSource}
      renderItem={(item, index) => (
        <List.Item
          key={`${index + 1}`}
          className={index % 2 ? 'whitesmoke' : ''}
          style={{ padding: 10 }}
          actions={[
            <Button
              key="del"
              icon="delete"
              shape="circle"
              type="danger"
              onClick={() => removeGroup(item.ID)}
            />,
          ]}
        >
          <List.Item.Meta
            title={<Link to={router.CUSTOMER_GROUP.DETAIL.replace(':id', item.ID)}>{item.Name}</Link>}
            description={moment(item.CreatedAt).format('DD/MM/YYYY')}
          />
        </List.Item>
      )}
    />
  </Card>
)

GroupList.propTypes = {
  dataSource: PropTypes.array,
  removeGroup: PropTypes.func,
}

GroupList.defaultProps = {
  dataSource: [],
  removeGroup: () => {},
}

export default toJs(WithLoadingHOC(GroupList))
