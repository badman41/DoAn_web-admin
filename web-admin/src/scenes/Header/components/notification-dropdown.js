import React from 'react'
import PropTypes from 'prop-types'
import { Popover, Tabs } from 'antd'
import { Link } from 'react-router-dom'

import NotiList from './notification-list'
import BadgeIcon from '../../../components/BadgeIcon'
import toJs from '../../../hoc/toJs'

const notiType = {
  invoice: 'Đơn hàng',
  request: 'Yêu cầu',
  route: 'Tuyến đường',
}

const NotificationDropdown = ({ notifications, showAll, showDetail, onChangeNotiType }) => (
  <Popover
    trigger="click"
    title="Thông báo"
    placement="bottomRight"
    content={(
      <React.Fragment>
        <Tabs onChange={onChangeNotiType} style={{ width: 400, maxHeight: '70vh', overflow: 'scroll' }}>
          {Object.keys(notiType).map(item => (
            <Tabs.TabPane key={item} tab={notiType[item]}>
              <NotiList notifications={notifications} showDetail={showDetail} />
            </Tabs.TabPane>
          ))}
        </Tabs>
        <Link
          to="img"
          onClick={e => {
            e.preventDefault()
            showAll()
          }}
        >
          <div key="all" style={{ textAlign: 'center', padding: 10 }}>
            Xem toàn bộ thông báo
          </div>
        </Link>
      </React.Fragment>
    )}
  >
    <span
      style={{
        width: '40px',
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      <BadgeIcon count={0} icon="bell" name="Thông báo" />
    </span>
  </Popover>
)

NotificationDropdown.propTypes = {
  notifications: PropTypes.array,
  showAll: PropTypes.func,
  showDetail: PropTypes.func,
  onChangeNotiType: PropTypes.func,
}

NotificationDropdown.defaultProps = {
  notifications: [],
  showAll: () => {},
  showDetail: () => {},
  onChangeNotiType: () => {},
}

export default toJs(NotificationDropdown)
