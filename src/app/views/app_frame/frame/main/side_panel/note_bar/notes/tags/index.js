import React from 'react'
import { map } from 'ramda'
import { Chip, Icon, Typography } from '@material-ui/core'
import { Row, Col } from '../../../../components/layouts'

import useStyles from './styles'

const Tags = ({ onSelect, userTags }) => {
  const classes = useStyles()

  return (
    <Col top left>
      <Typography className={classes.tagInfo}>{`Select a tag to submit`}</Typography>
      <Row>
        {map(
          ({ value, name, icon }) => (
            <Chip
              label={name}
              icon={<Icon>{icon || 'done'}</Icon>}
              onClick={() => onSelect(name)}
              color="primary"
            />
          ),
          userTags,
        )}
      </Row>
    </Col>
  )
}
export default Tags
