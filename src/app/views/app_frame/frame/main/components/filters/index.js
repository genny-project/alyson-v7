import React from 'react'
import { map } from 'ramda'
import { Typography, Tooltip, Icon, Divider, Button } from '@material-ui/core'
import { Col, Row } from '../layouts'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { Dropdown } from '../inputs'

const Filters = ({
  filtersApplied,
  basicFilterOptions,
  advancedFilterOptions,
  basicFilterText = 'Basic Filter',
  advancedFilterText = 'Advanced Filter',
  onUpdate,
  dropdowns,
  submit: { icon: submitIcon, label: submitLabel },
  submit,
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
      <Divider orientation="vertical" />
      {map(({ label, options }) => (
        <Dropdown label={label} options={options} onChange={onUpdate} />
      ))(dropdowns)}
      {submit ? (
        <Button startIcon={submitIcon} color="primary" variant="contained">
          {submitLabel}
        </Button>
      ) : (
        <div />
      )}
    </Row>
  )
}

export default Filters
