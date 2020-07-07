import React from 'react'
import useStyles from './styles'
import { Row } from '../../../components/layouts'
import { map, filter } from 'ramda';

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

const Card = ({icon, header, body, side, isLast, viewInternships, status }) => {

  const classes = useStyles(status)

  console.error('status', status)

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
                <Row left={side==='right'} right={side==='left'}>
                  { side === 'right'
                    ? status
                      ? <CheckBoxOutlinedIcon className={classes.greenCheck}/>
                      : <CheckBoxOutlineBlankOutlinedIcon className={classes.greyCheck}/>
                    : null }
                    <Button color="inherit" onClick={redirect ? viewInternships : () => console.log('nothing')}>
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
