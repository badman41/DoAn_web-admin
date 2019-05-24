import { fromJS } from 'immutable'
import TYPES from '../../constants/actionTypes'

const initialState = fromJS({
  items: [],
  meta: {
    total: 0,
    current: 1,
    pageSize: 10,
  },
  editingVehicle: { MaxVolume: [] },
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
})

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
  case TYPES.GETTING_VEHICLES:
  case TYPES.GETTING_VEHICLE:
  case TYPES.INSERTING_VEHICLE:
  case TYPES.UPDATING_VEHICLE:
  case TYPES.DELETING_VEHICLE:
    return state.set('isFetching', true)
  case TYPES.GET_VEHICLES_SUCCESS:
    return state.merge({
      items: action.payload.Vehicles,
      meta: {
        total: action.payload.Total,
        current: action.payload.Page,
        pageSize: action.payload.PageSize,
      },
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.GET_VEHICLE_SUCCESS:
    return state.merge({
      editingVehicle: action.payload,
      isFetching: false,
      didInvalidate: false,
    })
  case TYPES.INSERT_VEHICLE_SUCCESS:
  case TYPES.UPDATE_VEHICLE_SUCCESS:
  case TYPES.DELETE_VEHICLE_SUCCESS:
  case TYPES.INSERT_VEHICLE_FAILURE:
  case TYPES.UPDATE_VEHICLE_FAILURE:
  case TYPES.DELETE_VEHICLE_FAILURE:
  case TYPES.GET_VEHICLE_FAILURE:
  case TYPES.GET_VEHICLES_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: true,
    })
  default:
    return state
  }
}
export default vehicleReducer
