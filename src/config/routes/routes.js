import React from 'react'
import * as Pages from '../../app/views/pages'

const routes = [
  {
    path: '/loading',
    exact: true,
    component: () => <div>{`Loading`}</div>,
  },
  {
    path: '/login',
    exact: true,
    component: Pages.Login,
  },
  {
    path: '/version',
    exact: true,
    component: Pages.Version,
  },
  {
    path: '*',
    component: Pages.Generic,
  },
]

export default routes
