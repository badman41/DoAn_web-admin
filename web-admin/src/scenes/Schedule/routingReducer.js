import { fromJS } from 'immutable'
import TYPES from '../../constants/actionTypes'

const initialState = fromJS({
  nodePool: [],
  solution: {},
  drivers: [],
  invoices: [],
  mapConfig: {
    zoom: 12,
    center: {
      lat: 20.995271,
      lng: 105.780953,
    },
  },
  time: '',
  isFetching: false,
})

const routingReducer = (state = initialState, action) => {
  switch (action.type) {
  case TYPES.SELECT_DRIVERS_FOR_VRP:
    return state.merge({ drivers: action.payload })
  case TYPES.SELECT_INVOICES_FOR_VRP:
    return state.merge({ invoices: action.payload })
  case TYPES.SELECT_TIME_FOR_VRP:
    return state.merge({ time: action.payload })
  case TYPES.SOLVING_VRP:
    return state.merge({ isFetching: true })
  case TYPES.SOLVE_VRP_SUCCESS:
  case TYPES.SELECT_SAMPLE_SCHEDULE:
    return state.merge({
      solution: action.payload ? action.payload : {},
      mapConfig: {
        zoom: 13,
        center: {
          lat: 20.995271,
          lng: 105.780953,
        },
      },
      isFetching: false,
    })
  case TYPES.SOLVE_VRP_FAILURE:
    return state.merge({ isFetching: false })
  case TYPES.UPDATE_ROUTES:
    return state.merge({
      solution: { routes: action.payload },
      isFetching: false,
    })
  case TYPES.SET_NODE_POOL:
    return state.merge({ nodePool: action.payload })
  case TYPES.SHOW_NODE_INFO:
    return state.merge({
      solution: {
        routes: state
          .get('solution')
          .get('routes')
          .map(route => {
            const updatedNodes = route.get('nodes').map(node => node.merge({
              showInfo:
                                        node.get('id') === action.payload.id
                                          ? !node.get('showInfo')
                                          : node.get('showInfo'),
            }))
            return route.merge({ nodes: updatedNodes })
          }),
      },
      mapConfig: {
        center: { lat: action.payload.lat, lng: action.payload.lng },
        zoom: 13,
      },
    })
  case TYPES.UPDATE_NODE_INFO:
    return state.merge({
      solution: {
        routes: state
          .get('solution')
          .get('routes')
          .map(route => {
            const updatedNodes = route.get('nodes').map(node => node.merge({
              driverRole: node.get('id') === action.payload.id
                ? action.payload.driverRole
                : node.get('driverRole'),
            }))
            return route.merge({ nodes: updatedNodes })
          }),
      },
      mapConfig: {
        zoom: 13,
        center: { lat: action.payload.lat, lng: action.payload.lng },
      },
    })


  case TYPES.SORT_DRIVERS:
    return state.merge({ drivers: action.payload })
  case TYPES.STOP_LOADING:
    return state.merge({ isFetching: false })
  case TYPES.UPDATE_DRIVER_NOTE:
    return state.merge({
      drivers: state.get('drivers').map(driver => {
        if (driver.get('ID') === action.payload.driver.ID) {
          return driver.merge({ note: action.payload.note })
        }
        return driver
      }),
    })
  case TYPES.INSERTING_SOLUTION:
    return state.merge({ isFetching: true })

  case TYPES.INSERT_SOLUTION_SUCCESS:
    return state.merge(initialState)
  case TYPES.INSERT_SOLUTION_FAILURE:
    return state.merge({ isFetching: false })

  default:
    return state
  }
}
export default routingReducer
