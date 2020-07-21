import React from 'react'
import { map } from 'ramda'
import { Chip, Icon, Typography, Tooltip, Avatar } from '@material-ui/core'
import { Row, Col } from '../../../../components/layouts'

import useStyles from './styles'

const generatetag = name => {
  return {
    name: `TAG_${name.replace(/ /g,"_").toUpperCase()}`,
    value: 1
  }
}

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
                onClick={() => onSelect(generatetag(name))}
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
