import React, { useState } from 'react'
import { map, length } from 'ramda'
import { Tooltip, Icon, Grid } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

import useStyles from '../styles'

const Actions = ({ actions, data }) => {
  const [show, setShow] = useState(false)

  const { targetCode } = data || {}

  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)

  const classes = useStyles()

  return length(actions) ? (
    length(actions) === 1 ? (
      map(({ icon, onClick, tooltip }) => (
        <Tooltip title={tooltip} key={'tooltipActions' + icon}>
          <Icon
            color="action"
            key={'iconActions' + icon}
            className={classes.button}
            onClick={() => onClick({ targetCode })}
          >
            {icon}
          </Icon>
        </Tooltip>
      ))(actions)
    ) : (
      <div onMouseEnter={handleShow} onMouseLeave={handleHide}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
          {show ? (
            map(
              ({ icon, onClick, tooltip }) => (
                <Grid item key={'gridActions' + icon}>
                  <Tooltip title={tooltip} key={'tooltipActions' + icon}>
                    <Icon
                      color="action"
                      key={'iconActions' + icon}
                      className={classes.button}
                      onClick={() => onClick({ targetCode })}
                    >
                      {icon}
                    </Icon>
                  </Tooltip>
                </Grid>
              ),
              actions || [],
            )
          ) : (
            <Grid item>
              <InfoIcon color="action" className={classes.moreIcon} />
            </Grid>
          )}
        </Grid>
      </div>
    )
  ) : (
    <div />
  )
}

export default Actions
