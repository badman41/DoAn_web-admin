import { apiCall } from '../../util/apiCall'
import { API } from '../../constants/api'
import TYPES from '../../constants/actionTypes'

const gettingInvoices = () => ({ type: TYPES.GETTING_INVOICES })

const getInvoicesSuccess = payload => ({
  type: TYPES.GET_INVOICES_SUCCESS,
  payload,
})

const getInvoicesFailure = () => ({ type: TYPES.GET_INVOICES_FAILURE })

export const setOrder = payload => ({
  type: TYPES.SET_ORDER,
  payload,
});

export const getInvoices = params => async dispatch => {
  const api = API.INVOICE.getInvoices()
  dispatch(gettingInvoices())
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    const invoices = response.data.Data.map((invoice, index) => ({
      ...invoice,
      numberOfOrder: index + 1,
    }))
    const { Page, PageSize, Total } = response.data
    dispatch(
      getInvoicesSuccess({
        invoices,
        meta: {
          current: Page || 1,
          pageSize: PageSize || 10,
          total: Total,
        },
      }),
    )
  } else {
    dispatch(getInvoicesFailure())
  }
}

export const insertingInvoice = () => ({ type: TYPES.INSERTING_INVOICE })

export const insertInvoiceSuccess = () => ({ type: TYPES.INSERT_INVOICE_SUCCESS })

export const insertInvoiceFailure = () => ({ type: TYPES.INSERT_INVOICE_FAILURE })

export const importInvoices = ({ date, payload, params }, meta) => async dispatch => {
  const api = API.INVOICE.importFromExcel(date)
  const { response, error } = await apiCall({
    ...api,
    payload,
    params,
  })
  if (!error && response.status === 200) {
    dispatch(insertInvoiceSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess(response.data)
    }
  } else {
    dispatch(insertInvoiceFailure())
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}

export const deleteInvoice = id => async () => {
  const api = API.INVOICE.deleteInvoice(id)
  await apiCall({ ...api })
}

const gettingInvoice = () => ({ type: TYPES.GETTING_INVOICE })

const getInvoiceSuccess = payload => ({
  type: TYPES.GET_INVOICE_SUCCESS,
  payload,
})

const getInvoiceFailure = () => ({ type: TYPES.GET_INVOICE_FAILURE })

export const getInvoiceById = id => async dispatch => {
  const api = API.INVOICE.getInvoices()
  dispatch(gettingInvoice())
  const { response, error } = await apiCall({ ...api, params: { id } })
  if (!error && response.status === 200) {
    dispatch(getInvoiceSuccess(response.data.Data.length ? response.data.Data[0] : {}))
  } else {
    dispatch(getInvoiceFailure())
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
export const cancleInvoice = (id, payload, meta) => async () => {
  const api = API.INVOICE.cancleInvoice(id);
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess(id);
    }
  } else if (meta && meta.onError) {
    meta.onError(error);
  }
};

export const checkOrdered = params => async dispatch => {
  const api = API.INVOICE.checkOrdered()
  dispatch({ type: TYPES.CHECKING_ORDERED })
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.CHECK_ORDER_SUCCESS, payload: response.data, time: params.date })
  } else {
    dispatch({ type: TYPES.CHECK_ORDER_FAILURE })
  }
}

export const reportInvoices = (params, meta) => async () => {
  const api = API.INVOICE.reportInvoices(params)
  const { response, error } = await apiCall(api)
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess(response.data)
    }
  } else if (meta && meta.onError) {
    meta.onError(error)
  }
}
