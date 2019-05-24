import { combineReducers } from 'redux-immutable'

import appReducer from './Header/reducer'
import authReducer from './Auth/reducer'
import generalReducer from './General/reducer'
import routingReducer from './Schedule/routingReducer'
import scheduleReducer from './Schedule/reducer'
import routeReducer from './Route/reducer'
import reportReducer from './Report/reducer'
import driverReducer from './Driver/reducer'
import invoiceReducer from './Invoice/reducer'
import orderReducer from './Order/reducer'
import vehicleReducer from './Vehicle/reducer'
import customerReducer from './Customer/reducer'
import productReducer from './Product/reducer'
import dashboardReducer from './Dashboard/reducer'

export default combineReducers({
  authReducer,
  appReducer,
  generalReducer,
  scheduleReducer,
  reportReducer,
  routeReducer,
  routingReducer,
  driverReducer,
  invoiceReducer,
  orderReducer,
  vehicleReducer,
  customerReducer,
  productReducer,
  dashboardReducer,
})
