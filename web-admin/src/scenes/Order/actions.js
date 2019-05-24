import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'
import TYPES from '../../constants/actionTypes'

export const getCustomerProducts = id => async dispatch => {
  const api = API.PRODUCT.getProductByCustomerId(id)
  dispatch({ type: TYPES.GETTING_PRODUCTS_FOR_ORDER })
  const { response, error } = await apiCall(api)
  if (!error && response.status === 200) {
    dispatch({
      type: TYPES.GET_PRODUCTS_FOR_ORDER_SUCCESS,
      payload: response.data.Data,
    })
  } else {
    dispatch({ type: TYPES.GET_PRODUCTS_FOR_ORDER_FAILURE })
  }
}

export const addItem = payload => ({
  type: TYPES.ADD_ITEM,
  payload,
})

export const setOrder = payload => ({
  type: TYPES.SET_ORDER,
  payload,
})

export const insertInvoice = (payload, meta) => async dispatch => {
  const api = API.INVOICE.insertInvoice()
  dispatch({ type: TYPES.INSERTING_INVOICE })
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.INSERT_INVOICE_SUCCESS })
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch({ type: TYPES.INSERT_INVOICE_FAILURE })
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

const insertInvoiceSuccess = { type: TYPES.INSERT_INVOICE_SUCCESS }

const insertInvoiceFailure = { type: TYPES.INSERT_INVOICE_FAILURE }

export const importInvoices = ({ date, payload, params }, meta) => async dispatch => {
  const api = API.INVOICE.importFromExcel(date)
  const { response, error } = await apiCall({
    ...api,
    payload,
    params,
  })
  if (!error && response.status === 200) {
    dispatch(insertInvoiceSuccess)
    if (meta && meta.onSuccess) {
      meta.onSuccess(response.data)
    }
  } else {
    dispatch(insertInvoiceFailure)
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const getInvoiceById = id => async dispatch => {
  const api = API.INVOICE.getInvoices()
  dispatch({ type: TYPES.GETTING_INVOICE_BY_ID })
  if (id) {
    const { response, error } = await apiCall({ ...api, params: { id } })
    if (!error && response.status === 200) {
      dispatch({
        type: TYPES.GET_INVOICE_BY_ID_SUCCESS,
        payload: response.data.Data.length ? response.data.Data[0] : {},
      })
    } else {
      dispatch({ type: TYPES.GET_INVOICE_BY_ID_FAILURE })
    }
  } else {
    dispatch({ type: TYPES.GET_INVOICE_BY_ID_FAILURE })
  }
}

export const updateInvoice = (id, payload, meta) => async () => {
  const api = API.INVOICE.updateInvoice(id)
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else if (meta && meta.onError) {
    meta.onError(error)
  }
}
