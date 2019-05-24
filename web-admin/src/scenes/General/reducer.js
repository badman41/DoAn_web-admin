import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import TYPES from '../../constants/actionTypes'

const vtState = fromJS({
  items: [],
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const vehicleType = (state = vtState, action) => {
  switch (action.type) {
  case TYPES.GETTING_VEHICLE_TYPES:
  case TYPES.INSERTING_VEHICLE_TYPE:
    return state.set('isFetching', true)
  case TYPES.GET_VEHICLE_TYPES_SUCCESS:
    return state.merge({
      items: action.payload.Vehicletypes,
      isFetching: false,
      didInvalidate: false,
    })

  case TYPES.GET_VEHICLE_TYPES_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.INSERT_VEHICLE_TYPE_SUCCESS:
  case TYPES.DELETE_VEHICLE_TYPE_SUCCESS:
    return state.merge({
      didInvalidate: true,
      isFetching: false,
    })
  default:
    return state
  }
}

const puState = fromJS({
  items: [],
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const productUnit = (state = puState, action) => {
  switch (action.type) {
  case TYPES.GETTING_PRODUCT_UNITS:
  case TYPES.INSERTING_PRODUCT_UNIT:
    return state.set('isFetching', true)
  case TYPES.GET_PRODUCT_UNITS_SUCCESS:
    return state.merge({
      items: action.payload.Data,
      isFetching: false,
      didInvalidate: false,
    })

  case TYPES.INSERT_PRODUCT_UNIT_SUCCESS:
  case TYPES.UPDATE_PRODUCT_UNIT_SUCCESS:
  case TYPES.DELETE_PRODUCT_UNIT_SUCCESS:
    return state.merge({
      didInvalidate: true,
      isFetching: false,
    })
  case TYPES.GET_PRODUCT_UNITS_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
    })

  default:
    return state
  }
}

const pcState = fromJS({
  items: [],
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const productCondition = (state = pcState, action) => {
  switch (action.type) {
  case TYPES.GETTING_PRODUCT_CONDITIONS:
  case TYPES.INSERTING_PRODUCT_CONDITION:
    return state.set('isFetching', true)

  case TYPES.GET_PRODUCT_CONDITIONS_SUCCESS:
    return state.merge({
      items: action.payload,
      isFetching: false,
      didInvalidate: false,
    })

  case TYPES.GET_PRODUCT_CONDITIONS_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
    })

  case TYPES.INSERT_PRODUCT_CONDITION_SUCCESS:
  case TYPES.DELETE_PRODUCT_CONDITION_SUCCESS:
    return state.merge({
      didInvalidate: true,
      isFetching: false,
    })

  default:
    return state
  }
}

const accountState = fromJS({
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

const account = (state = accountState, action) => {
  switch (action.type) {
  case TYPES.GETTING_ACCOUNT:
    return state.set('isFetching', true)

  case TYPES.GET_ACCOUNT_SUCCESS: {
    const { accounts, current, pageSize, total } = action.payload
    return state.merge({
      items: accounts,
      meta: {
        current,
        pageSize,
        total,
      },
      isFetching: false,
      didInvalidate: false,
    })
  }

  case TYPES.GET_ACCOUNT_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
    })

  default:
    return state
  }
}
export default combineReducers({ account, vehicleType, productCondition, productUnit })
