export const TYPES = {
  // Tuyến đường
  DRIVER_SHIP_TO_CUSTOMER: 1,
  NEW_ROUTE: 0,
  // Đơn hàng
  NEW_INVOICE: 2,
  UPDATE_INVOICE: 3,
  // Yêu cầu
  NEW_REQUEST: 4,
  UPDATE_REQUEST: 5,
  NEW_RESPONSE: 6,
}

export const MAP_ROUTER = {
  1: id => `/invoice/${id}`,
  2: id => `/invoice/${id}`,
  3: id => `/invoice/${id}`,
}
