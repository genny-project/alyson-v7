import Bridge from '../../../../../../../../../utils/vertx/Bridge'

const getFormattedValue = value =>
  typeof value === 'object' || typeof value === 'string' ? JSON.stringify(value) : value

const makeOnUpdate = ({ setErrors, mandatory, setPristine }) => ({ ask, value }) => {
  const { askId, attributeCode, questionCode, sourceCode, targetCode, weight } = ask

  setPristine(false)
  setErrors(errors => ({ ...errors, [questionCode]: mandatory && !value }))

  let finalAttributeCode = attributeCode

  if (attributeCode.indexOf('ADDRESS_FULL') !== -1) {
    finalAttributeCode = attributeCode.replace('ADDRESS_FULL', 'ADDRESS_JSON')
  } else if (attributeCode.indexOf('PRI_RATING') !== -1) {
    finalAttributeCode = 'PRI_RATING_RAW'
  }

  Bridge.sendFormattedAnswer({
    askId,
    attributeCode: finalAttributeCode,
    sourceCode,
    targetCode,
    code: questionCode,
    identifier: questionCode,
    weight,
    value: getFormattedValue(value),
  })
}

export default makeOnUpdate
