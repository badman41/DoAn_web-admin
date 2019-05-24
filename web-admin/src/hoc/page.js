import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPage, setOpenKey } from '../scenes/Header/actions'

const WithPageHOC = (currentPage, openKey) => WrappedComponent => {
  class Page extends Component {
    componentDidMount() {
      this.props.setPage(currentPage)
      this.props.setOpenKey(openKey)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => ({})

  const mapDispatchToProps = dispatch => ({
    setPage: currentPage => dispatch(setPage(currentPage)),
    setOpenKey: openKey => dispatch(setOpenKey(openKey)),
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Page)
}
export default WithPageHOC
