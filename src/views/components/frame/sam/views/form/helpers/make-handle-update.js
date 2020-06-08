import { all, test, filter, identity } from 'ramda';
import debounce from 'lodash.debounce';

const getDebouncedUpdate = onUpdate => debounce(onUpdate, 400);

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
) => {
  const debouncedUpdate = getDebouncedUpdate(onUpdate);

  return value =>
    all(({ regex }) => test(new RegExp(regex), value))(filter(identity, validationList || []))
      ? debouncedUpdate({
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
      : setErrors(errors => ({ ...errors, [questionCode]: true }));
};

export default handleUpdate;
