import React, { useState } from 'react'
import { map } from 'ramda'
import { IconButton, Icon, Typography, Collapse, ClickAwayListener } from '@material-ui/core'
import { Col, Row } from '../../../components/layouts'
import { makeActionData, getIcon } from '../../table/helpers/get-table-data'
import Details from '../../details'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import useStyles from './styles'

const ListItem = ({
  PRI_NAME,
  PRI_ASSOC_HC,
  targetCode,
  actions,
  setViewing,
  viewing,
  attributes,
  setLoading,
  googleApiKey,
}) => {
  const [expand, setExpand] = useState(false)

  const classes = useStyles({ expand })

  return (
    <div>
      <ClickAwayListener onClickAway={() => setExpand(false)}>
        <div>
          <Col top stretch className={classes.card}>
            <Row spaceBetween>
              <Row>
                <Typography>{PRI_ASSOC_HC}</Typography>
                <Typography>{PRI_NAME}</Typography>
              </Row>
              <Row>
                {map(({ attributeCode, attributeName }) => (
                  <IconButton
                    onClick={() => setViewing(makeActionData({ attributeCode, targetCode }))}
                  >
                    <Icon>{getIcon(attributeName)}</Icon>
                  </IconButton>
                ))(actions || [])}
                <IconButton onClick={() => setExpand(!expand)}>
                  <ExpandMoreIcon className={classes.expand} />
                </IconButton>
              </Row>
            </Row>
            <Collapse in={expand}>
              <Details
                attributes={attributes}
                targetCode={targetCode}
                setViewing={setViewing}
                setLoading={setLoading}
                viewing={viewing}
                googleApiKey={googleApiKey}
                mini
              />
            </Collapse>
          </Col>
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default ListItem
