import React from 'react';
import { map, filter, compose, includes, prop, pickBy, values, last } from 'ramda';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Container,
} from '@material-ui/core';

import NavigationItem from './navigation_item';

import { getLinksFrom } from '../helpers/get-components';

import useStyles from './styles';

const MainSideBar = ({ items, asks, frames, user, agencyCompany, viewing, setViewing }) => {
  const components = compose(
    map( map( code => prop( code, asks ))),
    map( filter( includes( 'QUE' ))),
    map(({ code }) => getLinksFrom( code, frames ))
  )( items );

  const dropDowns = compose( pickBy(( val, key ) => includes( 'TREE', key )))( components );

  const dropDownComponents = values(
    map( items => (
      <NavigationItem
        key={`navItem${items[0].name}`}
        name={items[0].name}
        questionCode={items[0].questionCode}
        childAsks={items[0].childAsks}
        currentViewing={prop( 'code', viewing )}
        setViewing={setViewing}
      />
    ))( dropDowns )
  );

  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <Container className={classes.title}>
        <Typography variant="h6">
          {agencyCompany}
        </Typography>
      </Container>
      <List>
        {dropDownComponents}
      </List>
    </Drawer>
  );
};

export default MainSideBar;
