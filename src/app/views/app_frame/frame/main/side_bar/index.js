import React from 'react'
import {
  map,
  filter,
  compose,
  includes,
  prop,
  pickBy,
  values,
  path,
  head,
  length,
  sortBy,
} from 'ramda'
import { Drawer, List, Typography, Container } from '@material-ui/core'
import Image from 'material-ui-image'

import NavigationItem from './navigation_item'

import { getLinksFrom } from '../helpers/get-components'

import { getIsMobile } from '../utils'

import useStyles from './styles'

const MainSideBar = ({
  projectName,
  items,
  asks,
  frames,
  viewing,
  setViewing,
  attributes,
  open,
  setOpen,
}) => {
  const components = compose(
    map(map(code => prop(code, asks))),
    map(filter(includes('QUE'))),
    map(({ code }) => getLinksFrom(code, frames)),
  )(items)

  const targetCode = path(['FRM_LOGO', 0, 'targetCode'], components)

  if (!targetCode) {
    return <div />
  }

  const logoUrl = path([targetCode, 'PRI_LOGO', 'value'], attributes)
  const title = path([targetCode, 'PRI_NAME', 'value'], attributes)
  const poweredBy = path([targetCode, 'PRI_POWERED_BY', 'value'], attributes)

  const classes = useStyles({ projectName })

  const dropDowns = compose(
    sortBy(prop('childAsks')),
    map(head),
    values,
    pickBy((val, key) => includes('TREE', key)),
  )(components)

  const dropDownComponents = map(dropDown => {
    const { name, questionCode, childAsks } = dropDown || {}

    return (
      <NavigationItem
        key={`navItem${name}`}
        name={name}
        questionCode={questionCode}
        childAsks={childAsks}
        currentViewing={prop('code', viewing)}
        setViewing={setViewing}
      />
    )
  })(dropDowns)

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
      <List>{dropDownComponents}</List>
      <div className={classes.grow} />
      <Container className={classes.poweredBy}>
        <Typography variant="caption" color="inherit">
          {'Powered By'}
        </Typography>
      </Container>
      <Container className={classes.poweredName}>
        <Typography variant="caption" color="inherit">
          {poweredBy}
        </Typography>
      </Container>
    </Drawer>
  )
}

export default MainSideBar
