import React, { useState, useEffect } from 'react'
import { pathOr, identity, head } from 'ramda'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react'
import { geocodeByAddress } from 'react-google-places-autocomplete'
import { CircularProgress } from '@material-ui/core'

import useStyles from './styles'

const getGeo = async ({ address, setGeo }) => {
  const result = await geocodeByAddress(address)
  setGeo(head(result))
}

const StreetView = ({ address, google }) => {
  const [geo, setGeo] = useState(null)

  const classes = useStyles()

  useEffect(
    () => {
      getGeo({ address, setGeo })
    },
    [address],
  )

  if (geo) {
    return (
      <div className={classes.mapContainer}>
        <Map
          zoom={14}
          google={google}
          initialCenter={{
            lat: pathOr(identity, ['geometry', 'location', 'lat'], geo)(),
            lng: pathOr(identity, ['geometry', 'location', 'lng'], geo)(),
          }}
          style={{
            width: '30rem',
            height: '30rem',
          }}
          streetViewControl
          streetView
        >
          <Marker
            position={{
              lat: pathOr(identity, ['geometry', 'location', 'lat'], geo)(),
              lng: pathOr(identity, ['geometry', 'location', 'lng'], geo)(),
            }}
          />
        </Map>
      </div>
    )
  }
  return <CircularProgress />
}

export default GoogleApiWrapper(({ apiKey }) => ({ apiKey }))(StreetView)
