import React, { useState } from 'react'
import { map, length } from 'ramda'
import { Row } from '../../../components/layouts'
import { Tooltip, Icon } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

import useStyles from '../styles'

const Actions = ({ actions, data }) => {
  const [show, setShow] = useState(false)

  const { targetCode } = data || {}

  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)

  const classes = useStyles({ show })

  return length(actions) ? (
    length(actions) === 1 ? (
      map(({ icon, onClick, tooltip }) => (
        <Tooltip title={tooltip} key={'tooltipActions' + icon}>
          <Icon
            color="action"
            key={'iconActions' + icon}
            className={classes.button}
            onClick={() => onClick({ targetCode })}
            test-id={targetCode}
          >
            {icon}
          </Icon>
        </Tooltip>
      ))(actions)
    ) : (
      <div onMouseEnter={handleShow} onMouseLeave={handleHide}>
        <Row className={classes.multiAction} justify="flex-start" wrap="nowrap">
          {show ? (
            map(
              ({ icon, onClick, tooltip }) => (
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
              ),
              actions || [],
            )
          ) : (
            <InfoIcon color="action" className={classes.moreIcon} />
          )}
        </Row>
      </div>
    )
  ) : (
    <div />
  )
}

export default Actions
