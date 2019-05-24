import React, { Component } from 'react'

const DEPOT_ICON = '/icon/depot.png'
export default class Depot extends Component {
  render() {
    return (
      <div style={{ height: 30, display: 'inline-block' }}>
        <img src={DEPOT_ICON} alt="" style={{ height: '100%' }} />
      </div>
    )
  }
}
