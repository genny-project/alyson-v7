import React, { useState } from 'react';
import { map, length } from 'ramda';

import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';

import useStyles from './styles';

const NavigationItem = ({ childAsks, name, questionCode, currentViewing, setViewing }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const hasChildren = length(childAsks || []) >= 1;

  return (
    <div>
      <ListItem
        button
        onClick={hasChildren ? () => setOpen(!open) : () => setViewing({ code: questionCode })}
        className={classes.listItem}
      >
        <ListItemText
          secondary={name}
          secondaryTypographyProps={currentViewing === questionCode ? { color: 'primary' } : {}}
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
                  onClick={() => setViewing({ parentCode: questionCode, code: childCode })}
                >
                  <ListItemText
                    key={`nestedListItem${name}`}
                    secondary={name}
                    className={classes.nested}
                    secondaryTypographyProps={
                      currentViewing === childCode ? { color: 'primary' } : {}
                    }
                  />
                </ListItem>
              ),
              childAsks
            )}
          </List>
        </Collapse>
      ) : null}
    </div>
  );
};

export default NavigationItem;
