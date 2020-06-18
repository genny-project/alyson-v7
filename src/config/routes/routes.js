// import React from 'react';
import * as Pages from '../../views/pages'

const routes = [
  {
    path: '/loading',
    exact: true,
    component: () => <div>{`loading`}</div>,
  },
  {
    path: '/login',
    exact: true,
    component: Pages.Login,
  },
  {
    path: '/version',
    exact: true,
    component: () => <div>{`version`}</div>,
  },
  {
    path: '*',
    component: Pages.Generic,
  },
]

export default routes
