/* global google */
import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import select from '../../util/select'
import { getCustomers } from './actions'
import ToJS from '../../hoc/toJs'

class CustomersMap extends Component {
  async componentDidMount() {
    await this.props.getCustomers()
    if (!window.google) {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyDzLbJ_SCH48RgPzJPmjsQxAAfXstxch-g'
      const x = document.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
      // Below is important.
      // We cannot access google.maps until it's finished loading
      s.addEventListener('load', () => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

    onScriptLoad = () => {
      const map = new window.google.maps.Map(document.getElementById('all-map'), {
        center: {
          lat: 20.995271,
          lng: 105.780953,
        },
        zoom: 12,
      })
      let marker
      this.props.customers.forEach((item, index) => {
        marker = new window.google.maps.Marker({
          position: { lat: item.Address.Lat, lng: item.Address.Lng },
          map,
        })
        const infowindow = new google.maps.InfoWindow()
        google.maps.event.addListener(
          marker,
          'click',
          (function (marker) {
            return function () {
              infowindow.setContent(item.Name)
              infowindow.open(map, marker)
            }
          }(marker, index)),
        )
      })
    };

    render() {
      return (
        <div id="map-container">
          <div style={{ width: '100%', height: 500, marginBottom: '10px' }} id="all-map" />
        </div>
      )
    }
}

const mapStateToProps = state => ({ customers: select(state, ['customerReducer', 'customer'], 'items') })

const mapDispatchToProps = dispatch => ({ getCustomers: () => dispatch(getCustomers()) })

CustomersMap.propTypes = {
  customers: PropTypes.array,
  getCustomers: PropTypes.func.isRequired,
}

CustomersMap.defaultProps = { customers: [] }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToJS(CustomersMap))
