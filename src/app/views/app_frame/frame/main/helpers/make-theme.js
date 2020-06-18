import { path } from 'ramda';
import { createMuiTheme } from '@material-ui/core';

import getProjectKey from './get-project-key';

const makeTheme = ({ attributes, asks }) =>
  createMuiTheme({
    palette: {
      primary: {
        main: path( [getProjectKey( asks ), 'PRI_COLOR_PRIMARY', 'value'], attributes ) || '#2196f3',
      },
    },
  });

export default makeTheme;
