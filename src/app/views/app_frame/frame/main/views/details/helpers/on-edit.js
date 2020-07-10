import Bridge from '../../../../../../../../utils/vertx/Bridge'

const onEdit = ({ targetCode }) => {
  Bridge.sendFormattedEvent({
    code: targetCode,
    targetCode,
    eventType: 'BTN_CLICK',
    messageType: 'BTN',
  })
}

export default onEdit
