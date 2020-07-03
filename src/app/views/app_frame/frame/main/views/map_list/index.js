import React, { useState, useEffect, useRef } from 'react'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react'
import { map, forEach, pathOr, addIndex, length } from 'ramda'
import { Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import {
  getTable,
  getData,
  getActions,
  getWithAddressLatLon,
} from '../table/helpers/get-table-data'
import { Row, Col } from '../../components/layouts'
import ListItem from './list_item'
import Filters from '../../components/filters'
import DetailPane from './detail_pane'

import useStyles from './styles'

const MapList = ({
  currentSearch,
  setViewing,
  viewing,
  downloadLink,
  google,
  attributes,
  setLoading,
  apiKey: googleApiKey,
}) => {
  const [loadingPage, setLoadingPage] = useState(true)
  const [dataPoints, setDataPoints] = useState([])
  const [basicFilter, setBasicFilter] = useState('')
  const [currentDataPoint, setCurrentDataPoint] = useState(null)

  const table = getTable(currentSearch)
  const data = getData(table)
  const actions = getActions(table)

  const bounds = new google.maps.LatLngBounds()
  const singlePoint = new google.maps.LatLngBounds()

  if (currentDataPoint !== null) {
    const { lat, lng } = pathOr({}, ['geometry', 'location'], dataPoints[currentDataPoint])
    singlePoint.extend({ lat: lat(), lng: lng() })
  }

  forEach(point => {
    const { lat, lng } = pathOr({}, ['geometry', 'location'], point)
    bounds.extend({ lat: lat(), lng: lng() })
  }, dataPoints)

  const markers = map(({ PRI_NAME, PRI_ASSOC_HC, geometry: { location: { lat, lng } } }) => (
    <Marker
      key={PRI_NAME + 'marker'}
      title={PRI_NAME}
      name={PRI_ASSOC_HC}
      position={{ lat: lat(), lng: lng() }}
    />
  ))(dataPoints)

  const classes = useStyles({ anySelected: currentDataPoint !== null })

  useEffect(() => {
    setLoadingPage(true)
    getWithAddressLatLon({ data, setDataPoints, setLoadingPage })
  }, [])

  useEffect(
    () => {
      if (length(dataPoints) && currentDataPoint === null) setCurrentDataPoint(0)
    },
    [dataPoints],
  )

  return (
    <Col top left>
      <Row>
        <Button onClick={() => setViewing(viewing => ({ ...viewing, view: 'TABLE' }))}>
          {`Table View`}
        </Button>
        <Button disabled={currentDataPoint === null} onClick={() => setCurrentDataPoint(null)}>
          {`Clear Selection`}
        </Button>
      </Row>
      <Filters
        dropdowns={[
          { label: 'Choose a State', options: [{ label: 'Victoria', value: 'VIC' }] },
          { label: 'Choose an Industry', options: [] },
          { label: 'Choose a Sub-Industry', options: [] },
        ]}
        basicFilterOptions={[
          { value: 'distance', label: 'Distance', icon: 'straighten' },
          { value: 'industry', label: 'Industry', icon: 'domain' },
        ]}
        basicFilterText="Sort by"
        filtersApplied={{ basicFilter }}
        onUpdate={setBasicFilter}
        submit={{ icon: <SearchIcon />, label: 'Search' }}
      />
      <Row top spaceBetween spacing={0} wrap="noWrap" fullWidth>
        <Col stretch spacing={0} className={classes.itemsColumn} fullWidth>
          {addIndex(map)((item, idx) => (
            <ListItem
              key={'item' + item.PRI_NAME}
              {...item}
              setViewing={setViewing}
              actions={actions}
              viewing={viewing}
              attributes={attributes}
              setViewing={setViewing}
              setLoading={setLoading}
              googleApiKey={googleApiKey}
              currentDataPoint={currentDataPoint}
              setCurrentDataPoint={setCurrentDataPoint}
              idx={idx}
              first={idx === 0}
              last={idx === length(dataPoints) - 1}
            />
          ))(dataPoints)}
        </Col>
        <div className={classes.detailColumn}>
          <DetailPane
            dataPoints={dataPoints}
            currentDataPoint={currentDataPoint}
            viewing={viewing}
            attributes={attributes}
            setViewing={setViewing}
            setLoading={setLoading}
            googleApiKey={googleApiKey}
          />
        </div>
        <Col left top className={classes.mapColumn} fullWidth>
          <Map
            google={google}
            zoom={8}
            initialCenter={{
              lat: -37.8136,
              lng: 144.9631,
            }}
            containerStyle={{
              width: '30rem',
              height: '30rem',
            }}
            bounds={currentDataPoint !== null ? singlePoint : bounds}
            onReady={(mapProps, map) => {
              map.setOptions({
                maxZoom: 16,
              })
            }}
          >
            {markers}
          </Map>
        </Col>
      </Row>
    </Col>
  )
}

export default GoogleApiWrapper(({ apiKey }) => ({ apiKey }))(MapList)
