import moment from 'moment'

export const getResetTimeString = time => (time ? moment(time).hour(0)
  .minute(0)
  .second(0)
  .toISOString() : null)
