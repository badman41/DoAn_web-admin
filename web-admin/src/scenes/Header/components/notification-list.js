import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { List, Avatar } from 'antd'

import renderNotifcations from '../../../util/renderNotification'

const NotiList = ({ notifications, showDetail }) => (
  <List>
    {notifications.map((item, index) => (
      <List.Item
        key={`${index + 1}`}
        style={{
          padding: 10,
          backgroundColor: item.Read ? '' : '#edf2fa',
          borderBottom: '1px solid #dddfe2',
        }}
        onClick={() => showDetail(item)}
      >
        <List.Item.Meta
          avatar={<Avatar icon={item.Read ? 'check' : 'bell'} size={64} />}
          title={renderNotifcations(item)}
          description={moment(item.CreatedAt).fromNow()}
        />
      </List.Item>
    ))}
  </List>
)

NotiList.propTypes = {
  notifications: PropTypes.array,
  showDetail: PropTypes.func,
}

NotiList.defaultProps = {
  notifications: [],
  showDetail: () => {},
}

export default NotiList
