import TYPES from '../../constants/actionTypes'

// Product Unit Action

export const gettingProductUnits = () => ({ type: TYPES.GETTING_PRODUCT_UNITS })
export const getProductUnitsSuccess = payload => ({
  type: TYPES.GET_PRODUCT_UNITS_SUCCESS,
  payload,
})
export const getProductUnitsFailure = () => ({ type: TYPES.GET_PRODUCT_UNITS_FAILURE })

export const gettingProductUnit = () => ({ type: TYPES.GETTING_PRODUCT_UNIT })
export const getProductUnitSuccess = payload => ({
  type: TYPES.GET_PRODUCT_UNIT_SUCCESS,
  payload,
})
export const getProductUnitFailure = () => ({ type: TYPES.GET_PRODUCT_UNIT_FAILURE })

export const insertingProductUnit = () => ({ type: TYPES.INSERTING_PRODUCT_UNIT })
export const insertProductUnitSuccess = () => ({ type: TYPES.INSERT_PRODUCT_UNIT_SUCCESS })
export const insertProductUnitFailure = () => ({ type: TYPES.INSERT_PRODUCT_UNIT_FAILURE })

export const updatingProductUnit = () => ({ type: TYPES.UPDATING_PRODUCT_UNIT })
export const updateProductUnitSuccess = () => ({ type: TYPES.UPDATE_PRODUCT_UNIT_SUCCESS })
export const updateProductUnitFailure = () => ({ type: TYPES.UPDATE_PRODUCT_UNIT_FAILURE })

export const deletingProductUnit = () => ({ type: TYPES.DELETING_PRODUCT_UNIT })
export const deleteProductUnitSuccess = () => ({ type: TYPES.DELETE_PRODUCT_UNIT_SUCCESS })
export const deleteProductUnitFailure = () => ({ type: TYPES.DELETE_PRODUCT_UNIT_FAILURE })

export const gettingVehicleTypes = () => ({ type: TYPES.GETTING_VEHICLE_TYPES })

export const getVehicleTypesSuccess = payload => ({
  type: TYPES.GET_VEHICLE_TYPES_SUCCESS,
  payload,
})

export const getVehicleTypesFailure = payload => ({
  type: TYPES.GET_VEHICLE_TYPES_FAILURE,
  payload,
})

export const insertingVehicleType = () => ({ type: TYPES.INSERTING_VEHICLE_TYPE })

export const insertVehicleTypeSuccess = () => ({ type: TYPES.INSERT_VEHICLE_TYPE_SUCCESS })

export const insertVehicleTypeFailure = () => ({ type: TYPES.INSERT_VEHICLE_TYPE_FAILURE })

export const deletingVehicleType = () => ({ type: TYPES.DELETING_VEHICLE_TYPE })

export const deleteVehicleTypeSuccess = () => ({ type: TYPES.DELETE_VEHICLE_TYPE_SUCCESS })

export const deleteVehicleTypeFailure = () => ({ type: TYPES.DELETE_VEHICLE_TYPE_FAILURE })

export const gettingProductConditions = () => ({ type: TYPES.GETTING_PRODUCT_CONDITIONS })
export const getProductConditionsSuccess = payload => ({
  type: TYPES.GET_PRODUCT_CONDITIONS_SUCCESS,
  payload,
})
export const getProductConditionsFailure = () => ({ type: TYPES.GET_PRODUCT_CONDITIONS_FAILURE })

export const gettingProductCondition = () => ({ type: TYPES.GETTING_PRODUCT_CONDITION })
export const getProductConditionSuccess = payload => ({
  type: TYPES.GET_PRODUCT_CONDITION_SUCCESS,
  payload,
})
export const getProductConditionFailure = () => ({ type: TYPES.GET_PRODUCT_CONDITION_FAILURE })

export const insertingProductCondition = () => ({ type: TYPES.INSERTING_PRODUCT_CONDITION })
export const insertProductConditionSuccess = () => ({ type: TYPES.INSERT_PRODUCT_CONDITION_SUCCESS })
export const insertProductConditionFailure = () => ({ type: TYPES.INSERT_PRODUCT_CONDITION_FAILURE })

export const updatingProductCondition = () => ({ type: TYPES.UPDATING_PRODUCT_CONDITION })
export const updateProductConditionSuccess = () => ({ type: TYPES.UPDATE_PRODUCT_CONDITION_SUCCESS })
export const updateProductConditionFailure = () => ({ type: TYPES.UPDATE_PRODUCT_CONDITION_FAILURE })

export const deletingProductCondition = () => ({ type: TYPES.DELETING_PRODUCT_CONDITION })
export const deleteProductConditionSuccess = () => ({ type: TYPES.DELETE_PRODUCT_CONDITION_SUCCESS })
export const deleteProductConditionFailure = () => ({ type: TYPES.DELETE_PRODUCT_CONDITION_FAILURE })
