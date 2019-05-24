/* eslint react/prop-types: 0 */
import React from 'react'
import { connect } from 'react-redux'
import { Avatar, Divider, Modal, Layout, notification, Button } from 'antd'
import { withRouter } from 'react-router'

import UserDropdown from './components/user-dropdown'
import NotificationDropdown from './components/notification-dropdown'
import toJs from '../../hoc/toJs'

import select from '../../util/select'
import { logOut, setOpenKey, getNotifications, getNotificationsIfNeed, updateNotificationStatus } from './actions'
import { MAP_ROUTER } from '../../constants/notification'
import ROUTER from '../../constants/router'
import renderNotification from '../../util/renderNotification'

const { Header } = Layout

class GlobalHeader extends React.Component {
  state = {}

  componentDidMount() {
    this.props.getNotifications({
      count: 10,
      topic: 'admin',
      noti_group: [2, 3],
    })
    const evtSrc = new EventSource('/event?topics=admin')
    evtSrc.onmessage = e => {
      if (e.data !== 'ping' && e.data !== 'hello') {
        const notificationData = JSON.parse(e.data)
        notification.open({
          message: renderNotification(notificationData),
          btn: (
            <Button type="primary" onClick={() => this.showDetail(notificationData)}>
              {' Xem chi tiết'}
            </Button>
          ),
          placement: 'bottomLeft',
        })
      }
      this.props.getNotifications({
        count: 10,
        topic: 'admin',
        noti_group: [2, 3],
      })
    }
  }

  static getDerivedStateFromProps(props) {
    props.getNotificationsIfNeed({
      count: 10,
      topic: 'admin',
      noti_group: [2, 3],
    })
    return null
  }

  showAll = () => {
    this.props.history.push(ROUTER.NOTIFICATION)
  }

  showDetail = noti => {
    this.props.history.push(MAP_ROUTER[noti.TypeCode](noti.InvoiceID))
    this.markRead(noti.ID)
  }

  markRead = id => {
    this.props.updateNotificationStatus(id, { Read: true })
  }

  onChangeProfile = () => {
    this.props.history.push(ROUTER.ACCOUNT.PASSWORD)
  }

  onChangeNotiType = key => {
    switch (key) {
      case 'invoice': {
        this.props.getNotifications({
          count: 10,
          topic: 'admin',
          noti_group: [2, 3],
        })
        break
      }
      case 'route': {
        this.props.getNotifications({
          count: 10,
          topic: 'admin',
          noti_group: [1],
        })
        break
      }
      case 'request': {
        this.props.getNotifications({
          count: 10,
          topic: 'admin',
          noti_group: [4, 5],
        })
        break
      }
      default:
        this.props.getNotifications({
          count: 10,
          topic: 'admin',
          noti_group: [2, 3],
        })
    }
  }

  logOut = () => {
    Modal.confirm({
      title: 'Bạn chắc chắn đăng xuất ?',
      okText: 'Có',
      cancelText: 'Không',
      onOk: () => {
        this.props.logOut()
      },
      onCancel() {
      },
    })
  }

  render() {
    const { user, notifications } = this.props
    return (
      <Header style={{
        background: '#fff',
        padding: 0,
        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
      }}>
        <div
          style={{ float: 'right' }}
        >
          <NotificationDropdown
            notifications={notifications}
            showAll={this.showAll}
            showDetail={this.showDetail}
            onChangeNotiType={this.onChangeNotiType}
          />
          <Divider type="vertical"/>

          <span style={{ marginRight: 10 }}>
              {'Xin chào'}
            ,
              <b>{user.DisplayName}</b>
!
            </span>
          <UserDropdown onClick={this.onChangeProfile} logOut={this.logOut}>
            <Avatar
              src={
                user.Avatar
                  ? user.Avatar
                  : 'https://static.giaodichnongsan.vn/images/5a210e97b9d04c3dd16542bd_1f02694e-d97f-4625-a03d-0de4cbe3ad5d.png'
              }
            />
          </UserDropdown>
          <Divider type="vertical"/>
        </div>
      </Header>
    )
  }
}

const mapStateToProps = state => ({
  currentPage: select(state, ['appReducer', 'app'], 'currentPage'),
  openKey: select(state, ['appReducer', 'app'], 'openKey'),
  notifications: select(state, ['appReducer', 'notification'], 'items'),
  user: select(state, 'authReducer', 'user'),
})
const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
  setOpenKey: openKey => dispatch(setOpenKey(openKey)),
  getNotifications: params => dispatch(getNotifications(params)),
  getNotificationsIfNeed: params => dispatch(getNotificationsIfNeed(params)),
  updateNotificationStatus: (id, payload) => dispatch(updateNotificationStatus(id, payload)),
})

export default withRouter(toJs(connect(mapStateToProps, mapDispatchToProps)(GlobalHeader)))
