import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'
import TYPES from '../../constants/actionTypes'
import select from '../../util/select'

export const login = payload => async dispatch => {
  const api = API.AUTH.login()
  dispatch({ type: TYPES.LOGGING_IN })
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    const { User } = response.data.Data
    if (User && User.Role === 0) {
      dispatch({
        type: TYPES.LOG_IN_SUCCESS,
        payload: response.data.Data,
      })
    } else {
      dispatch({ type: TYPES.LOG_IN_FAILURE })
    }
  } else {
    dispatch({ type: TYPES.LOG_IN_FAILURE })
  }
}

export const loginWithToken = location => async dispatch => {
  const api = API.AUTH.loginWithToken()
  dispatch({ type: TYPES.LOGGING_IN })
  const { response, error } = await apiCall(api)
  if (!error && response.status === 200) {
    const { User } = response.data.Data
    if (User && User.Role === 0) {
      dispatch({
        type: TYPES.LOG_IN_SUCCESS,
        payload: response.data.Data,
        location,
      })
    } else {
      dispatch({ type: TYPES.LOG_IN_FAILURE })
    }
  } else {
    dispatch({ type: TYPES.LOG_IN_FAILURE })
  }
}

export const loginWithTokenIfNeed = () => (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, 'authReducer', 'isFetching')
  const isAuthenticated = select(state, 'authReducer', 'isAuthenticated')
  const aaJwt = localStorage.getItem('aaJwt')
  if (!isFetching && !isAuthenticated && aaJwt) {
    dispatch(loginWithToken())
  }
}

export const changePassword = (payload, meta) => async () => {
  const api = API.AUTH.changePassword()
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else if (meta && meta.onError) {
    meta.onError()
  }
}

export const updateProfile = (payload, meta) => async () => {
  const api = API.AUTH.updateProfile()
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else if (meta && meta.onError) {
    meta.onError()
  }
}
