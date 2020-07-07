import React, { useState } from 'react'
import { map, length, split, head, toUpper, compose, includes } from 'ramda'

import { List, ListItem, ListItemText, Collapse, ClickAwayListener } from '@material-ui/core'

import useStyles from './styles'

const getViewName = compose(
  toUpper,
  head,
  split(' '),
)

const NavigationItem = ({ childAsks, name, questionCode, currentViewing, setViewing }) => {
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const hasChildren = length(childAsks || []) >= 1

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div>
        <ListItem
          button
          onClick={
            hasChildren
              ? () => setOpen(!open)
              : () => setViewing({ view: getViewName(name), code: questionCode })
          }
          test-id={`${questionCode}`}
          className={classes.listItem}
          color="inherit"
        >
          <ListItemText
            primary={name}
            primaryTypographyProps={{
              color: currentViewing === questionCode ? 'primary' : 'inherit',
              className: classes.mainText,
            }}
          />
        </ListItem>
        {hasChildren ? (
          <Collapse in={open} timeout="auto">
            <List component="div" disablePadding>
              {map(
                ({ name, questionCode: childCode }) => (
                  <ListItem
                    key={`listItem${childCode}`}
                    className={classes.listItem}
                    button
                    onClick={() =>
                      setViewing({
                        view: includes('STT_SCENARIO', childCode) ? 'UNITY' : 'TABLE',
                        parentCode: questionCode,
                        code: childCode,
                      })
                    }
                    test-id={`${childCode}`}
                  >
                    <ListItemText
                      key={`nestedListItem${name}`}
                      secondary={name}
                      secondaryTypographyProps={{
                        color: currentViewing === childCode ? 'primary' : 'inherit',
                        style: { fontWeight: currentViewing === childCode ? 500 : 400 },
                        className: classes.secondaryText,
                      }}
                    />
                  </ListItem>
                ),
                childAsks,
              )}
            </List>
          </Collapse>
        ) : null}
      </div>
    </ClickAwayListener>
  )
}

export default NavigationItem
