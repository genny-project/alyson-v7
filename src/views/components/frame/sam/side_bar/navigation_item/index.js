import React, { useState } from 'react';
import { map, length } from 'ramda';

import { List, ListItem, ListItemText, Collapse, ClickAwayListener } from '@material-ui/core';

import useStyles from './styles';

const NavigationItem = ({ childAsks, name, questionCode, currentViewing, setViewing }) => {
  const [open, setOpen] = useState( false );

  const classes = useStyles();

  const hasChildren = length( childAsks || [] ) >= 1;

  return (
    <ClickAwayListener onClickAway={() => setOpen( false )}>
      <div>
        <ListItem
          button
          onClick={hasChildren ? () => setOpen( !open ) : () => setViewing({ code: questionCode })}
          className={classes.listItem}
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
          <Collapse
            in={open}
            timeout="auto"
          >
            <List
              component="div"
              disablePadding
            >
              {map(
                ({ name, questionCode: childCode }) => (
                  <ListItem
                    key={`listItem${childCode}`}
                    className={classes.listItem}
                    button
                    onClick={() => setViewing({ parentCode: questionCode, code: childCode })}
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
                childAsks
              )}
            </List>
          </Collapse>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default NavigationItem;
