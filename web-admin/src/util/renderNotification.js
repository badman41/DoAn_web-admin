import { TYPES } from '../constants/notification'

export default item => {
  switch (Number(item.TypeCode)) {
  case TYPES.DRIVER_SHIP_TO_CUSTOMER:
    return `${item.CustomerName} đã nhận đơn hàng`
  case TYPES.NEW_INVOICE:
    return `${item.CustomerName} đã đặt hàng`
  case TYPES.UPDATE_INVOICE:
    return `${item.CustomerName} đã cập nhật đơn hàng`
  case TYPES.NEW_REQUEST:
    return `${item.CustomerName} đã yêu cầu ${item.Quantity} ${item.ProductName}`
  case TYPES.UPDATE_REQUEST:
    return `${item.CustomerName} đã cập nhật ${item.Quantity} ${item.ProductName}`
  case TYPES.NEW_RESPONSE:
    return `Đã trả lời ${item.Response} cho ${item.CustomerName}`
  default:
    return ' Thông báo mới'
  }
}
