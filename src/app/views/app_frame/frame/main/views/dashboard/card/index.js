import React from 'react'
import { map, filter } from 'ramda';
import { nanoid } from 'nanoid'

import { Row } from '../../../components/layouts'
import useStyles from './styles'

import { Paper, Typography, Button } from '@material-ui/core'
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@material-ui/lab'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'

const Card = ({icon, header, body, side, isLast, viewInternships, status, setViewing, parentCode, code }) => {

  const classes = useStyles(status)

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot className={classes.iconColor}>
          {icon}
        </TimelineDot>
         { !isLast ? <TimelineConnector className={classes.green} /> : null}
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="h1">
            {header}
          </Typography>
            <Typography>
              {map(({content, status, redirect}) =>
                <Row left={side==='right'} right={side==='left'} key={nanoid()}>
                  { side === 'right'
                    ? status
                      ? <CheckBoxOutlinedIcon className={classes.greenCheck}/>
                      : <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck}/>
                    : null }
                    <Button color="inherit" onClick={ () => setViewing({code: code, parentCode:parentCode, view: 'FORM'})}>
                      {content}
                    </Button>
                  { side === 'left'
                    ? status
                      ? <CheckBoxOutlinedIcon className={classes.greenCheck} />
                      : <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck}/>
                    : null }
                </Row>, body)}
            </Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  )
}

export default Card
