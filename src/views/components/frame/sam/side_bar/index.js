import React from 'react';
import { map, filter, compose, includes, prop, pickBy, values, path } from 'ramda';
import { Grid, Drawer, List, Typography, Container } from '@material-ui/core';
import Image from 'material-ui-image';

import NavigationItem from './navigation_item';

import { getLinksFrom } from '../helpers/get-components';

import { getIsMobile } from '../utils';

import useStyles from './styles';

const MainSideBar = ({ items, asks, frames, viewing, setViewing, attributes, open, setOpen }) => {
  const components = compose(
    map( map( code => prop( code, asks ))),
    map( filter( includes( 'QUE' ))),
    map(({ code }) => getLinksFrom( code, frames ))
  )( items );

  const dropDowns = compose( pickBy(( val, key ) => includes( 'TREE', key )))( components );

  const dropDownComponents = values(
    map(
      items =>
        console.log( items ) || (
          <NavigationItem
            key={`navItem${items[0].name}`}
            name={items[0].name}
            questionCode={items[0].questionCode}
            childAsks={items[0].childAsks}
            currentViewing={prop( 'code', viewing )}
            setViewing={setViewing}
          />
        )
    )( dropDowns )
  );

  const { targetCode } = components.FRM_LOGO[0];
  const logoUrl = path( [targetCode, 'PRI_LOGO', 'value'], attributes )[0].uploadURL;
  const title = path( [targetCode, 'PRI_NAME', 'value'], attributes );
  const poweredBy = path( [targetCode, 'PRI_POWERED_BY', 'value'], attributes );

  const classes = useStyles();

  return (
    <Drawer
      variant={getIsMobile() ? 'temporary' : 'permanent'}
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      open={open}
      onClose={() => setOpen( false )}
      keepMounted
    >
      <Container className={classes.title}>
        <Image
          src={logoUrl}
          className={classes.logo}
        />
      </Container>
      <Container className={classes.title}>
        <Typography
          variant="h6"
          color="primary"
        >
          {title}
        </Typography>
      </Container>
      <List>
        {dropDownComponents}
      </List>
      <div className={classes.grow} />
      <Container className={classes.poweredBy}>
        <Typography variant="caption">
          {'Powered By'}
        </Typography>
      </Container>
      <Container className={classes.poweredName}>
        <Typography variant="caption">
          {poweredBy}
        </Typography>
      </Container>
    </Drawer>
  );
};

export default MainSideBar;
