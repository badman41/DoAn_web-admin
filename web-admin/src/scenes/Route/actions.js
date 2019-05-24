import { API } from '../../constants/api'
import { apiCall } from '../../util/apiCall'
import TYPES from '../../constants/actionTypes'
import select from '../../util/select'

const getRoutesSuccess = payload => ({
  type: TYPES.GET_ROUTES_SUCCESS,
  payload,
})

const getRoutesFailure = { type: TYPES.GET_ROUTES_FAILURE }

const gettingRoutes = { type: TYPES.GETTING_ROUTES }

export const getRoutes = ({ driverID, DeliveredAt }) => async dispatch => {
  const api = API.ROUTE.getRoutes(driverID)
  dispatch(gettingRoutes)
  const { response, error } = await apiCall({
    ...api,
    params: { DeliveredAt },
  })
  if (!error && response.status === 200) {
    dispatch(getRoutesSuccess({ items: response.data.Data, driverId: driverID, time: DeliveredAt }))
  } else {
    dispatch(getRoutesFailure)
  }
}

export const getRoutesIfNeed = currentDriverId => (dispatch, getState) => {
  const state = getState()
  const currentTime = select(state, ['routeReducer', 'list'], 'time')
  const isFetching = select(state, ['routeReducer', 'list'], 'isFetching')
  const didInvalidate = select(state, ['routeReducer', 'list'], 'didInvalidate')
  if (!isFetching && didInvalidate) {
    dispatch(getRoutes({ driverID: currentDriverId, DeliveredAt: currentTime }))
  }
}

const gettingRouteTracking = { type: TYPES.GETTING_ROUTE_TRACKING }

const getRouteTrackingSuccess = payload => ({
  type: TYPES.GET_ROUTE_TRACKING_SUCCESS,
  payload,
})
const getRouteTrackingFailure = { type: TYPES.GET_ROUTE_TRACKING_FAILURE }

export const getRouteTracking = params => async dispatch => {
  const api = API.ROUTE.getRouteTracking()
  dispatch(gettingRouteTracking)
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    dispatch(getRouteTrackingSuccess(response.data.RouteTrackings ? response.data.RouteTrackings : []))
  } else {
    dispatch(getRouteTrackingFailure())
  }
}

export const changeDriverOnRoute = (routeId, driverId) => async (dispatch, getState) => {
  const api = API.ROUTE.changeDriver(routeId, driverId)
  const { response, error } = await apiCall(api)
  if (!error && response.status === 200) {
    const currentSchedule = select(getState(), ['scheduleReducer', 'detail'], 'item')
    if (currentSchedule.get('ID')) dispatch({ type: TYPES.INVALIDATE_CURRENT_SCHEDULE })
    dispatch({ type: TYPES.INVALIDATE_ROUTE_LIST })
  }
}
