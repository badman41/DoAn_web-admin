const HEADERS = {
  DEFAULT_HEADER: { 'Content-Type': 'application/json; charset=UTF-8' },
  JWT_HEADER: () => ({
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: localStorage.getItem('aaJwt'),
  }),
  file_header: () => ({
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('aaJwt'),
  }),
}

export const API = {
  AUTH: {
    login: () => ({
      //endPoint: '/api/account/v1/users/login',
      endPoint: `/orderApi/Account`,
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
    }),
    loginWithToken: () => ({
      //endPoint: '/api/account/v1/users/login/token',
      endPoint: `/orderApi/Account/LoginWithToken`,
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    changePassword: () => ({
      endPoint: '/api/account/v1/users/password',
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    // resetPassword: () => ({
    //   endPoint: '/api/account/v1/users/resetpassword',
    //   method: 'PUT',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    resetPassword: () => ({
      endPoint: '/transition/Driver/ResetPassword',
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateProfile: () => ({
      endPoint: '/api/account/v1/users',
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  ACCOUNT: {
    registerAdmin: () => ({
      //endPoint: '/api/account/v1/client/signup/admin',
      endPoint: '/orderApi/Account/AddNew',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getAccounts: () => ({
      //endPoint: '/api/account/v1/users',
      endPoint: '/orderApi/Account',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  NOTIFICATION: {
    getNotifications: () => ({
      endPoint: '/api/account/v1/notifications',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateNotificationStatus: id => ({
      endPoint: `/api/account/v1/notifications/${id}`,
      method: 'PATCH',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  VEHICLE: {
    // getVehicles: () => ({
    //   endPoint: '/api/vehicle/v1/vehicles',
    //   method: 'GET',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    getVehicles: () => ({
      endPoint: '/transition/Vehicle',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    // getVehicle: id => ({
    //   endPoint: `/api/vehicle/v1/vehicles/${id}`,
    //   method: 'GET',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    getVehicle: id => ({
      endPoint: `/transition/Vehicle/${id}/edit`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    // insertVehicle: () => ({
    //   endPoint: '/api/vehicle/v1/vehicles',
    //   method: 'POST',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    insertVehicle: () => ({
      endPoint: '/transition/Vehicle',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    // updateVehicle: id => ({
    //   endPoint: `/api/vehicle/v1/vehicles/${id}`,
    //   method: 'PUT',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    updateVehicle: id => ({
      endPoint: `/transition/Vehicle/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    // deleteVehicle: id => ({
    //   endPoint: `/api/vehicle/v1/vehicles/${id}`,
    //   method: 'DELETE',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    deleteVehicle: id => ({
      endPoint: `/transition/Vehicle/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    // importFromExcel: () => ({
    //   endPoint: '/api/vehicle/v1/vehicles/import/by_excel',
    //   method: 'POST',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    importFromExcel: () => ({
      endPoint: '/transition/Vehicle/UploadFile',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  VEHICLE_TYPE: {
    // getVehicleTypes: () => ({
    //   endPoint: '/api/vehicle/v1/vehicles-type',
    //   method: 'GET',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    getVehicleTypes: () => ({
      endPoint: '/transition/VehicleType',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    // insertVehicleType: () => ({
    //   endPoint: '/api/vehicle/v1/vehicles-type',
    //   method: 'POST',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    insertVehicleType: () => ({
      endPoint: '/transition/VehicleType',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateVehicleType: id => ({
      endPoint: `/api/vehicle/v1/vehicles-type/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    // deleteVehicleType: id => ({
    //   endPoint: `/api/vehicle/v1/vehicles-type/${id}`,
    //   method: 'DELETE',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    deleteVehicleType: id => ({
      endPoint: `/transition/VehicleType/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  CUSTOMER: {
    getCustomers: () => ({
      //endPoint: '/api/customer/v1/customers',
      endPoint: '/orderApi/Customer',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    getCustomer: id => ({
      //endPoint: `/api/customer/v1/customers/${id}`,
      endPoint: `/orderApi/Customer/${id}`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    insertCustomer: () => ({
      //endPoint: '/api/customer/v1/customers',
      endPoint: '/orderApi/Customer',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateCustomer: id => ({
      //endPoint: `/api/customer/v1/customers/${id}`,
      endPoint: `/orderApi/Customer/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteCustomer: id => ({
      //endPoint: `/api/customer/v1/customers/${id}`,
      endPoint: `/orderApi/Customer/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    importFromExcel: () => ({
      //endPoint: '/api/customer/v1/customers/import/by_excel_customer',
      endPoint: '/orderApi/Customer/UploadFile',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    importPriceTable: () => ({
      //endPoint: '/api/customer/v1/customer-price-tables/from-excel',
      endPoint: '/orderApi/Quotation/ImportQuotation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  CUSTOMER_GROUP: {
    getCustomerGroups: () => ({
      //endPoint: '/api/customer/v1/customer-groups',
      endPoint: '/orderApi/CustomerGroup',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    insertCustomerGroup: () => ({
      //endPoint: '/api/customer/v1/customer-groups',
      endPoint: '/orderApi/CustomerGroup',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateCustomerGroup: id => ({
      endPoint: `/api/customer/v1/customer-groups/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteCustomerGroup: id => ({
      endPoint: `/api/customer/v1/customer-groups/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    addCustomerToGroup: id => ({
      //endPoint: `/api/customer/v1/customer-groups/${id}/customers`,
      endPoint: `/orderApi/CustomerGroup/AddCustomerToGroup/${id}`,
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getCustomerOfGroup: id => ({
      //endPoint: `/api/customer/v1/customer-groups/${id}/customers`,
      endPoint: `/orderApi/CustomerGroup/${id}`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    removeCustomerFromGroup: id => ({
      endPoint: `/api/customer/v1/customer-groups/${id}/customers`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    importPriceTable: () => ({
      //endPoint: '/api/customer/v1/customer-price-tables/from-excel',
      endPoint: '/orderApi/Quotation/ImportQuotationByGroup',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getPriceTable: code => ({
      //endPoint: `/api/customer/v1/customer-price-tables/by-customers/${code}`,
      endPoint: `/orderApi/Quotation/${code}`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    addItemToPriceTable: id => ({
      //endPoint: `/api/customer/v1/customer-price-tables/${id}/product-prices`,
      endPoint: `/orderApi/QuotationItem/${id}`,
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    removeItemFromPriceTable: id => ({
      endPoint: `/api/customer/v1/customer-price-tables/${id}/product-prices`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateItemInPriceTable: id => ({
      //endPoint: `/api/customer/v1/customer-price-tables/${id}/product-prices`,
      endPoint: `/orderApi/QuotationItem/${id}`,
      method: 'PATCH',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  PRODUCT: {
    getProducts: () => ({
      //endPoint: '/api/product/v1/products',
      endPoint: '/orderApi/Product',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    getProductByCustomerId: id => ({
      //endPoint: `/api/product/v1/of-customers/${id}/price-table`,
      endPoint: `/orderApi/ProductCustomer/${id}`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    getProduct: id => ({
      //endPoint: `/api/product/v1/products/${id}`,
      endPoint: `/orderApi/Product/${id}`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    insertProduct: () => ({
      //endPoint: '/api/product/v1/products',
      endPoint: '/orderApi/Product',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateProduct: id => ({
      //endPoint: `/api/product/v1/products/${id}`,
      endPoint: `/orderApi/Product/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteProduct: id => ({
      //endPoint: `/api/product/v1/products/${id}`,
      endPoint: `//orderApi/Product/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    importFromExcel: () => ({
      //endPoint: '/api/product/v1/import/by_excel',
      endPoint: '/orderApi/Product/UploadFile',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  REQUEST: {
    getRequests: () => ({
      //endPoint: '/api/product/v1/product-request',
      endPoint: '/orderApi/ProductRequest',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    replyRequest: id => ({
      //endPoint: `/api/product/v1/product-request/${id}/response`,
      endPoint: `/orderApi/ProductRequest/${id}`,
      method: 'PATCH',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  PRODUCT_UNIT: {
    getProductUnits: () => ({
      //endPoint: '/api/product/v1/unit/productunits',
      endPoint: '/orderApi/Unit',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    insertProductUnit: () => ({
      //endPoint: '/api/product/v1/unit/productunits',
      endPoint: '/orderApi/Unit',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getProductUnit: id => ({
      //endPoint: `/api/product/v1/unit/productunits/${id}`,
      endPoint: `/orderApi/Unit/${id}`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateProductUnit: id => ({
      //endPoint: `/api/product/v1/unit/productunits/${id}`,
      endPoint: `/orderApi/Unit/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteProductUnit: id => ({
      //endPoint: `/api/product/v1/unit/productunits/${id}`,
      endPoint: `/orderApi/Unit/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  PRODUCT_CONDITION: {
    getProductConditions: () => ({
      //endPoint: '/api/product/v1/preservations',
      endPoint: '/orderApi/Preservation',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    insertProductConditions: () => ({
      //endPoint: '/api/product/v1/preservations',
      endPoint: '/orderApi/Preservation',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteProductCondition: id => ({
      //endPoint: `/api/product/v1/preservations/${id}`,
      endPoint: `/orderApi/Preservation/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  DRIVER: {
    // getAllDrivers: () => ({
    //   endPoint: '/api/driver/v1/drivers',
    //   method: 'GET',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    getAllDrivers: () => ({
      endPoint: 'transition/Driver',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    // getDrivers: () => ({
    //   endPoint: '/api/driver/v1/drivers',
    //   method: 'GET',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    getDrivers: () => ({
      endPoint: '/transition/Driver',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    // getDriver: id => ({
    //   endPoint: `/api/driver/v1/drivers/${id}`,
    //   method: 'GET',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    getDriver: id => ({
      endPoint: `/transition/Driver/${id}`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    // insertDriver: () => ({
    //   endPoint: '/api/driver/v1/drivers',
    //   method: 'POST',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    insertDriver: () => ({
      endPoint: '/transition/Driver',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    // updateDriver: id => ({
    //   endPoint: `/api/driver/v1/drivers/${id}`,
    //   method: 'PUT',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    updateDriver: id => ({
      endPoint: `/transition/Driver/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateDriverPhone: id => ({
      endPoint: `/api/driver/v1/drivers/${id}/phone`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    // deleteDriver: id => ({
    //   endPoint: `/api/driver/v1/drivers/${id}`,
    //   method: 'DELETE',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    deleteDriver: id => ({
      endPoint: `/transition/Driver/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    // importFromExcel: () => ({
    //   endPoint: '/api/driver/v1/import/by_excel',
    //   method: 'POST',
    //   headers: HEADERS.file_header(),
    // }),
    importFromExcel: () => ({
      endPoint: '/transition/Driver/UploadFile',
      method: 'POST',
      headers: HEADERS.file_header(),
    }),
  },
  INVOICE: {
    importFromExcel: date => ({
      //endPoint: '/api/invoice/v1/invoice/import/from_excel',
      endPoint: `/orderApi/Invoice/ImportExcel/${date}`,
      method: 'POST',
      headers: HEADERS.file_header(),
    }),
    getInvoices: () => ({
      //endPoint: '/api/invoice/v1/invoice',
      endPoint: '/orderApi/Invoice',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateInvoice: id => ({
      //endPoint: `/api/invoice/v1/invoice/${id}`,
      endPoint: `/orderApi/Invoice/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteInvoice: id => ({
      endPoint: `/api/invoice/v1/invoice/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    insertInvoice: () => ({
      //endPoint: '/api/invoice/v1/invoice',
      endPoint: '/orderApi/Invoice',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    checkOrdered: () => ({
      //endPoint: '/api/invoice/v1/invoice/ordered-customer-status',
      endPoint: '/orderApi/OrderedCustomer',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    reportInvoices: params => ({
      //endPoint: '/api/invoice/v1/invoice/excel-report',
      endPoint: '/orderApi/Invoice/Export',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
      params,
    }),
    cancleInvoice: id => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/invoice/v1/invoice/${id}`,
      endPoint: `/orderApi/InvoiceItem/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  ROUTING: {
    // solve: () => ({
    //   endPoint: `${process.env.REACT_APP_SOLVER_API}/vrpsolver/api/v1/vrp`,
    //   method: 'POST',
    //   headers: HEADERS.DEFAULT_HEADER,
    // }),
    solve: () => ({
      endPoint: `${process.env.REACT_APP_SOLVER_API}/vrpsolver/api/v1/vrp`,
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
    }),
    // updateSolution: () => ({
    //   endPoint: `${process.env.REACT_APP_SOLVER_API}/vrpsolver/api/v1/routes/calculation`,
    //   method: 'POST',
    //   headers: HEADERS.DEFAULT_HEADER,
    // }),
    updateSolution: () => ({
      endPoint: `${process.env.REACT_APP_SOLVER_API}/vrpsolver/api/v1/routes/calculation`,
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
    }),
  },
  ROUTE: {
    getRoutes: driverID => ({
      endPoint: `/api/route-manager/v1/routesmanager/drivers/${driverID}`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    changeDriver: (routeId, driverId) => ({
      endPoint: '/api/route-manager/v1/routesmanager/updateDriver/',
      method: 'PUT',
      params: { RouteID: routeId },
      payload: { ID: driverId },
      headers: HEADERS.JWT_HEADER(),
    }),
    getRouteTracking: () => ({
      endPoint: '/api/routes-tracking/v1/routes-tracking',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  SCHEDULE: {
    // getSchedules: () => ({
    //   endPoint: '/api/route-manager/v1/routesmanager',
    //   method: 'GET',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    getSchedules: () => ({
      endPoint: '/transition/Schedule',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    // getSchedule: (id, payload) => ({
    //   endPoint: `/api/route-manager/v1/routesmanager/${id}`,
    //   method: 'GET',
    //   headers: HEADERS.JWT_HEADER(),
    //   payload,
    // }),
    getSchedule: (id, payload) => ({
      endPoint: `/transition/Schedule/${id}`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
      payload,
    }),
    insertSchedule: () => ({
      endPoint: '/api/route-manager/v1/routesmanager',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateSchedule: id => ({
      endPoint: `/api/route-manager/v1/routesmanager/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    // deleteSchedule: id => ({
    //   endPoint: `/api/route-manager/v1/routesmanager/${id}`,
    //   method: 'DELETE',
    //   headers: HEADERS.JWT_HEADER(),
    // }),
    deleteSchedule: id => ({
      endPoint: `/transition/Schedule/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    importFromExcel: () => ({
      endPoint: '/api/route-manager/v1/routesmanager/import/sample-route',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  REPORT: {
    distanceReport: params => ({
      endPoint: '/api/route-manager/v1/routesmanager/drivers/reportalldrivers-distance',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
      params,
    }),
    weighReport: () => ({
      endPoint: '/api/route-manager/v1/routesmanager/drivers/reportdriver',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    weighsReport: () => ({
      endPoint: '/api/route-manager/v1/routesmanager/drivers/reportalldrivers',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    workingDaysReport: () => ({
      endPoint: '/api/route-manager/v1/routesmanager/drivers/reportalldrivers-workingdays',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  MEDIA: {
    imageUpload: () => ({
      endPoint: '/api/upload-media/v1/images',
      method: 'POST',
      headers: HEADERS.file_header(),
    }),
  },
}
