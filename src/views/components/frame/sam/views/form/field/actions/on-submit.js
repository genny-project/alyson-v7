import Bridge from '../../../../../../../../utils/vertx/Bridge';

const onSubmit = ({ parentCode, rootCode }) => ({ ask, value }) => {
  const { attributeCode, questionCode, sourceCode, targetCode } = ask;

  Bridge.sendFormattedEvent({
    code: questionCode,
    parentCode,
    rootCode,
    targetCode,
    eventType: 'BTN_CLICK',
    messageType: 'BTN',
    value,
  });
};

export default onSubmit;
