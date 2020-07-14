import { includes } from 'ramda'

const DEFAULT_ERROR_MSG = 'Sorry there was a problem communicating with the server.'

const formatError = errorMsg => {
  if ( typeof errorMsg === 'string' ) {
    return includes( '500', errorMsg ) ? DEFAULT_ERROR_MSG : DEFAULT_ERROR_MSG
  }
  return DEFAULT_ERROR_MSG
}

export default formatError
