import { API } from '../../constants/api'
import TYPES from '../../constants/actionTypes'
import { apiCall } from '../../util/apiCall'

const gettingDistanceReport = () => ({ type: TYPES.GETTING_DISTANCE_REPORT })

const getDistanceReportSuccess = payload => ({
  type: TYPES.GET_DISTANCE_REPORT_SUCCESS,
  payload,
})

const getDistanceReportFailure = () => ({ type: TYPES.GET_DISTANCE_REPORT_FAILURE })

export const getDistanceReport = params => async dispatch => {
  const api = API.REPORT.distanceReport(params)
  dispatch(gettingDistanceReport())
  const { response, error } = await apiCall(api)
  if (!error && response.status === 200) {
    dispatch(getDistanceReportSuccess(response.data))
  } else {
    dispatch(getDistanceReportFailure())
  }
}

const gettingWeightReport = () => ({ type: TYPES.GETTING_WEIGHT_REPORT })

const getWeightReportSuccess = payload => ({
  type: TYPES.GET_WEIGHT_REPORT_SUCCESS,
  payload,
})

const getWeightReportFailure = () => ({ type: TYPES.GET_WEIGHT_REPORT_FAILURE })

export const getWeighReport = params => async dispatch => {
  const api = API.REPORT.weighReport()
  dispatch(gettingWeightReport())
  const { response, error } = await apiCall({
    ...api,
    params,
  })
  if (!error && response.status === 200) {
    dispatch(getWeightReportSuccess(response.data))
  } else {
    dispatch(getWeightReportFailure())
  }
}

export const getWeighsReport = params => async dispatch => {
  const api = API.REPORT.weighsReport()
  dispatch(gettingWeightReport())

  const { response, error } = await apiCall({
    ...api,
    params,
  })
  if (!error && response.status === 200) {
    dispatch(getWeightReportSuccess(response.data))
  } else {
    dispatch(getWeightReportFailure())
  }
}

const gettingWorkingDays = () => ({ type: TYPES.GETTING_WORKING_DAY_REPORT })

const getWorkingDaysSuccess = payload => ({
  type: TYPES.GET_WORKING_DAY_REPORT_SUCCESS,
  payload,
})

const getWorkingDaysFailure = () => ({ type: TYPES.GET_WORKING_DAY_REPORT_FAILURE })

export const getWorkingDaysReport = params => async dispatch => {
  const api = API.REPORT.workingDaysReport()
  dispatch(gettingWorkingDays())
  const { response, error } = await apiCall({ ...api, params })
  if (!error && response.status === 200) {
    dispatch(getWorkingDaysSuccess(response.data))
  } else {
    dispatch(getWorkingDaysFailure())
  }
}
