import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import TYPES from '../../constants/actionTypes'

const listState = fromJS({
  items: [],
  meta: {
    current: 1,
    total: 0,
    pageSize: 0,
  },
  isFetching: false,
  didInvalidate: false,
})

const list = (state = listState, action) => {
  switch (action.type) {
  case TYPES.GETTING_SCHEDULES:
    return state.merge({ isFetching: true })

  case TYPES.GET_SCHEDULES_SUCCESS:
    return state.merge({
      items: action.payload.Data,
      meta: {
        current: action.payload.Page,
        pageSize: action.payload.PageSize,
        total: action.payload.Total,
      },
      isFetching: false,
    })
  case TYPES.GET_SCHEDULES_FAILURE:
    return state.merge({ isFetching: false })

  default:
    return state
  }
}

const detailState = fromJS({
  item: {},
  mapConfig: {
    zoom: 13,
    center: {
      lat: 20.995271,
      lng: 105.780953,
    },
  },
  isFetching: false,
  didInvalidate: false,
})

const detail = (state = detailState, action) => {
  switch (action.type) {
  case TYPES.GETTING_SCHEDULE:
    return state.merge({ isFetching: true })

  case TYPES.GET_SCHEDULE_SUCCESS:
    return state.merge({
      item: action.payload.Data,
      isFetching: false,
    })
  case TYPES.GET_SCHEDULE_FAILURE:
    return state.merge({ isFetching: false })

  default:
    return state
  }
}


export default combineReducers({ list, detail })
