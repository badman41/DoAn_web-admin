/* eslint react/prop-types: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import select from '../../util/select'
import { getNotifications } from '../Header/actions'
import ToJS from '../../hoc/toJs'
import NotificationList from './components/List'

class Notification extends Component {
  componentDidMount() {
    this.props.getNotifications({ topic: 'admin', count: 20 })
  }

  render() {
    const { notifications, markRead } = this.props
    return <NotificationList dataSource={notifications} markRead={markRead} />
  }
}

const mapStateToProps = state => ({
  notifications: select(state, ['appReducer', 'notification'], 'items'),
  isFetching: select(state, ['appReducer', 'notification'], 'isFetching'),
})

const mapDispatchToProps = dispatch => ({ getNotifications: params => dispatch(getNotifications(params)) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToJS(Notification))
