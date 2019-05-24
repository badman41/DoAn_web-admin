import * as ProductActions from './Product/actions'
import * as VehicleActions from './Vehicle/actions'
import * as InvoiceAction from './Invoice/actions'
import * as DriverAction from './Driver/actions'
import * as CustomerAction from './Customer/actions'

import * as GeneralAction from './General/actions'
import * as OrderAction from './Order/actions'
import * as ReportAction from './Report/actions'
import * as RouteAction from './Route/actions'
import * as ScheduleAction from './Schedule/actions'

export default {
  ...ProductActions,
  ...VehicleActions,
  ...InvoiceAction,
  ...DriverAction,
  ...CustomerAction,

  ...GeneralAction,
  ...OrderAction,
  ...ReportAction,
  ...RouteAction,
  ...ScheduleAction,
}
