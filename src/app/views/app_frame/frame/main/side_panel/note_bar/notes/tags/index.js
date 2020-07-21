import React from 'react'
import { map, toUpper, compose, replace, concat } from 'ramda'
import { Chip, Icon, Typography, Tooltip, Avatar } from '@material-ui/core'
import { Row, Col } from '../../../../components/layouts'
import generateTag from '../helpers/generate-tag'

import useStyles from './styles'

const Tags = ({ onSelect, userTags }) => {
  const classes = useStyles()

  return (
    <Col top left>
      <Typography className={classes.tagInfo}>{`Select a tag to submit`}</Typography>
      <Row>
        {map(
          ({ value, name, icon, label }) => (
            <Tooltip title={name} placement="top">
              <Chip
                label={label}
                icon={<Avatar variant="rounded" className={classes.small}>{icon || 'done'}</Avatar>}
                onClick={() => onSelect(generateTag({name, value}))}
                color="primary"
              />
            </Tooltip>
          ),
          userTags,
        )}
      </Row>
    </Col>
  )
}
export default Tags
