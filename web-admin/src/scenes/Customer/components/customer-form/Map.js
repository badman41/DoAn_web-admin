/* global google */
import React from 'react'
import PropTypes from 'prop-types'
import './map.css'

class Map extends React.Component {
  componentDidMount() {
    if (!window.google) {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyDzLbJ_SCH48RgPzJPmjsQxAAfXstxch-g&libraries=places'
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
    const map = new google.maps.Map(document.getElementById('map'), {
      center: this.props.center,
      zoom: 13,
    })
    const card = document.getElementById('pac-card')
    const input = document.getElementById('pac-input')

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card)

    const autocomplete = new google.maps.places.Autocomplete(input)

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map)

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name'],
    )

    const infowindow = new google.maps.InfoWindow()
    const infowindowContent = document.getElementById('infowindow-content')
    infowindow.setContent(infowindowContent)
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    })

    autocomplete.addListener('place_changed', () => {
      infowindow.close()
      marker.setVisible(false)
      const place = autocomplete.getPlace()
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert(`No details available for input: '${place.name}'`)
        return
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location)
        map.setZoom(17) // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location)
      marker.setVisible(true)

      let address = ''
      if (place.address_components) {
        address = [
          (place.address_components[0] && (place.address_components[0].short_name || '')),
          (place.address_components[1] && (place.address_components[1].short_name || '')),
          (place.address_components[2] && (place.address_components[2].short_name || '')),
        ].join(' ')
      }
      this.props.onSearch(place.geometry.location.toJSON(), place.address_components)

      infowindowContent.children['place-icon'].src = place.icon
      infowindowContent.children['place-name'].textContent = place.name
      infowindowContent.children['place-address'].textContent = address
      infowindow.open(map, marker)
    })
  }

  render() {
    return (
      <div>
        <div className="pac-card" id="pac-card">
          <div>
            <div id="title">
              {'Địa chỉ khách hàng'}
            </div>
          </div>
          <div id="pac-container">
            <input
              style={{ marginTop: 10 }}
              id="pac-input"
              type="text"
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>
        <div id="map" />
        <div id="infowindow-content">
          <img alt="content" src="" width="16" height="16" id="place-icon" />
          <span id="place-name" className="title" />
          <br />
          <span id="place-address" />
        </div>
      </div>
    )
  }
}

Map.propTypes = {
  onSearch: PropTypes.func.isRequired,
  center: PropTypes.object,
}

Map.defaultProps = { center: {} }

export default Map
