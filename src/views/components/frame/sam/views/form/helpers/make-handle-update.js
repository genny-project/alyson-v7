import { all, test, filter, identity } from 'ramda';

const handleUpdate = onUpdate => (
  {
    id: askId,
    attributeCode,
    question: {
      code: questionCode,
      attribute: {
        dataType: { validationList },
      },
    },
    sourceCode,
    targetCode,
    weight,
  },
  setErrors
) => value =>
  all(({ regex }) => test( new RegExp( regex ), value ))( filter( identity, validationList || [] ))
    ? onUpdate({
      ask: {
        askId,
        attributeCode,
        questionCode,
        sourceCode,
        targetCode,
        weight,
      },
      value,
    })
    : setErrors( errors => ({ ...errors, [questionCode]: true }));

export default handleUpdate;
