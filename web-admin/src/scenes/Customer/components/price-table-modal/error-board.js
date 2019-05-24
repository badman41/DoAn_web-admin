import React from 'react'
import PropTypes from 'prop-types'


const ErrorBoard = ({ result, error }) => (
  <div>
    {
      error ? <h3>{`Có lỗi xảy ra - ${result.error}`}</h3>
        : (
          <div>
            <h4>{`Sản phẩm lỗi: ${result.FailedProducts ? result.FailedProducts.join(', ') : []}`}</h4>
            <h4>{`Đơn vị lỗi: ${result.FailedUnits ? result.FailedUnits.join(', ') : []}`}</h4>
            <h4>{`Lỗi khác: ${result.OtherErrors ? result.OtherErrors.join(', ') : []}`}</h4>
          </div>
        )
    }
  </div>
)

ErrorBoard.propTypes = {
  error: PropTypes.bool,
  result: PropTypes.object,
}

ErrorBoard.defaultProps = {
  error: false,
  result: {},
}

export default ErrorBoard
