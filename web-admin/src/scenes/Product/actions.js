import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'
import TYPES from '../../constants/actionTypes'

// Product Action
const gettingProducts = () => ({ type: TYPES.GETTING_PRODUCTS })
const getProductsSuccess = payload => ({
  type: TYPES.GET_PRODUCTS_SUCCESS,
  payload,
})
const getProductsFailure = () => ({ type: TYPES.GET_PRODUCTS_FAILURE })

export const getProducts = params => async dispatch => {
  const api = API.PRODUCT.getProducts()
  dispatch(gettingProducts())
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    dispatch(getProductsSuccess(response.data))
  } else {
    dispatch(getProductsFailure())
  }
}

const gettingProduct = () => ({ type: TYPES.GETTING_PRODUCT })
const getProductSuccess = payload => ({
  type: TYPES.GET_PRODUCT_SUCCESS,
  payload,
})
const getProductFailure = () => ({ type: TYPES.GET_PRODUCT_FAILURE })

export const getProduct = id => async dispatch => {
  const api = API.PRODUCT.getProduct(id)
  dispatch(gettingProduct())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(getProductSuccess(response.data))
  } else {
    dispatch(getProductFailure())
  }
}

const insertingProduct = () => ({ type: TYPES.INSERTING_PRODUCT })
const insertProductSuccess = () => ({ type: TYPES.INSERT_PRODUCT_SUCCESS })
const insertProductFailure = () => ({ type: TYPES.INSERT_PRODUCT_FAILURE })


export const insertProduct = (payload, meta) => async dispatch => {
  const api = API.PRODUCT.insertProduct()
  dispatch(insertingProduct())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(insertProductSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(insertProductFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

export const importProducts = (payload, meta) => async dispatch => {
  const api = API.PRODUCT.importFromExcel()
  dispatch(insertingProduct())
  const { response, error } = await apiCall({
    ...api,
    payload,
  })
  if (!error && response.status === 200) {
    dispatch(insertProductSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(insertProductFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}


const updatingProduct = () => ({ type: TYPES.UPDATING_PRODUCT })
const updateProductSuccess = () => ({ type: TYPES.UPDATE_PRODUCT_SUCCESS })
const updateProductFailure = () => ({ type: TYPES.UPDATE_PRODUCT_FAILURE })

export const updateProduct = (id, payload, meta) => async dispatch => {
  const api = API.PRODUCT.updateProduct(id)
  dispatch(updatingProduct())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(updateProductSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(updateProductFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

const deletingProduct = () => ({ type: TYPES.DELETING_PRODUCT })
const deleteProductSuccess = () => ({ type: TYPES.DELETE_PRODUCT_SUCCESS })
const deleteProductFailure = () => ({ type: TYPES.DELETE_PRODUCT_FAILURE })


export const deleteProduct = id => async dispatch => {
  const api = API.PRODUCT.deleteProduct(id)
  dispatch(deletingProduct())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(deleteProductSuccess())
  } else {
    dispatch(deleteProductFailure())
  }
}

// Request

export const getRequests = params => async dispatch => {
  const api = API.REQUEST.getRequests()
  dispatch({ type: TYPES.GETTING_REQUESTS })
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.GET_REQUESTS_SUCCESS, payload: response.data.Data })
  } else {
    dispatch({ type: TYPES.GET_REQUESTS_FAILURE })
  }
}

export const replyRequest = (id, payload) => async dispatch => {
  const api = API.REQUEST.replyRequest(id)
  dispatch({ type: TYPES.REPLYING_REQUEST })
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.REPLY_REQUEST_SUCCESS })
  } else {
    dispatch({ type: TYPES.REPLY_REQUEST_FAILURE })
  }
}
