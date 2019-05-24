import { fromJS } from 'immutable'
import TYPES from '../../constants/actionTypes'

const initialState = fromJS({
  isFetching: false,
  didInvalidate: true,
  isAuthenticated: false,
  error: false,
  user: {},
  role: {},
  api: {},
  forwardLocation: {},
})

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case TYPES.LOGGING_IN:
    return state.merge({
      isAuthenticated: false,
      isFetching: true,
      error: false,
    })

  case TYPES.LOG_IN_SUCCESS: {
    const {
      payload: { Token, User },
      location,
    } = action
    localStorage.setItem('aaJwt', Token)
    return state.merge({
      isAuthenticated: true,
      isFetching: false,
      user: User,
      error: false,
      forwardLocation: location,
    })
  }

  case TYPES.LOG_IN_FAILURE:
    return state.merge({
      isAuthenticated: false,
      isFetching: false,
      error: true,
    })
  case TYPES.LOG_OUT:
    localStorage.clear()
    return state.merge(initialState)
  default:
    return state
  }
}

export default authReducer
