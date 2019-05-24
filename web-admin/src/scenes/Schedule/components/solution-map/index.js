/* global google */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ToJs from '../../../../hoc/toJs'

const COLOR = [
  'red',
  'blue, purple',
  'fuchsia',
  'green',
  'navy',
  'aqua',
  'cyan',
  'lime',
  'orange',
  'cadetblue',
  'bisque',
  'darkcyan',
  'darkmagenta',
  'red',
  'blue, purple',
  'fuchsia',
  'green',
  'navy',
  'aqua',
  'cyan',
]

const NODE_ICON = '/icon/node.png'
const DEPOT_ICON = '/icon/depot.png'

class SolutionMap extends Component {
  constructor(props) {
    super(props)
    this.map = React.createRef()
  }

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

  shouldComponentUpdate() {
    this.onScriptLoad()
    return true
  }

  setMap = ref => {
    this.map = ref
  }


  onScriptLoad = () => {
    this.map = new google.maps.Map(document.getElementById('map'), this.props.mapConfig)
    const { data: { depot, nodes, routes } } = this.props
    routes.forEach((route, index) => {
      const path = []
      path.push(route.depot)
      route.nodes.forEach(node => {
        path.push(node)
      })
      path.push(route.depot)
      const flightPath = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: COLOR[index],
        strokeOpacity: 1.0,
        strokeWeight: 2,
      })
      flightPath.setMap(this.map)
    })
    const marker = new window.google.maps.Marker({
      position: depot,
      map: this.map,
      label: {
        color: '#f04e44',
        fontWeight: 'bold',
        text: '0',
        fontSize: '11',
      },
      icon: {
        url: DEPOT_ICON,
        scaledSize: new google.maps.Size(22, 36),
        origin: new google.maps.Point(0, 0),
        labelOrigin: new google.maps.Point(11, 12),
      },
    })
    const infowindow = new google.maps.InfoWindow()
    google.maps.event.addListener(
      marker,
      'click',
      (function (marker) {
        return function () {
          infowindow.setContent('Hello depot')
          infowindow.open(this.map, marker)
        }
      }(marker)),
    )
    nodes.forEach((node, index) => {
      const marker = new window.google.maps.Marker({
        position: node,
        map: this.map,
        label: {
          color: '#44a3d3',
          fontWeight: 'bold',
          text: node?.invoice?.CustomerCode?.toString(),
          fontSize: '11',
        },
        icon: {
          url: NODE_ICON,
          scaledSize: new google.maps.Size(22, 36),
          origin: new google.maps.Point(0, 0),
          labelOrigin: new google.maps.Point(11, 12),
        },
      })
      const infowindow = new google.maps.InfoWindow()
      google.maps.event.addListener(
        marker,
        'click',
        (function (marker, index) {
          return function () {
            infowindow.setContent(`Hello ${node?.invoice?.CustomerName}`)
            infowindow.open(this.map, marker)
          }
        }(marker, index)),
      )
    })
  }

  render() {
    return (
      <div ref={this.setMap} style={{ width: '100%', height: 500, marginBottom: '10px' }} id="map" />
    )
  }
}

SolutionMap.propTypes = {
  data: PropTypes.object,
  mapConfig: PropTypes.object.isRequired,
}

SolutionMap.defaultProps = { data: {} }

export default ToJs(SolutionMap)
