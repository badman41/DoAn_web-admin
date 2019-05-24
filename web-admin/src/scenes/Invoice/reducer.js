import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import TYPES from '../../constants/actionTypes'

const listState = fromJS({
  items: [],
  time: 0,
  meta: {
    total: 0,
    current: 0,
    pageSize: 0,
  },
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const list = (state = listState, action) => {
  switch (action.type) {
  case TYPES.GETTING_INVOICES:
  case TYPES.INSERTING_INVOICE:
    return state.set('isFetching', true)
  case TYPES.GET_INVOICES_SUCCESS:
    return state.merge({
      items: action.payload.invoices,
      meta: action.payload.meta,
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.GET_INVOICES_FAILURE:
  case TYPES.INSERT_INVOICE_SUCCESS:
  case TYPES.INSERT_INVOICE_FAILURE:
    return state.set('isFetching', false)
  default:
    return state
  }
}

const detailState = fromJS({
  item: {},
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const detail = (state = detailState, action) => {
  switch (action.type) {
  case TYPES.GETTING_INVOICE:
    return state.set('isFetching', true)
  case TYPES.GET_INVOICE_SUCCESS:
    return state.merge({
      item: action.payload,
      isFetching: false,
    })
  case TYPES.GET_INVOICE_FAILURE:
    return state.set('isFetching', false)
  default:
    return state
  }
}

const listRouteState = fromJS({
  items: [],
  time: 0,
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const listForRouting = (state = listRouteState, action) => {
  switch (action.type) {
  case TYPES.GETTING_INVOICES:
    return state.set('isFetching', true)
  case TYPES.GET_INVOICES_SUCCESS:
    return state.merge({
      items: action.payload.invoices,
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.GET_INVOICES_FAILURE:
    return state.set('isFetching', false)
  default:
    return state
  }
}

const checkState = fromJS({
  items: [],
  time: 0,
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const checkResult = (state = checkState, action) => {
  switch (action.type) {
  case TYPES.CHECKING_ORDERED:
    return state.set('isFetching', true)
  case TYPES.CHECK_ORDER_SUCCESS:
    return state.merge({
      items: action.payload,
      time: action.time,
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.CHECK_ORDER_FAILURE:
    return state.set('isFetching', false)
  default:
    return state
  }
}

export default combineReducers({ detail, list, listForRouting, checkResult })
