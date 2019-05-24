import * as Sync from './sync'
import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'
import TYPES from '../../constants/actionTypes'
import select from '../../util/select'

export const getProductUnits = params => async (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, ['generalReducer', 'productUnit'], 'isFetching')
  const didInvalidate = select(state, ['generalReducer', 'productUnit'], 'didInvalidate')
  const api = API.PRODUCT_UNIT.getProductUnits()
  if (!isFetching && didInvalidate) {
    dispatch(Sync.gettingProductUnits())
    const { response, error } = await apiCall({ ...api, params })
    if (!error && response.status === 200) {
      dispatch(Sync.getProductUnitsSuccess(response.data))
    } else {
      dispatch(Sync.getProductUnitsFailure())
    }
  }
}

export const getProductUnit = id => async dispatch => {
  const api = API.PRODUCT_UNIT.getProductUnit(id)
  dispatch(Sync.gettingProductUnit())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(Sync.getProductUnitSuccess(response.data))
  } else {
    dispatch(Sync.getProductUnitFailure())
  }
}

export const insertProductUnit = (payload, meta) => async dispatch => {
  const api = API.PRODUCT_UNIT.insertProductUnit()
  dispatch(Sync.insertingProductUnit())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(Sync.insertProductUnitSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(Sync.insertProductUnitFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

export const updateProductUnit = (id, payload, meta) => async dispatch => {
  const api = API.PRODUCT_UNIT.updateProductUnit(id)
  dispatch(Sync.updatingProductUnit())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(Sync.updateProductUnitSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(Sync.updateProductUnitFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

export const deleteProductUnit = (id, meta) => async dispatch => {
  const api = API.PRODUCT_UNIT.deleteProductUnit(id)
  dispatch(Sync.deletingProductUnit())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(Sync.deleteProductUnitSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(Sync.deleteProductUnitFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

export const getVehicleTypes = () => async (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, ['generalReducer', 'vehicleType'], 'isFetching')
  const didInvalidate = select(state, ['generalReducer', 'vehicleType'], 'didInvalidate')
  const api = API.VEHICLE_TYPE.getVehicleTypes()
  if (!isFetching && didInvalidate) {
    dispatch(Sync.gettingVehicleTypes())
    const { response, error } = await apiCall({ ...api })
    if (!error && response.status === 200) {
      dispatch(Sync.getVehicleTypesSuccess(response.data))
    } else {
      dispatch(Sync.getVehicleTypesFailure())
    }
  }
}

export const insertVehicleType = (payload, meta) => async dispatch => {
  const api = API.VEHICLE_TYPE.insertVehicleType()
  dispatch(Sync.insertingVehicleType())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(Sync.insertVehicleTypeSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(Sync.insertVehicleTypeFailure())
    if (meta && meta.onSuccess) {
      meta.onError()
    }
  }
}

export const deleteVehicleType = (id, meta) => async dispatch => {
  const api = API.VEHICLE_TYPE.deleteVehicleType(id)
  dispatch(Sync.deletingVehicleType())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(Sync.deleteVehicleTypeSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(Sync.deleteVehicleTypeFailure())
    if (meta && meta.onSuccess) {
      meta.onError()
    }
  }
}

export const getProductConditions = () => async (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, ['generalReducer', 'productCondition'], 'isFetching')
  const didInvalidate = select(state, ['generalReducer', 'productCondition'], 'didInvalidate')
  const api = API.PRODUCT_CONDITION.getProductConditions()
  if (!isFetching && didInvalidate) {
    dispatch(Sync.gettingProductConditions())
    const { response, error } = await apiCall(api)
    if (!error && response.status === 200) {
      dispatch(Sync.getProductConditionsSuccess(response.data.Data))
    } else {
      dispatch(Sync.getProductConditionsFailure())
    }
  }
}

export const getProductConditionsIfNeed = () => async (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, ['generalReducer', 'productCondition'], 'isFetching')
  const didInvalidate = select(state, ['generalReducer', 'productCondition'], 'didInvalidate')
  if (!isFetching && didInvalidate) {
    dispatch(getProductConditions())
  }
}

export const insertProductCondition = (payload, meta) => async dispatch => {
  const api = API.PRODUCT_CONDITION.insertProductConditions()
  dispatch(Sync.insertingProductCondition())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(Sync.insertProductConditionSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(Sync.insertProductConditionFailure())
    if (meta && meta.onSuccess) {
      meta.onError()
    }
  }
}

export const deleteProductCondition = (id, meta) => async dispatch => {
  const api = API.PRODUCT_CONDITION.deleteProductCondition(id)
  dispatch(Sync.deletingProductCondition())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(Sync.deleteProductConditionSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(Sync.deleteProductConditionFailure())
    if (meta && meta.onSuccess) {
      meta.onError()
    }
  }
}

const gettingAccounts = () => ({ type: TYPES.GETTING_ACCOUNT })

const getAccountsSuccess = payload => ({
  type: TYPES.GET_ACCOUNT_SUCCESS,
  payload,
})

const getAccountsFailure = () => ({ type: TYPES.GET_ACCOUNT_FAILURE })

export const getAccounts = params => async dispatch => {
  const api = API.ACCOUNT.getAccounts()
  dispatch(gettingAccounts())
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    const {
      Data,
      Metadata: { Page, PageSize, Total },
    } = response.data
    dispatch(getAccountsSuccess({ accounts: Data, current: Page, pageSize: PageSize, total: Total }))
  } else {
    dispatch(getAccountsFailure())
  }
}

const insertingAdmin = () => ({ type: TYPES.INSERTING_ADMIN })

const insertAdminSuccess = () => ({ type: TYPES.INSERT_ADMIN_SUCCESS })

const insertAdminFailure = () => ({ type: TYPES.INSERT_ADMIN_FAILURE })

export const registerAdmin = (payload, meta) => async dispatch => {
  const api = API.ACCOUNT.registerAdmin()
  dispatch(insertingAdmin())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 202) {
    dispatch(insertAdminSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(insertAdminFailure())
    if (meta && meta.onSuccess) {
      meta.onError()
    }
  }
}
