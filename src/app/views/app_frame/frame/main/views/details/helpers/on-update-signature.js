import Bridge from '../../../../../../../../utils/vertx/Bridge'

const onUpdateSignature = ({
  signature,
  sourceCode,
  targetCode,
  questionCode,
  weight = 1,
  attributeCode,
  askId,
}) => {
  Bridge.sendFormattedAnswer({
    askId,
    attributeCode,
    sourceCode,
    targetCode,
    code: questionCode,
    identifier: questionCode,
    weight,
    value: signature,
  })
}

export default onUpdateSignature
