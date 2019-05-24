import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'
import select from '../../util/select'
import TYPES from '../../constants/actionTypes'

const gettingDrivers = () => ({ type: TYPES.GETTING_DRIVERS })

const getDriversSuccess = payload => ({
  type: TYPES.GET_DRIVERS_SUCCESS,
  payload,
})

const getDriversFailure = payload => ({
  type: TYPES.GET_DRIVERS_FAILURE,
  payload,
})

export const getDrivers = params => async dispatch => {
  dispatch(gettingDrivers())
  const api = API.DRIVER.getDrivers()
  const { response, error } = await apiCall({
    ...api,
    params,
  })
  if (!error && response.status === 200) {
    dispatch(getDriversSuccess(response.data))
  } else {
    dispatch(getDriversFailure(error))
  }
}

export const getDriversIfNeed = params => (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, 'driverReducer', 'isFetching')
  const didInvalidate = select(state, 'driverReducer', 'didInvalidate')
  if (!isFetching && didInvalidate) {
    dispatch(getDrivers(params))
  }
}

// ===============

const gettingDriver = () => ({ type: TYPES.GETTING_DRIVER })

const getDriverSuccess = payload => ({
  type: TYPES.GET_DRIVER_SUCCESS,
  payload,
})

const getDriverFailure = payload => ({
  type: TYPES.GET_DRIVER_FAILURE,
  payload,
})

export const getDriver = id => async dispatch => {
  const api = API.DRIVER.getDriver(id)
  dispatch(gettingDriver())
  const { response, error } = await apiCall(api)
  if (!error && response.status === 200) {
    dispatch(getDriverSuccess(response.data.Data))
  } else {
    dispatch(getDriverFailure(error))
  }
}

export const getDriverIfNeed = id => (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, 'driverReducer', 'isFetching')
  const didInvalidate = select(state, 'driverReducer', 'didInvalidate')
  if (!isFetching && didInvalidate) {
    dispatch(getDriver(id))
  }
}

const updatingDriver = () => ({ type: TYPES.UPDATING_DRIVER })

const updateDriverSuccess = () => ({ type: TYPES.UPDATE_DRIVER_SUCCESS })

const updateDriverFailure = () => ({ type: TYPES.UPDATE_DRIVER_FAILURE })

export const updateDriver = (id, payload, meta) => async dispatch => {
  const api = API.DRIVER.updateDriver(id)
  const apiPhone = API.DRIVER.updateDriverPhone(id)
  dispatch(updatingDriver())
  Promise.all([
    apiCall({ ...api, payload }),
    apiCall({
      ...apiPhone,
      payload: { NewPhone: payload.Driver.PhoneNumber },
    }),
  ]).then(
    () => {
      dispatch(updateDriverSuccess())
      if (meta && meta.onSuccess) {
        meta.onSuccess()
      }
    },
    error => {
      dispatch(updateDriverFailure())
      if (meta && meta.onError) {
        meta.onError(error)
      }
    },
  )
}

const insertingDriver = () => ({ type: TYPES.INSERTING_DRIVER })

const insertDriverSuccess = () => ({ type: TYPES.INSERT_DRIVER_SUCCESS })

const insertDriverFailure = () => ({ type: TYPES.INSERT_DRIVER_FAILURE })

export const insertDriver = (payload, meta) => async dispatch => {
  const api = API.DRIVER.insertDriver()
  dispatch(insertingDriver())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(insertDriverSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(insertDriverFailure())
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const importDrivers = (payload, meta) => async dispatch => {
  const api = API.DRIVER.importFromExcel()
  dispatch(insertingDriver())
  const { response, error } = await apiCall({
    ...api,
    payload,
  })
  if (!error && response.status === 200) {
    dispatch(insertDriverSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(insertDriverFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

const deletingDriver = () => ({ type: TYPES.DELETING_DRIVER })

const deleteDriverSuccess = () => ({ type: TYPES.DELETE_DRIVER_SUCCESS })

const deleteDriverFailure = () => ({ type: TYPES.DELETE_DRIVER_FAILURE })

export const deleteDriver = (driverId, meta) => async dispatch => {
  const api = API.DRIVER.deleteDriver(driverId)
  dispatch(deletingDriver())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(deleteDriverSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(deleteDriverFailure())
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const resetDriverPassword = (payload, meta) => async () => {
  const api = API.AUTH.resetPassword()
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else if (meta && meta.onError) {
    meta.onError(error)
  }
}
