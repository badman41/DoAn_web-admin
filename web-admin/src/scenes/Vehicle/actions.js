import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'
import TYPES from '../../constants/actionTypes'

const gettingVehicles = () => ({ type: TYPES.GETTING_VEHICLES })

const getVehiclesSuccess = payload => ({
  type: TYPES.GET_VEHICLES_SUCCESS,
  payload,
})

const getVehiclesFailure = payload => ({
  type: TYPES.GET_VEHICLES_FAILURE,
  payload,
})

export const getVehicles = params => async dispatch => {
  const api = API.VEHICLE.getVehicles()
  dispatch(gettingVehicles())
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    dispatch(getVehiclesSuccess(response.data))
  } else {
    dispatch(getVehiclesFailure(error))
  }
}

const gettingVehicle = () => ({ type: TYPES.GETTING_VEHICLE })

const getVehicleSuccess = payload => ({
  type: TYPES.GET_VEHICLE_SUCCESS,
  payload,
})

const getVehicleFailure = () => ({ type: TYPES.GET_VEHICLE_FAILURE })

export const getVehicle = id => async dispatch => {
  const api = API.VEHICLE.getVehicle(id)
  dispatch(gettingVehicle())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(getVehicleSuccess(response.data.Vehicles[0]))
  } else {
    dispatch(getVehicleFailure(error))
  }
}

const insertingVehicle = () => ({ type: TYPES.INSERTING_VEHICLE })

const insertVehicleSuccess = () => ({ type: TYPES.INSERT_VEHICLE_SUCCESS })

const insertVehicleFailure = () => ({ type: TYPES.INSERT_VEHICLE_SUCCESS })

export const insertVehicle = (payload, meta) => async dispatch => {
  const api = API.VEHICLE.insertVehicle()
  dispatch(insertingVehicle())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && (response.status === 200 || response.status === 201)) {
    dispatch(insertVehicleSuccess(response.data))
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else if (meta && meta.onError) {
    meta.onError()
  }
}

export const importVehicles = (payload, meta) => async dispatch => {
  const api = API.VEHICLE.importFromExcel()
  dispatch(insertingVehicle())
  const { response, error } = await apiCall({
    ...api,
    payload,
  })
  if (!error && response.status === 200) {
    dispatch(insertVehicleSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(insertVehicleFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

const updatingVehicle = () => ({ type: TYPES.UPDATING_VEHICLE })

const updateVehicleSuccess = () => ({ type: TYPES.UPDATE_VEHICLE_SUCCESS })

const updateVehicleFailure = () => ({ type: TYPES.UPDATE_VEHICLE_FAILURE })

export const updateVehicle = (id, payload, meta) => async dispatch => {
  const api = API.VEHICLE.updateVehicle(id)
  dispatch(updatingVehicle())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(updateVehicleSuccess(response.data))
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(updateVehicleFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

export const deleteVehicle = id => async () => {
  const api = API.VEHICLE.deleteVehicle(id)
  return await apiCall({ ...api })
}
