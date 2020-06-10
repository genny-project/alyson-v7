import React from 'react';
import { map, filter, compose, includes, prop, pickBy, values, path, head } from 'ramda';
import { Drawer, List, Typography, Container } from '@material-ui/core';
import Image from 'material-ui-image';

import NavigationItem from './navigation_item';

import { getLinksFrom } from '../helpers/get-components';

import { getIsMobile } from '../utils';

import useStyles from './styles';

const MainSideBar = ({ items, asks, frames, viewing, setViewing, attributes, open, setOpen }) => {
  const components = compose(
    map(map(code => prop(code, asks))),
    map(filter(includes('QUE'))),
    map(({ code }) => getLinksFrom(code, frames))
  )(items);

  const targetCode = path(['FRM_LOGO', 0, 'targetCode'], components);

  if (!targetCode) {
    return <div />;
  }

  const logoUrl = path([targetCode, 'PRI_LOGO', 'value', 0, 'uploadURL'], attributes);
  const title = path([targetCode, 'PRI_NAME', 'value'], attributes);
  const poweredBy = path([targetCode, 'PRI_POWERED_BY', 'value'], attributes);

  const classes = useStyles();

  const dropDowns = compose(pickBy((val, key) => includes('TREE', key)))(components);

  const dropDownComponents = values(
    map(items => (
      <NavigationItem
        key={`navItem${prop('name', head(items || []) || {})}`}
        name={prop('name', head(items || []) || {})}
        questionCode={prop('questionCode', head(items || []) || {})}
        childAsks={prop('childAsks', head(items || []) || {})}
        currentViewing={prop('code', viewing)}
        setViewing={setViewing}
      />
    ))(dropDowns)
  );

  return (
    <Drawer
      variant={getIsMobile() ? 'temporary' : 'permanent'}
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      open={open}
      onClose={() => setOpen(false)}
      ModalProps={{ keepMounted: true }}
    >
      {logoUrl ? (
        <Container className={classes.title}>
          <Image src={logoUrl} className={classes.logo} disableSpinner />
        </Container>
      ) : null}

      <Container className={classes.title}>
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
      </Container>
      <List>{dropDownComponents}</List>
      <div className={classes.grow} />
      <Container className={classes.poweredBy}>
        <Typography variant="caption">{'Powered By'}</Typography>
      </Container>
      <Container className={classes.poweredName}>
        <Typography variant="caption">{poweredBy}</Typography>
      </Container>
    </Drawer>
  );
};

export default MainSideBar;
