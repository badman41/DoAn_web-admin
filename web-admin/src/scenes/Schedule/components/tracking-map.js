/* global google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ToJS from '../../../hoc/toJs'

class LocationMap extends Component {
  state = {};

  componentDidMount() {
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
    const directionsService = new google.maps.DirectionsService()
    const directionsDisplay = new google.maps.DirectionsRenderer()
    const map = new window.google.maps.Map(document.getElementById(this.props.id), this.props.options)
    directionsDisplay.setMap(map)
    this.setDirection(directionsService, directionsDisplay, map)
    this.props.onMapLoad(map)
  };

  setDirection = (directionsService, directionsDisplay, map) => {
    const {
      data: {
        depot: { lat, lng },
        nodes,
        path,
      },
    } = this.props

    const flightPath = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    })
    flightPath.setMap(map)

    directionsService.route(
      {
        origin: new google.maps.LatLng(lat, lng),
        destination: new google.maps.LatLng(lat, lng),
        waypoints: nodes.map(({ lat, lng }) => ({
          location: new google.maps.LatLng(lat, lng),
          stopover: false,
        })),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(result)
        }
      },
    )
  };

  render() {
    return (
      <div id="map-container">
        <div style={{ width: '100%', height: 500, marginBottom: '10px' }} id={this.props.id} />
      </div>
    )
  }
}

LocationMap.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  options: PropTypes.object,
  onMapLoad: PropTypes.func.isRequired,
}

LocationMap.defaultProps = {
  data: {
    depot: {},
    nodes: [],
    path: [],
  },
  options: {},
  id: '',
}

export default ToJS(LocationMap)
