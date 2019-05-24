import React, { Component, Fragment } from 'react'
import LoadingIndicator from '../components/Loading'

const WithLoadingHOC = WrappedComponent => class LoadingHOC extends Component {
  render() {
    const { isFetching, contentLoading, isBlur } = this.props
    return isBlur ? (
      <Fragment>
        <LoadingIndicator content={contentLoading} isFetching={isFetching}>
          <WrappedComponent {...this.props} />
        </LoadingIndicator>
      </Fragment>
    ) : (
      <Fragment>
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            padding: '10px 0',
            display: isFetching ? null : 'none',
          }}
        >
          <LoadingIndicator />
        </div>
        <div style={{ display: isFetching ? 'none' : null }}>
          <WrappedComponent {...this.props} />
        </div>
      </Fragment>
    )
  }
}
export default WithLoadingHOC
