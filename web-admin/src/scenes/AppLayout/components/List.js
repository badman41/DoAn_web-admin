import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'antd'
import moment from 'moment'
import renderNotification from '../../../util/renderNotification'

import ROUTER from '../../../constants/router'

const NotiList = ({ dataSource, markRead }) => (
  <List
    dataSource={dataSource}
    renderItem={(item, index) => (
      <Link to={ROUTER.INVOICE.DETAIL.replace(':id', item.InvoiceID)} onClick={() => markRead(item.ID)}>
        <List.Item
          key={`${index + 1}`}
          style={{ backgroundColor: item.Read ? '' : '#edf2fa', borderBottom: '1px solid #dddfe2' }}
        >
          <List.Item.Meta
            style={{ margin: 5 }}
            avatar={<Avatar icon={item.Read ? 'check' : 'bell'} size={64} />}
            title={renderNotification(item)}
            description={moment(item.CreatedAt).format('HH:mm DD/MM/YYYY')}
          />
        </List.Item>
      </Link>
    )}
  />
)

NotiList.propTypes = {
  dataSource: PropTypes.array,
  markRead: PropTypes.func,
}

NotiList.defaultProps = {
  dataSource: [],
  markRead: () => {},
}

export default NotiList
