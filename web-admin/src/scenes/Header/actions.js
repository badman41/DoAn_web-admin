import TYPES from '../../constants/actionTypes'
import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'
import select from '../../util/select'

export const setPage = payload => ({
  type: TYPES.SET_PAGE,
  payload,
})

export const setOpenKey = payload => ({
  type: TYPES.SET_OPEN_KEY,
  payload,
})

export const logOut = () => ({ type: TYPES.LOG_OUT })

const gettingNotifications = () => ({ type: TYPES.GETTING_NOTIFICATIONS })

const getNotificationsSuccess = payload => ({
  type: TYPES.GET_NOTIFICATIONS_SUCCESS,
  payload,
})

const getNotificationsFailure = () => ({ type: TYPES.GET_NOTIFICATIONS_FAILURE })

export const getNotifications = params => async dispatch => {
  const api = API.NOTIFICATION.getNotifications()
  dispatch(gettingNotifications())
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    dispatch(getNotificationsSuccess({ items: response.data.Notifications, total: response.data.Total }))
  } else {
    dispatch(getNotificationsFailure())
  }
}

export const getNotificationsIfNeed = params => async (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, ['appReducer', 'notification'], 'isFetching')
  const didInvalidate = select(state, ['appReducer', 'notification'], 'didInvalidate')
  if (!isFetching && didInvalidate) {
    dispatch(getNotifications(params))
  }
}

export const getMoreNotifications = params => async dispatch => {
  const api = API.NOTIFICATION.getNotifications()
  dispatch({ type: TYPES.GETTING_MORE_NOTIFICATIONS })
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    dispatch({
      payload: {
        items: response.data.Notifications,
        total: response.data.Total,
      },
      type: TYPES.GET_MORE_NOTIFICATIONS_SUCCESS,
    })
  } else {
    dispatch({ type: TYPES.GET_MORE_NOTIFICATIONS_FAILURE })
  }
}

export const updateNotificationStatus = (id, payload) => async dispatch => {
  const api = API.NOTIFICATION.updateNotificationStatus(id)
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status) {
    dispatch({ type: TYPES.INVALIDATE_NOTIFICATION })
  }
}
