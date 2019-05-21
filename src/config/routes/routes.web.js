// import React from 'react';
import * as Pages from '../../views/pages';
import Checkbox from '../../views/components/input/checkbox-5';

const routes = [
  {
    path: '/logout',
    exact: true,
    component: Pages.Logout,
  },
  {
    path: '/loading',
    exact: true,
    component: Pages.Loading,
  },
  {
    path: '/login',
    exact: true,
    component: Pages.Login,
  },
  {
    path: '/register',
    exact: true,
    component: Pages.Register,
  },
  {
    path: '/registration',
    exact: true,
    component: Pages.Register,
  },
  {
    path: '/test',
    exact: true,
    component: Checkbox,
  },
  {
    path: '*',
    component: Pages.Generic,
  },
];

export default routes;
