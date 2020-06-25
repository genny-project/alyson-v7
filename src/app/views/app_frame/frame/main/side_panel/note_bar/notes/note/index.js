import React, { useState } from 'react'

import { pathOr } from 'ramda'
import DateFnsAdapter from '@date-io/date-fns'
import { Row, Col } from '../../../../components/layouts'
import {
  Card,
  CardHeader,
  Collapse,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  Popper,
  ButtonGroup,
} from '@material-ui/core'
import useStyles from './styles'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import VisibilityIcon from '@material-ui/icons/Visibility'

const Note = ({
  content,
  sourceCode,
  id,
  tags,
  created,
  removeNotes,
  baseEntities,
  targetCode,
  attributes,
}) => {
  const [hover, setHover] = useState(false)
  const dateFns = new DateFnsAdapter()
  const name = baseEntities[sourceCode].name
  const profileImage = pathOr('', [targetCode, 'PRI_IMAGE_URL', 'value'], attributes)

  const classes = useStyles({ hover })

  return (
    <div onMouseEnter={event => setHover(event.currentTarget)} onMouseLeave={() => setHover(false)}>
      <Row justify="flex-start" className={classes.cardContainer}>
        <Avatar variant="rounded" src={profileImage} />
        <Col alignItems="flex-start" spacing={0}>
          <Row justify="flex-start">
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{`${dateFns.format(created, 'p')}`}</Typography>
          </Row>
          <Typography variant="body2">{content}</Typography>
        </Col>
        <Popper open={!!hover} anchorEl={hover} placement="top-end" className={classes.popper}>
          <Card className={classes.buttonGroup}>
            <ButtonGroup color="primary" size="small">
              <Button>{`1`}</Button>
              <Button>{`2`}</Button>
              <Button>{`3`}</Button>
            </ButtonGroup>
          </Card>
        </Popper>
      </Row>
    </div>
  )
}

export default Note
