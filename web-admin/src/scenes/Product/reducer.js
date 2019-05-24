import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import TYPES from '../../constants/actionTypes'

const listState = fromJS({
  items: [],
  meta: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const list = (state = listState, action) => {
  switch (action.type) {
  case TYPES.GETTING_PRODUCTS:
    return state.set('isFetching', true)
  case TYPES.GET_PRODUCTS_SUCCESS:
    return state.merge({
      items: action.payload.Data,
      meta: {
        total: action.payload.Metadata.Total,
        current: action.payload.Metadata.Page,
        pageSize: action.payload.Metadata.PageSize,
      },
      isFetching: false,
      didInvalidate: false,
    })

  case TYPES.GET_PRODUCTS_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: true,
    })

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
  case TYPES.GETTING_PRODUCT:
  case TYPES.INSERTING_PRODUCT:
  case TYPES.UPDATING_PRODUCT:
  case TYPES.DELETING_PRODUCT:
    return state.set('isFetching', true)
  case TYPES.GET_PRODUCT_SUCCESS:
    return state.merge({
      item: action.payload.Data,
      isFetching: false,
      didInvalidate: false,
    })

  case TYPES.INSERT_PRODUCT_SUCCESS:
  case TYPES.UPDATE_PRODUCT_SUCCESS:
  case TYPES.DELETE_PRODUCT_SUCCESS:
  case TYPES.GET_PRODUCT_FAILURE:
  case TYPES.INSERT_PRODUCT_FAILURE:
  case TYPES.UPDATE_PRODUCT_FAILURE:
  case TYPES.DELETE_PRODUCT_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: true,
    })

  default:
    return state
  }
}

const requestState = fromJS({
  items: [],
  meta: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const request = (state = requestState, action) => {
  switch (action.type) {
  case TYPES.GETTING_REQUESTS:
    return state.set('isFetching', true)
  case TYPES.GET_REQUESTS_SUCCESS:
    return state.merge({
      items: action.payload,

      isFetching: false,
      didInvalidate: false,
    })

  case TYPES.GET_REQUESTS_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: true,
    })

  default:
    return state
  }
}
export default combineReducers({ list, detail, request })
