import Bridge from '../../../../../../../../utils/vertx/Bridge'
import { pathOr, replace } from 'ramda'

const getFormattedValue = value =>
  typeof value === 'object' || typeof value === 'array' ? JSON.stringify(value) : value

const helpBackendKeys = attributeCode =>
  attributeCode === 'ADDRESS_FULL'
    ? 'ADDRESS_JSON'
    : attributeCode === 'PRI_RATING'
      ? 'PRI_RATING_RAW'
      : attributeCode

const makeOnUpdate = ({ targetCode, user }) => ({ weight, code, value }) =>
  Bridge.sendFormattedAnswer({
    weight,
    attributeCode: helpBackendKeys(code),
    sourceCode: pathOr('', ['data', 'code'], user),
    targetCode,
    code: replace('PRI', 'QUE', code),
    value: getFormattedValue(value),
  })

export default makeOnUpdate
