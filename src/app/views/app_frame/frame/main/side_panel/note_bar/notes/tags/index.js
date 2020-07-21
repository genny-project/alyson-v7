import React from 'react'
import { map, toUpper, compose, replace, concat } from 'ramda'
import { Chip, Icon, Typography, Tooltip, Avatar } from '@material-ui/core'
import { Row, Col } from '../../../../components/layouts'
import generateTag from '../helpers/generate-tag'

import useStyles from './styles'

const Tags = ({ onSelect, userTags }) => {
  const classes = useStyles()

  return (
    <Col top left className={classes.tagInfo}>
      <Typography variant='subtitle1'>{`Select a tag to submit`}</Typography>
      <Row left wrap>
        {map(
          ({ value, name, icon, label }) => (
            <Tooltip title={name} placement="top">
              <Chip
                label={label}
                onClick={() => onSelect(generateTag({name, value}))}
                className={classes.chip}
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
