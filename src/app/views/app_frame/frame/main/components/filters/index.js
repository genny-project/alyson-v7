import React from 'react'
import { map } from 'ramda'
import { Typography, Tooltip, Icon } from '@material-ui/core'
import { Col, Row } from '../layouts'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const Filters = ({
  filtersApplied,
  basicFilterOptions,
  advancedFilterOptions,
  basicFilterText = 'Basic Filter',
  advancedFilterText = 'Advanced Filter',
  onUpdate,
}) => {
  const { basicFilter, advancedFilters } = filtersApplied

  return (
    <Row>
      <Typography>{basicFilterText}</Typography>
      <ToggleButtonGroup
        value={basicFilter}
        exclusive
        onChange={onUpdate}
        aria-label="text alignment"
      >
        {map(({ icon, label, value }) => (
          <Tooltip title={label} key={value + 'tooltip'}>
            <ToggleButton value={value} key={value + 'button'}>
              <Icon key={value + 'icon'}>{icon}</Icon>
            </ToggleButton>
          </Tooltip>
        ))(basicFilterOptions || [])}
      </ToggleButtonGroup>
    </Row>
  )
}

export default Filters
