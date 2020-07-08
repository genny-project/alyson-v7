import React from 'react'
import { map } from 'ramda'
import { Marker } from 'google-maps-react'

const makeMarkers = map(({ PRI_NAME, PRI_ASSOC_HC, geometry: { location: { lat, lng } } }) => (
  <Marker
    key={PRI_NAME + 'marker'}
    title={PRI_NAME}
    name={PRI_ASSOC_HC}
    position={{ lat: lat(), lng: lng() }}
  />
))

export default makeMarkers
