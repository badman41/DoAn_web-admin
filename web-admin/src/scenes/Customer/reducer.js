import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import TYPES from '../../constants/actionTypes'

const initialState = fromJS({
  items: [],
  meta: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  editingCustomer: {
    Address: {
      Lat: 20.995271,
      Lng: 105.780953,
    },
  },
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const customer = (state = initialState, action) => {
  switch (action.type) {
  case TYPES.GETTING_CUSTOMERS:
  case TYPES.GETTING_CUSTOMER:
  case TYPES.INSERTING_CUSTOMER:
  case TYPES.UPDATING_CUSTOMER:
  case TYPES.DELETING_CUSTOMER:
    return state.set('isFetching', true)
  case TYPES.GET_CUSTOMERS_SUCCESS:
    return state.merge({
      items: action.payload.Data,
      meta: {
        current: action.payload.Page,
        pageSize: action.payload.PageSize,
        total: action.payload.Total,
      },
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.GET_CUSTOMER_SUCCESS:
    return state.merge({
      editingCustomer: action.payload,
      isFetching: false,
      didInvalidate: false,
    })

  case TYPES.INSERT_CUSTOMER_SUCCESS:
  case TYPES.UPDATE_CUSTOMER_SUCCESS:
  case TYPES.DELETE_CUSTOMER_SUCCESS:
  case TYPES.GET_CUSTOMERS_FAILURE:
  case TYPES.GET_CUSTOMER_FAILURE:
  case TYPES.DELETE_CUSTOMER_FAILURE:
  case TYPES.INSERT_CUSTOMER_FAILURE:
  case TYPES.UPDATE_CUSTOMER_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: true,
    })

  default:
    return state
  }
}

const groupState = fromJS({
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

const group = (state = groupState, action) => {
  switch (action.type) {
  case TYPES.GETTING_CUSTOMER_GROUPS:
  case TYPES.INSERTING_CUSTOMER_GROUP:
  case TYPES.DELETING_CUSTOMER_GROUP:
    return state.merge({ isFetching: true })
  case TYPES.GET_CUSTOMER_GROUPS_SUCCESS:
    return state.merge({
      items: action.payload,
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.INSERT_CUSTOMER_GROUP_FAILURE:
  case TYPES.DELETE_CUSTOMER_GROUP_FAILURE:
  case TYPES.GET_CUSTOMER_GROUPS_FAILURE:
    return state.merge({ isFetching: false, didInvalidate: false })
  case TYPES.INSERT_CUSTOMER_GROUP_SUCCESS:
  case TYPES.DELETE_CUSTOMER_GROUP_SUCCESS:
    return state.merge({ isFetching: false, didInvalidate: true })
  default:
    return state
  }
}

const customerOfGroupState = fromJS({
  groupId: null,
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

const listByGroup = (state = customerOfGroupState, action) => {
  switch (action.type) {
  case TYPES.GETTING_CUSTOMER_OF_GROUP:
  case TYPES.ADDING_CUSTOMER_TO_GROUP:
  case TYPES.REMOVING_CUSTOMER_FROM_GROUP:
    return state.merge({ isFetching: true })
  case TYPES.GET_CUSTOMER_OF_GROUP_SUCCESS:
    return state.merge({
      items: action.payload.items,
      meta: action.payload.meta,
      groupId: action.payload.groupId,
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.GET_CUSTOMER_OF_GROUP_FAILURE:
  case TYPES.ADD_CUSTOMER_TO_GROUP_SUCCESS:
  case TYPES.ADD_CUSTOMER_TO_GROUP_FAILURE:
  case TYPES.REMOVE_CUSTOMER_FROM_GROUP_SUCCESS:
  case TYPES.REMOVE_CUSTOMER_FROM_GROUP_FAILURE:
    return state.merge({ isFetching: false, didInvalidate: false })
  default:
    return state
  }
}

const allState = fromJS({
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

const listAll = (state = allState, action) => {
  switch (action.type) {
  case TYPES.GETTING_CUSTOMERS:
    return state.set('isFetching', true)
  case TYPES.GET_CUSTOMERS_SUCCESS:
    return state.merge({
      items: action.payload.Data,
      meta: {
        current: action.payload.Page,
        pageSize: action.payload.PageSize,
        total: action.payload.Total,
      },
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.GET_CUSTOMERS_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: true,
    })

  default:
    return state
  }
}

const priceTableState = fromJS({
  items: [],
  meta: {
    current: 1,
    pageSize: 1,
    total: 0,
  },
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const priceTable = (state = priceTableState, action) => {
  switch (action.type) {
  case TYPES.GETTING_PRICE_TABLE:
  case TYPES.IMPORTING_PRICE_TABLE:
    return state.set('isFetching', true)
  case TYPES.GET_PRICE_TABLE_SUCCESS:
    return state.merge({
      items: action.payload.data,
      meta: action.payload.meta,
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.GET_PRICE_TABLE_FAILURE:
  case TYPES.IMPORT_PRICE_TABLE_FAILURE:
    return state.merge({ isFetching: false })
  case TYPES.IMPORT_PRICE_TABLE_SUCCESS:
  case TYPES.GET_CUSTOMER_SUCCESS:
    return state.merge({
      isFetching: false,
      didInvalidate: true,
    })
  case TYPES.ADD_ITEM_TO_PRICE_TABLE_SUCCESS:
  case TYPES.REMOVE_ITEM_FROM_PRICE_TABLE_SUCCESS:
  case TYPES.UPDATE_ITEM_IN_PRICE_TABLE_SUCCESS:
    return state.merge({ didInvalidate: true })

  default:
    return state
  }
}

export default combineReducers({
  customer,
  group,
  listByGroup,
  listAll,
  priceTable,
})
