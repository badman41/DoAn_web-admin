import { fromJS } from 'immutable'
import TYPES from '../../constants/actionTypes'

const initialState = fromJS({
  countVehicleType: 0,
  countProductUnit: 0,
  countProductCondition: 0,
  countAccount: 0,
  account: [
    { name: 'Admin', value: 0 },
    { name: 'Driver', value: 0 },
    { name: 'Customer', value: 0 },
  ],
  invoices: [
    { name: 'completed', value: 0 },
    { name: 'pending', value: 0 },
  ],
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
  case TYPES.GET_VEHICLE_TYPES_SUCCESS:
    return state.merge({ countVehicleType: action.payload.Vehicletypes.length })
  case TYPES.GET_PRODUCT_CONDITIONS_SUCCESS:
    return state.merge({ countProductCondition: action.payload.length })
  case TYPES.GET_PRODUCT_UNITS_SUCCESS:
    return state.merge({ countProductUnit: action.payload.Data.length })
  case TYPES.GET_ACCOUNT_SUCCESS:
    return state.merge({
      countAccount: action.payload.total,
      account: [
        { name: 'Admin', value: action.payload.accounts.filter(_ => _.Role === 0).length },
        { name: 'Driver', value: action.payload.accounts.filter(_ => _.Role === 1).length },
        { name: 'Customer', value: action.payload.accounts.filter(_ => _.Role === 2).length },
      ],
    })
  case TYPES.GET_INVOICES_SUCCESS: {
    return state.merge({
      invoice: [
        { name: 'completed', value: action.payload.invoices.filter(_ => _.Status === 2).length },
        { name: 'pending', value: action.payload.invoices.filter(_ => _.Status !== 2).length },
      ],
    })
  }
  default:
    return state
  }
}
export default dashboardReducer
