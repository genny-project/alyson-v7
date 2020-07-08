import React, { useState, useEffect } from 'react'
import { GoogleApiWrapper, Map } from 'google-maps-react'
import { map, addIndex, length } from 'ramda'
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
import makeMarkers from './helpers/make-markers'
import extendBoundsFromData from './helpers/extend-bounds-from-data'

import useStyles from './styles'

const MapList = ({
  currentSearch,
  setViewing,
  viewing,
  google,
  attributes,
  setLoading,
  apiKey: googleApiKey,
}) => {
  const [dataPoints, setDataPoints] = useState([])
  const [basicFilter, setBasicFilter] = useState('')
  const [currentDataPoint, setCurrentDataPoint] = useState(null)

  const table = getTable(currentSearch)
  const data = getData(table)
  const actions = getActions(table)

  const bounds = new google.maps.LatLngBounds()

  useEffect(() => {
    getWithAddressLatLon({ data, setDataPoints })
  }, [])

  useEffect(
    () => {
      if (length(dataPoints) && currentDataPoint === null) {
        setCurrentDataPoint(0)
        extendBoundsFromData({ dataPoints, bounds })
      }
    },
    [dataPoints],
  )

  useEffect(
    () => {
      if (currentDataPoint !== null) {
        extendBoundsFromData({ bounds, dataPoints: [dataPoints[currentDataPoint]] })
      }
    },
    [currentDataPoint],
  )

  const classes = useStyles({ anySelected: currentDataPoint !== null })

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
            bounds={bounds}
            onReady={(mapProps, map) => {
              map.setOptions({
                maxZoom: 16,
              })
            }}
          >
            {makeMarkers(dataPoints)}
          </Map>
        </Col>
      </Row>
    </Col>
  )
}

export default GoogleApiWrapper(({ apiKey }) => ({ apiKey }))(MapList)
