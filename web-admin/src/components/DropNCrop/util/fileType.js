/* global File */
import _ from 'lodash'

/* Validation */
export default (types, message) => value => ({
  isValid:
    (value instanceof Array || value instanceof Object) && value[0] instanceof File && _.includes(types, value[0].type),
  message,
})
