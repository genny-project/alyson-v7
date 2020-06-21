import React from 'react';
import { map, prop } from 'ramda';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';

const GoogleAutocompleteSuggestions = ({ suggestions, onSelectSuggestion, active }) => (
  <List>
    {map( suggestion => (
      <ListItem
        key={`item${suggestion.description}`}
        button
        onClick={event => onSelectSuggestion( suggestion, event )}
      >
        <ListItemIcon key={`icon${suggestion.description}`}>
          <RoomIcon
            color="inherit"
            key={`iconRoom${suggestion.description}`}
          />
        </ListItemIcon>
        <ListItemText
          key={`text${suggestion.description}`}
          primary={prop( 'description', suggestion )}
        />
      </ListItem>
    ))( suggestions )}
  </List>
);

export default GoogleAutocompleteSuggestions;
