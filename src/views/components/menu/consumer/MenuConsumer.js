import React from 'react';
import MenuContext from '../context';

export default props => (
  <MenuContext.Consumer {...props} />
);
