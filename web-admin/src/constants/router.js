export default {
  HOME: '/',
  NOTIFICATION: '/notifications',
  AUTH: { LOGIN: '/login' },
  VEHICLE: {
    INDEX: '/vehicle',
    ADD: '/vehicle/add',
    EDIT: '/vehicle/:id/edit',
  },
  DRIVER: {
    INDEX: '/driver',
    ADD: '/driver/add',
    EDIT: '/driver/:id/edit',
  },
  CUSTOMER: {
    INDEX: '/customer',
    ADD: '/customer/add',
    EDIT: '/customer/:id/edit',
    MAP: '/customer-map',
  },
  CUSTOMER_GROUP: {
    INDEX: '/customer-group',
    DETAIL: '/customer-group/:id',
  },
  PRODUCT: {
    INDEX: '/product',
    ADD: '/product/add',
    EDIT: '/product/:id/edit',
  },
  ROUTING: {
    VRP: '/routing',
    SAMPLE: '/routing-sample',
  },
  INVOICE: {
    INDEX: '/invoice',
    DETAIL: '/invoice/:id',
    EDIT: '/invoice/:id/edit',
    ADD: '/invoice/add',
  },
  GENERAL: {
    INDEX: '/general',
    ACCOUNT: '/account',
  },
  ROUTE: { INDEX: '/routes' },
  SCHEDULE: {
    INDEX: '/schedule',
    DETAIL: '/schedule/:id',
    EDIT: '/schedule/:id/edit',
  },
  ACCOUNT: { PASSWORD: '/password' },
  REPORT: {
    DISTANCE: '/distance',
    WEIGHT: '/weight',
    WORKING_DAYS: '/working-days',
  },
}
