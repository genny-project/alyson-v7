import Bridge from '../../../../../../../../utils/vertx/Bridge';

const onUpdate = ({ ask, value }) => {
  const { attributeCode, questionCode, sourceCode, targetCode, weight } = ask;

  let finalValue = value;
  let finalAttributeCode = attributeCode;

  if ( attributeCode.indexOf( 'ADDRESS_FULL' ) !== -1 ) {
    finalAttributeCode = attributeCode.replace( 'ADDRESS_FULL', 'ADDRESS_JSON' );
  } else if ( attributeCode.indexOf( 'PRI_RATING' ) !== -1 ) {
    finalAttributeCode = 'PRI_RATING_RAW';
  }

  /* If the form is an object or an array, stringify it. */
  if ( typeof finalValue === 'object' || typeof finalValue === 'array' ) {
    finalValue = JSON.stringify( finalValue );
  }

  console.warn( 'form attempting to send answer:', {
    attributeCode: finalAttributeCode,
    sourceCode: sourceCode,
    targetCode: targetCode,
    code: questionCode,
    identifier: questionCode,
    weight: weight,
    value: finalValue,
  });

  Bridge.sendFormattedAnswer({
    attributeCode: finalAttributeCode,
    sourceCode: sourceCode,
    targetCode: targetCode,
    code: questionCode,
    identifier: questionCode,
    weight: weight,
    value: finalValue,
  });
};

export default onUpdate;
