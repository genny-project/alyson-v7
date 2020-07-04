import Bridge from '../../../../../../../../../utils/vertx/Bridge'
import { isEmpty, all, test, filter, identity } from 'ramda'

const getFormattedValue = value =>
  typeof value === 'object' || typeof value === 'array' ? JSON.stringify(value) : value

const helpBackendKeys = attributeCode =>
  attributeCode === 'ADDRESS_FULL'
    ? 'ADDRESS_JSON'
    : attributeCode === 'PRI_RATING'
      ? 'PRI_RATING_RAW'
      : attributeCode

const makeOnUpdate = ({ setErrors, mandatory = false, setPristine, fieldData, setTouched }) => ({
  value,
}) => {
  const {
    id: askId,
    attributeCode,
    sourceCode,
    targetCode,
    weight,
    question: {
      code: questionCode,
      attribute: {
        dataType: { validationList },
      },
    },
  } = fieldData

  setPristine(false)
  setTouched(touched => ({ ...touched, [questionCode]: true }))
  setErrors(errors => ({ ...errors, [questionCode]: mandatory && isEmpty(value) }))

  if (all(({ regex }) => test(new RegExp(regex), value))(filter(identity, validationList || []))) {
    Bridge.sendFormattedAnswer({
      askId,
      attributeCode: helpBackendKeys(attributeCode),
      sourceCode,
      targetCode,
      code: questionCode,
      identifier: questionCode,
      weight,
      value: getFormattedValue(value),
    })
  } else {
    setErrors(errors => ({ ...errors, [questionCode]: true }))
  }
}

export default makeOnUpdate
