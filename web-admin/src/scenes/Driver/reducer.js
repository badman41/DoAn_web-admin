import { fromJS } from 'immutable'
import TYPES from '../../constants/actionTypes'

const initialState = fromJS({
  items: [],
  meta: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  editingDriver: { DriverInfo: { VehicleTypes: [] } },
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const driverReducer = (state = initialState, action) => {
  switch (action.type) {
  case TYPES.GETTING_DRIVERS:
  case TYPES.GETTING_DRIVER:
  case TYPES.INSERTING_DRIVER:
  case TYPES.UPDATING_DRIVER:
  case TYPES.DELETING_DRIVER:
    return state.set('isFetching', true)
  case TYPES.GET_DRIVERS_SUCCESS:
    return state.merge({
      items: action.payload.Data,
      meta: {
        current: action.payload.Metadata.Page,
        total: action.payload.Metadata.Total,
        pageSize: action.payload.Metadata.PageSize,
      },
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.GET_DRIVER_SUCCESS:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
      editingDriver: action.payload,
    })
  case TYPES.INSERT_DRIVER_SUCCESS:
  case TYPES.UPDATE_DRIVER_SUCCESS:
  case TYPES.DELETE_DRIVER_SUCCESS:
  case TYPES.GET_DRIVER_FAILURE:
  case TYPES.GET_DRIVERS_FAILURE:
  case TYPES.INSERT_DRIVER_FAILURE:
  case TYPES.UPDATE_DRIVER_FAILURE:
  case TYPES.DELETE_DRIVER_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
    })

  default:
    return state
  }
}
export default driverReducer
