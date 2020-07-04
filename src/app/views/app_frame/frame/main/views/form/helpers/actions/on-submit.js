import Bridge from '../../../../../../../../../utils/vertx/Bridge'
import debounce from 'lodash.debounce'

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms || 8000))
}

const onSubmit = ({ redirect, parentCode, rootCode, setLoading, setViewing }) => async ({
  ask,
  value,
}) => {
  const { questionCode, targetCode } = ask

  Bridge.sendFormattedEvent({
    code: questionCode,
    parentCode,
    rootCode,
    targetCode,
    eventType: 'BTN_CLICK',
    messageType: 'BTN',
    value,
  })

  setViewing({ view: 'LOADING' })
  setLoading('Saving...')

  if (typeof redirect === 'function') {
    redirect({ setViewing, setLoading })
  } else {
    setViewing({
      code: `QUE_PRI_EVENT_VIEW_${targetCode}`,
      parentCode: `QUE_${targetCode}_GRP`,
      rootCode: 'QUE_TABLE_RESULTS_GRP',
      targetCode,
      view: 'DETAIL',
    })
  }
}

const debouncedOnSubmit = debounce(onSubmit, 400)

export default debouncedOnSubmit
