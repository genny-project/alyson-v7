import Bridge from '../../../../../../../../utils/vertx/Bridge'
import debounce from 'lodash.debounce'

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms || 8000))
}
const onSubmit = ({ redirect, parentCode, rootCode, setLoading, setViewing }) => async ({
  ask,
  value,
}) => {
  const { attributeCode, questionCode, sourceCode, targetCode } = ask

  Bridge.sendFormattedEvent({
    code: questionCode,
    parentCode,
    rootCode,
    targetCode,
    eventType: 'BTN_CLICK',
    messageType: 'BTN',
    value,
  })

  setLoading('Saving...')

  setViewing({ view: 'LOADING' })

  if (typeof redirect === 'function') {
    redirect()
  } else {
    setViewing({
      view: 'BUCKET',
      code: `QUE_PRI_EVENT_VIEW_${targetCode}`,
      parentCode: `QUE_${targetCode}_GRP`,
      rootCode: 'QUE_TABLE_RESULTS_GRP',
      targetCode,
    })
  }
}

export default onSubmit
