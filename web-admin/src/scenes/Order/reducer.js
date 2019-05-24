import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import TYPES from '../../constants/actionTypes'

const productState = fromJS({
  items: [],
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const product = (state = productState, action) => {
  switch (action.type) {
  case TYPES.GETTING_PRODUCTS_FOR_ORDER:
    return state.set('isFetching', true)
  case TYPES.GET_PRODUCTS_FOR_ORDER_FAILURE:
    return state.merge({ isFetching: false })
  case TYPES.GET_PRODUCTS_FOR_ORDER_SUCCESS:
    return state.merge({
      isFetching: false,
      items: action.payload,
    })
  default:
    return state
  }
}

const orderState = fromJS({
  item: { Items: [] },
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const order = (state = orderState, action) => {
  switch (action.type) {
  case TYPES.ADD_ITEM:
  case TYPES.SET_ORDER:
    return state.merge({ item: action.payload })
  case TYPES.GET_INVOICE_BY_ID_SUCCESS:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
      item: action.payload,
    })

  default:
    return state
  }
}


export default combineReducers({ order, product })
