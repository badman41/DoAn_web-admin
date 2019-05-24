import moment from 'moment'
import _ from 'lodash'
import { API } from '../../constants/api'
import { apiCall } from '../../util/apiCall'
import TYPES from '../../constants/actionTypes'
import select from '../../util/select'
import { normalizeData, normalizeOutput } from '../../util/vrp'

// Vrp

const solvingVrp = () => ({ type: TYPES.SOLVING_VRP })

const solveVrpSuccess = payload => ({
  type: TYPES.SOLVE_VRP_SUCCESS,
  payload,
})

const solveVrpFailure = () => ({ type: TYPES.SOLVE_VRP_FAILURE })

export const solveVrp = ({ drivers, invoices, options }) => async dispatch => {
  dispatch(solvingVrp())
  const payload = normalizeData({
    drivers,
    invoices,
    options,
  })
  const api = API.ROUTING.solve()
  const { response, error } = await apiCall({
    ...api,
    payload,
  })
  if (!error && response.status === 200) {
    dispatch(solveVrpSuccess(normalizeOutput(response.data, invoices)))
  } else {
    dispatch(solveVrpFailure())
  }
}

const normalizeRoute = (oldRoutes, drivers, invoices) => {
  let routes
  if (oldRoutes.length > drivers.length) {
    routes = oldRoutes.slice(0, drivers.length)
  } else {
    routes = oldRoutes
  }
  return routes.filter(route => route.nodes.length > 0).map((route, routeIndex) => ({
    DriverID: drivers[routeIndex].ID,
    EstimatedDistance: route.distance > 0 ? route.distance : 0,
    EstimatedDuration: route.duration,
    DepartureTime: moment.unix(invoices[0].DeliveryTime).toISOString(),
    Note: drivers[routeIndex].note,
    Customers: route.nodes.map(node => ({
      Address: {
        Lat: node.lat,
        Lng: node.lng,
      },
      CustomerID: node.invoice.CustomerID,
      Invoices: [node.invoice.ID],
      Status: 0,
      Weight: node.invoice.WeightTotal,
      DriverRole: node.driverRole,
    })),
    Depot: {
      Address: 'Nhà A tầng 2 khu VL1, khu Trung tâm Thương mại Dịch Vụ Trung Văn 1',
      Lat: route.depot.lat,
      Lng: route.depot.lng,
      WarehouseId: 'Trung Văn',
    },
    Weight: route.weight,
    Status: 0,
  }))
}

// Insert Schedule

const insertingSolution = () => ({ type: TYPES.INSERTING_SOLUTION })

const insertSolutionSuccess = () => ({ type: TYPES.INSERT_SOLUTION_SUCCESS })
const insertSolutionFailure = () => ({ type: TYPES.INSERT_SOLUTION_FAILURE })

export const insertSolution = (
  {
    solution,
    drivers,
    invoices,
    name,
    note,
    routeType,
  },
  meta,
) => async dispatch => {
  dispatch(insertingSolution())
  const routes = normalizeRoute(solution.routes, drivers, invoices)
  const payload = {
    CreatedAt: moment().toISOString(),
    CreatedById: '',
    DeliveredAt: moment(1000 * invoices[0].DeliveryTime).toISOString(),
    EstimatedDistance: solution.distance
      ? Math.floor(solution.distance)
      : routes.map(item => item.EstimatedDistance).reduce((a, b) => a + b),
    EstimatedDuration: solution.duration
      ? Math.floor(solution.duration)
      : routes.map(item => item.EstimatedDuration).reduce((a, b) => a + b),
    Name: name,
    NumberOfCustomers: routes.map(item => item.Customers.length).reduce((a, b) => a + b, 0),
    RouteManagerType: routeType ? 2 : 0,
    Note: note,
    Routes: routes,
    Status: 0,
    Weight: routes.map(item => item.Weight).reduce((a, b) => a + b),
  }
  const parallelPayload = {
    ...payload,
    RouteManagerType: 0,
  }
  const api = API.SCHEDULE.insertSchedule()
  if (routeType) {
    await apiCall({ ...api, payload: parallelPayload })
  }
  const { response, error } = await apiCall({
    ...api,
    payload,
  })
  if (!error && response.status === 200) {
    dispatch(insertSolutionSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess()
    }
  } else {
    dispatch(insertSolutionFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}

const normalizeDataForUpdateSolution = routes => routes.map(route => ({
  depot: {
    capacity: 10000,
    latitude: route.depot.lat,
    longitude: route.depot.lng,
    nbvehicles: 1,
  },
  distance: route.distance,
  duration: route.duration,
  order: route.numberOfOrder,
  weight: route.weight,
  customers: route.nodes.map(node => ({
    customerID: node.invoice.CustomerID,
    latitude: node.invoice.Address.Lat,
    longitude: node.invoice.Address.Lng,
    order: node.invoice.numberOfOrder,
    weight: node.invoice.WeightTotal,
  })),
}))


export const selectDriversForVrp = payload => ({
  type: TYPES.SELECT_DRIVERS_FOR_VRP,
  payload,
})

export const selectInvoicesForVrp = payload => ({
  type: TYPES.SELECT_INVOICES_FOR_VRP,
  payload,
})

export const selectSampleSchedule = payload => ({
  type: TYPES.SELECT_SAMPLE_SCHEDULE,
  payload,
})

export const setFilterTime = payload => ({
  type: TYPES.SELECT_TIME_FOR_VRP,
  payload,
})

export const setNodePool = payload => ({
  type: TYPES.SET_NODE_POOL,
  payload,
})

export const updateRoutes = payload => ({
  type: TYPES.UPDATE_ROUTES,
  payload,
})

export const showNodeInfo = node => ({
  type: TYPES.SHOW_NODE_INFO,
  payload: node,
})

export const updateNodeInfo = node => ({
  type: TYPES.UPDATE_NODE_INFO,
  payload: node,
})

export const sortDrivers = drivers => ({
  type: TYPES.SORT_DRIVERS,
  payload: drivers,
})


export const updateDriverNote = (driver, note) => ({
  type: TYPES.UPDATE_DRIVER_NOTE,
  payload: {
    driver,
    note,
  },
})

export const stopLoading = () => ({ type: TYPES.STOP_LOADING })

// Updating Route Info

const updatingSolution = () => ({ type: TYPES.UPDATING_SOLUTION })

const updateSolutionSuccess = () => ({ type: TYPES.UPDATE_SOLUTION_SUCCESS })

const updateSolutionFailure = () => ({ type: TYPES.UPDATE_SOLUTION_FAILURE })
export const updateSolution = (change, source, meta) => async dispatch => {
  const api = API.ROUTING.updateSolution()
  const payload = normalizeDataForUpdateSolution(change)
  dispatch(updatingSolution())
  const { response, error } = await apiCall({
    ...api,
    payload,
  })
  if (!error && response.status === 200) {
    dispatch(updateSolutionSuccess())
    if (meta && meta.onSuccess) {
      const newRoutes = source.map(route => {
        let newRoute = {}
        response.data.forEach(({ distance, duration, weight, order }) => {
          if (order === route.numberOfOrder) {
            newRoute = {
              ...route,
              distance,
              weight,
              duration,
            }
          }
        })
        if (!_.isEmpty(newRoute)) {
          return newRoute
        }
        return route
      })
      meta.onSuccess(newRoutes)
    }
  } else {
    dispatch(updateSolutionFailure())
    if (meta && meta.onError) {
      meta.onError(error)
    }
  }
}


// Get List Schedules

const gettingSchedules = () => ({ type: TYPES.GETTING_SCHEDULES })

const getSchedulesSuccess = payload => ({
  type: TYPES.GET_SCHEDULES_SUCCESS,
  payload,
})

const getSchedulesFailure = () => ({ type: TYPES.GET_SCHEDULES_FAILURE })

export const getSchedules = params => async dispatch => {
  const api = API.SCHEDULE.getSchedules()
  dispatch(gettingSchedules())
  const { response, error } = await apiCall({
    ...api,
    params,
  })
  if (!error && response.status === 200) {
    dispatch(getSchedulesSuccess(response.data))
  } else {
    dispatch(getSchedulesFailure())
  }
}

export const getSchedulesIfNeed = params => (dispatch, getState) => {
  const state = getState()
  const isFetching = select(state, ['scheduleReducer', 'list'], 'isFetching')
  const didInvalidate = select(state, ['scheduleReducer', 'list'], 'didInvalidate')
  if (!isFetching && didInvalidate) {
    dispatch(getSchedules(params))
  }
}

// Get Schedule Detail

const gettingSchedule = () => ({ type: TYPES.GETTING_SCHEDULE })

const getScheduleSuccess = payload => ({
  type: TYPES.GET_SCHEDULE_SUCCESS,
  payload,
})

const getScheduleFailure = () => ({ type: TYPES.GET_SCHEDULE_FAILURE })

export const getSchedule = scheduleId => async dispatch => {
  const api = API.SCHEDULE.getSchedule(scheduleId)
  dispatch(gettingSchedule())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(getScheduleSuccess(response.data))
  } else {
    dispatch(getScheduleFailure())
  }
}

// Update Schedule

const updatingSchedule = () => ({ type: TYPES.UPDATING_SCHEDULE })

const updateScheduleSuccess = () => ({ type: TYPES.UPDATE_SCHEDULE_SUCCESS })

const updateScheduleFailure = () => ({ type: TYPES.UPDATE_SCHEDULE_FAILURE })

export const updateSchedule = (scheduleId, payload) => async dispatch => {
  const api = API.SCHEDULE.updateSchedule(scheduleId)
  dispatch(updatingSchedule())
  const { response, error } = await apiCall({ ...api, payload })
  if (!error && response.status === 200) {
    dispatch(updateScheduleSuccess())
  } else {
    dispatch(updateScheduleFailure())
  }
}

export const deleteSchedule = scheduleId => async dispatch => {
  const api = API.SCHEDULE.deleteSchedule(scheduleId)
  dispatch(updatingSchedule())
  const { response, error } = await apiCall({ ...api })
  if (!error && response.status === 200) {
    dispatch(updateScheduleSuccess())
  } else {
    dispatch(updateScheduleFailure())
  }
}


export const importSchedule = (payload, meta) => async dispatch => {
  const api = API.SCHEDULE.importFromExcel()
  dispatch(updatingSchedule())
  const { response, error } = await apiCall({
    ...api,
    payload,
  })
  if (!error && response.status === 200) {
    dispatch(updateScheduleSuccess())
    if (meta && meta.onSuccess) {
      meta.onSuccess(response.data)
    }
  } else {
    dispatch(updateScheduleFailure())
    if (meta && meta.onError) {
      meta.onError()
    }
  }
}
