import Bridge from '../../../../../../../../utils/vertx/Bridge'
import { includes, keys, compose, find, replace } from 'ramda'

const getType = compose(
  type => `QUE_EDIT_${type}_GRP`,
  replace('PRI_IS_', ''),
  find(includes('PRI_IS_')),
  keys,
)

const makeOnEdit = ({ detailView, setViewing, targetCode }) => () => {
  Bridge.sendFormattedEvent({
    parentCode: 'QUE_EDIT_ITEMS_GRP',
    rootCode: 'QUE_EDIT_ITEMS_GRP',
    code: getType(detailView),
    targetCode,
    name: 'Edit',
    attributeCode: 'QQQ_QUESTION_GROUP',
    eventType: 'BTN_CLICK',
    messageType: 'BTN',
  })

  setViewing({ view: 'FORM' })
}

export default makeOnEdit
