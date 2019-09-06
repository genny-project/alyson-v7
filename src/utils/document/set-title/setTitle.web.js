import { isString } from '../../../utils';

const setTitle = ( value ) => {
  if (
    typeof document !== 'undefined' &&
    isString( value, { ofMinLength: 1 })
  ) {
    document.title = value;
  }
};

export default setTitle;
