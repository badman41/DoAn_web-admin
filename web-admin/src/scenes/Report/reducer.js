import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import TYPES from '../../constants/actionTypes'

const distanceState = fromJS({
  items: [],
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const distance = (state = distanceState, action) => {
  switch (action.type) {
  case TYPES.GETTING_DISTANCE_REPORT:
    return state.merge({ isFetching: true })

  case TYPES.GET_DISTANCE_REPORT_SUCCESS:
    return state.merge({
      items: action.payload.Data,
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.GET_DISTANCE_REPORT_FAILURE:
    return state.merge({ isFetching: false, didInvalidate: false })

  default:
    return state
  }
}

const weightState = fromJS({
  items: [],
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const weight = (state = weightState, action) => {
  switch (action.type) {
  case TYPES.GETTING_WEIGHT_REPORT:
    return state.merge({ isFetching: true })

  case TYPES.GET_WEIGHT_REPORT_SUCCESS:
    return state.merge({ items: action.payload.Data, isFetching: false, didInvalidate: false })
  case TYPES.GET_WEIGHT_REPORT_FAILURE:
    return state.merge({ isFetching: false, didInvalidate: false })

  default:
    return state
  }
}

const dayState = fromJS({
  items: [],
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const workingDays = (state = dayState, action) => {
  switch (action.type) {
  case TYPES.GETTING_WORKING_DAY_REPORT:
    return state.merge({ isFetching: true })

  case TYPES.GET_WORKING_DAY_REPORT_SUCCESS:
    return state.merge({ items: action.payload.Data, isFetching: false, didInvalidate: false })
  case TYPES.GET_WORKING_DAY_REPORT_FAILURE:
    return state.merge({ isFetching: false, didInvalidate: false })

  default:
    return state
  }
}
export default combineReducers({ workingDays, distance, weight })
