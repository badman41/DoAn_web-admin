import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import TYPES from '../../constants/actionTypes'

const listRouteState = fromJS({
  items: [],
  driverId: null,
  time: null,
  isFetching: false,
  didInvalidate: true,
})

const list = (state = listRouteState, action) => {
  switch (action.type) {
  case TYPES.GETTING_ROUTES:
    return state.merge({ isFetching: true })

  case TYPES.GET_ROUTES_SUCCESS: {
    const { items, driverId, time } = action.payload
    return state.merge({
      items,
      driverId,
      time,
      isFetching: false,
      didInvalidate: false,
    })
  }

  case TYPES.GET_ROUTES_FAILURE:
    return state.merge({ isFetching: false, didInvalidate: false })
  case TYPES.INVALIDATE_ROUTE_LIST:
    return state.merge({ didInvalidate: true })

  default:
    return state
  }
}

const initialState = fromJS({
  routeTracking: [],
  item: { Routes: [] },
  isFetching: false,
  mapConfig: {
    center: {
      lat: 20.995271,
      lng: 105.780953,
    },
    zoom: 9,
  },
})

const detail = (state = initialState, action) => {
  switch (action.type) {
  case TYPES.GETTING_SCHEDULE:
  case TYPES.UPDATING_SCHEDULE:
  case TYPES.GETTING_ROUTE_TRACKING:
    return state.merge({ isFetching: true })


  case TYPES.GET_SCHEDULE_SUCCESS:
    return state.merge({
      item: action.payload.Data,
      isFetching: false,
    })
  case TYPES.GET_ROUTE_TRACKING_SUCCESS:
    return state.merge({
      routeTracking: action.payload,
      isFetching: false,
    })
  case TYPES.UPDATE_SCHEDULE_SUCCESS:
  case TYPES.UPDATE_SCHEDULE_FAILURE:
  case TYPES.GET_SCHEDULE_FAILURE:
  case TYPES.GET_ROUTE_TRACKING_FAILURE:
    return state.merge({ isFetching: false })

  default:
    return state
  }
}

export default combineReducers({ list, detail })
