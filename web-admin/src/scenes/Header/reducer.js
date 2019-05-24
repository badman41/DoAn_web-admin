import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import TYPES from '../../constants/actionTypes'

const initialState = fromJS({
  currentPage: [''],
  openKey: [''],
})

const app = (state = initialState, action) => {
  switch (action.type) {
  case TYPES.SET_PAGE:
    return state.merge({ currentPage: [action.payload] })

  case TYPES.SET_OPEN_KEY:
    return state.merge({ openKey: [action.payload] })
  default:
    return state
  }
}

const notificationState = fromJS({
  items: [],
  total: 0,
  isFetching: false,
  didInvalidate: true,
  lastUpdated: 0,
})

const notification = (state = notificationState, action) => {
  switch (action.type) {
  case TYPES.GETTING_NOTIFICATIONS:
    return state.merge({ isFetching: true })
  case TYPES.GET_NOTIFICATIONS_SUCCESS:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
      items: action.payload.items,
      total: action.payload.total,
    })
  case TYPES.GET_NOTIFICATIONS_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.INVALIDATE_NOTIFICATION:
    return state.merge({ didInvalidate: true })
  default:
    return state
  }
}

const notificationListMoreState = fromJS({
  items: [],
  total: 0,
  isFetching: false,
  didInvalidate: true,
  lastUpdated: 0,
})

const notificationListMore = (state = notificationListMoreState, action) => {
  switch (action.type) {
  case TYPES.GETTING_MORE_NOTIFICATIONS:
    return state.merge({ isFetching: true })
  case TYPES.GET_MORE_NOTIFICATIONS_SUCCESS:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
      items: action.payload.items,
      total: action.payload.total,
    })
  case TYPES.GET_MORE_NOTIFICATIONS_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
    })
  default:
    return state
  }
}

export default combineReducers({ app, notification, notificationListMore })
