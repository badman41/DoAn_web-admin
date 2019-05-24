import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'
import TYPES from '../../constants/actionTypes'
import select from '../../util/select'

const gettingCustomers = () => ({ type: TYPES.GETTING_CUSTOMERS })
const getCustomersSuccess = payload => ({
  type: TYPES.GET_CUSTOMERS_SUCCESS,
  payload,
})
const getCustomersFailure = () => ({ type: TYPES.GET_CUSTOMERS_FAILURE })

const gettingCustomer = () => ({ type: TYPES.GETTING_CUSTOMER })
const getCustomerSuccess = payload => ({
  type: TYPES.GET_CUSTOMER_SUCCESS,
  payload,
})
const getCustomerFailure = () => ({ type: TYPES.GET_CUSTOMER_FAILURE })

const insertingCustomer = () => ({ type: TYPES.INSERTING_CUSTOMER })
const insertCustomerSuccess = () => ({ type: TYPES.INSERT_CUSTOMER_SUCCESS })
const insertCustomerFailure = () => ({ type: TYPES.INSERT_CUSTOMER_FAILURE })

const updatingCustomer = () => ({ type: TYPES.UPDATING_CUSTOMER })
const updateCustomerSuccess = () => ({ type: TYPES.UPDATE_CUSTOMER_SUCCESS })
const updateCustomerFailure = () => ({ type: TYPES.UPDATE_CUSTOMER_FAILURE })

const deletingCustomer = () => ({ type: TYPES.DELETING_CUSTOMER })
const deleteCustomerSuccess = () => ({ type: TYPES.DELETE_CUSTOMER_SUCCESS })
const deleteCustomerFailure = () => ({ type: TYPES.DELETE_CUSTOMER_FAILURE })

export const getCustomers = params => async dispatch => {
  const api = API.CUSTOMER.getCustomers()
  dispatch(gettingCustomers())
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    dispatch(getCustomersSuccess(response.data))
  } else {
    dispatch(getCustomersFailure())
  }
}
export const getCustomer = id => async (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, ['customerReducer', 'customer'], 'isFetching')
  const didInvalidate = select(state, ['customerReducer', 'customer'], 'didInvalidate')
  const oldCustomer = select(state, ['customerReducer', 'customer'], 'editingCustomer')
  const api = API.CUSTOMER.getCustomer(id)
  if (!isFetching && (didInvalidate || id != oldCustomer.get('ID'))) {
    dispatch(gettingCustomer())
    const { response, error } = await apiCall({ ...api })
    if (!error && response.status === 200) {
      dispatch(getCustomerSuccess(response.data.Data))
    } else {
      dispatch(getCustomerFailure())
    }
  }
}

export const insertCustomer = (payload, meta) => async dispatch => {
  const api = API.CUSTOMER.insertCustomer()
  dispatch(insertingCustomer())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(insertCustomerSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(insertCustomerFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

export const importCustomers = (payload, meta) => async dispatch => {
  const api = API.CUSTOMER.importFromExcel()
  dispatch(insertingCustomer())
  const { response, error } = await apiCall({
    ...api,
    payload,
  })
  if (!error && response.status === 200) {
    dispatch(insertCustomerSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(insertCustomerFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

export const updateCustomer = (id, payload, meta) => async dispatch => {
  const api = API.CUSTOMER.updateCustomer(id)
  dispatch(updatingCustomer())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(updateCustomerSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(updateCustomerFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}
export const deleteCustomer = (id, meta) => async dispatch => {
  const api = API.CUSTOMER.deleteCustomer(id)
  dispatch(deletingCustomer())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(deleteCustomerSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(deleteCustomerFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

export const getCustomerGroups = () => async (dispatch, getState) => {
  const api = API.CUSTOMER_GROUP.getCustomerGroups()
  const state = getState()
  const isFetching = select(state, ['customerReducer', 'group'], 'isFetching')
  const didInvalidate = select(state, ['customerReducer', 'group'], 'didInvalidate')
  if (!isFetching && didInvalidate) {
    dispatch({ type: TYPES.GETTING_CUSTOMER_GROUPS })
    const { response, error } = await apiCall(api)
    if (!error && response.status === 200) {
      dispatch({ type: TYPES.GET_CUSTOMER_GROUPS_SUCCESS, payload: response.data.Data })
    } else {
      dispatch({ type: TYPES.GET_CUSTOMER_GROUPS_FAILURE })
    }
  }
}

export const insertCustomerGroup = (payload, meta) => async dispatch => {
  const api = API.CUSTOMER_GROUP.insertCustomerGroup()
  dispatch({ type: TYPES.INSERTING_CUSTOMER_GROUP })
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.INSERT_CUSTOMER_GROUP_SUCCESS })
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch({ type: TYPES.INSERT_CUSTOMER_GROUP_FAILURE })
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const removeGroup = (id, meta) => async dispatch => {
  const api = API.CUSTOMER_GROUP.deleteCustomerGroup(id)
  dispatch({ type: TYPES.DELETING_CUSTOMER_GROUP })
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.DELETE_CUSTOMER_GROUP_SUCCESS })
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch({ type: TYPES.DELETE_CUSTOMER_GROUP_FAILURE })
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const getCustomerOfGroup = (id, params) => async dispatch => {
  const api = API.CUSTOMER_GROUP.getCustomerOfGroup(id)
  dispatch({ type: TYPES.GETTING_CUSTOMER_OF_GROUP })
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    const { Page, PageSize, Total, Data } = response.data
    dispatch({
      type: TYPES.GET_CUSTOMER_OF_GROUP_SUCCESS,
      payload: {
        items: Data,
        meta: {
          current: Page,
          pageSize: PageSize,
          total: Total,
        },
        groupId: id,
      },
    })
  } else {
    dispatch({ type: TYPES.GET_CUSTOMER_OF_GROUP_FAILURE })
  }
}

export const addCustomerToGroup = (id, payload) => async dispatch => {
  const api = API.CUSTOMER_GROUP.addCustomerToGroup(id)
  dispatch({ type: TYPES.ADDING_CUSTOMER_TO_GROUP })
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.ADD_CUSTOMER_TO_GROUP_SUCCESS })
  } else {
    dispatch({ type: TYPES.ADD_CUSTOMER_TO_GROUP_FAILURE })
  }
}

export const removeCustomerFromGroup = id => async dispatch => {
  const api = API.CUSTOMER_GROUP.removeCustomerFromGroup(id)
  dispatch({ type: TYPES.REMOVING_CUSTOMER_FROM_GROUP })
  const { response, error } = await apiCall(api)
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.REMOVE_CUSTOMER_FROM_GROUP_SUCCESS })
  } else {
    dispatch({ type: TYPES.REMOVE_CUSTOMER_FROM_GROUP_FAILURE })
  }
}

export const importPriceTable = (params, payload, meta) => async dispatch => {
  const api = API.CUSTOMER.importPriceTable()
  dispatch({ type: TYPES.IMPORTING_PRICE_TABLE })
  const { response, error } = await apiCall({ ...api, params, payload })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.IMPORT_PRICE_TABLE_SUCCESS })
    if (meta && meta.onSuccess) {
      meta.onSuccess(response.data)
    }
  } else {
    dispatch({ type: TYPES.IMPORT_PRICE_TABLE_FAILURE })
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const importPriceTableByGroup = (params, payload, meta) => async dispatch => {
  const api = API.CUSTOMER_GROUP.importPriceTable()
  dispatch({ type: TYPES.IMPORTING_PRICE_TABLE })
  const { response, error } = await apiCall({ ...api, params, payload })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.IMPORT_PRICE_TABLE_SUCCESS })
    if (meta && meta.onSuccess) {
      meta.onSuccess(response.data)
    }
  } else {
    dispatch({ type: TYPES.IMPORT_PRICE_TABLE_FAILURE })
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const getPriceTable = (code, params) => async dispatch => {
  const api = API.CUSTOMER_GROUP.getPriceTable(code)
  dispatch({ type: TYPES.GETTING_PRICE_TABLE })
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    const { Data, Page, PageSize, Total } = response.data
    dispatch({
      type: TYPES.GET_PRICE_TABLE_SUCCESS,
      payload: { data: Data, meta: { current: Page, pageSize: PageSize, total: Total } },
    })
  } else {
    dispatch({ type: TYPES.GET_PRICE_TABLE_FAILURE })
  }
}

export const getPriceTableIfNeed = (code, params) => (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, ['customerReducer', 'priceTable'], 'isFetching')
  const didInvalidate = select(state, ['customerReducer', 'priceTable'], 'didInvalidate')
  if (!isFetching && didInvalidate) {
    dispatch(getPriceTable(code, params))
  }
}

export const addItemToPriceTable = (id, payload, meta) => async dispatch => {
  const api = API.CUSTOMER_GROUP.addItemToPriceTable(id)
  dispatch({ type: TYPES.ADDING_ITEM_TO_PRICE_TABLE })
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.ADD_ITEM_TO_PRICE_TABLE_SUCCESS })
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch({ type: TYPES.ADD_ITEM_TO_PRICE_TABLE_FAILURE })
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const removeItemFromPriceTable = (id, payload, meta) => async dispatch => {
  const api = API.CUSTOMER_GROUP.removeItemFromPriceTable(id)
  dispatch({ type: TYPES.REMOVING_ITEM_FROM_PRICE_TABLE })
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.REMOVE_ITEM_FROM_PRICE_TABLE_SUCCESS })
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch({ type: TYPES.REMOVE_ITEM_FROM_PRICE_TABLE_FAILURE })
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const updateItemInPriceTable = (id, payload, meta) => async dispatch => {
  const api = API.CUSTOMER_GROUP.updateItemInPriceTable(id)
  dispatch({ type: TYPES.UPDATING_ITEM_IN_PRICE_TABLE })
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.UPDATE_ITEM_IN_PRICE_TABLE_SUCCESS })
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch({ type: TYPES.UPDATE_ITEM_IN_PRICE_TABLE_FAILURE })
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}
