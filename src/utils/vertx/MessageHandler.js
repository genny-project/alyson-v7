import { saveAs } from 'file-saver'
import {
  prefixedLog,
  isArray,
  isObject,
  isString,
  Api,
  removeSubstring,
  isDevMode,
} from '../../utils'
import { store } from '../../redux'
import * as events from './events'

class MessageHandler {
  constructor() {
    this.log = prefixedLog('MessageHandler')
    this.lastBe = new Date().getTime()
    this.beBatch = []
    this.dispatchHistory = []

    setInterval(this.checkMessageBatch, 200)
    // setInterval( this.checkDispatchHistory, 500 );
  }

  validMessageTypes = ['DATA_MSG', 'CMD_MSG', 'EVT_MSG']

  eventTypes = {
    DATA_MSG: 'data_type',
    CMD_MSG: 'cmd_type',
    EVT_MSG: 'event_type',
  }

  checkMessageBatch = () => {
    if (this.beBatch.length > 0 && new Date().getTime() - this.lastBe > 200) {
      this.drainMessageBatch()
    }
  }

  removeMessageFromDispatcHistory = message => {
    this.dispatchHistory = this.dispatchHistory.filter(item => item.msg_id !== message.msg_id)
  }

  addMessageToDispatchHistory = message => {
    this.dispatchHistory.push(message)

    setTimeout(() => {
      this.removeMessageFromDispatcHistory(message)
    }, 5000)
  }

  drainMessageBatch = () => {
    // console.log( 'this.beBatch ', this.beBatch.length, JSON.stringify({ batch: this.beBatch }));

    const message = this.beBatch.reduce(this.handleReduceMessageBatch, this.beBatch[0])

    // console.log( 'drain message', message ); // eslint-disable-line

    store.dispatch(message)

    if (message.is_cached_message) {
      this.addMessageToDispatchHistory(message)
    }

    this.beBatch = []
  }

  handleReduceMessageBatch = (output, current) => {
    /**
     * If the message has an aliasCode process it individually.
     * Additionally don't apply this to aliasCodes that match
     * the parentCode as this eliminates a large number of
     * individual messages, increasing performance.
     */
    if (current.payload.aliasCode && current.payload.aliasCode !== current.payload.parentCode) {
      const message = {
        ...current,
        links: current.questions ? current.links.concat(current.questions) : current.links,
      }

      store.dispatch(message)

      if (message.is_cached_message) {
        this.addMessageToDispatchHistory(message)
      }

      return output
    }

    output.payload.items = [
      ...output.payload.items.filter(
        item => !current.payload.items.some(newItem => newItem.code === item.code),
      ),
      ...current.payload.items.map(item => ({
        delete: current.payload.delete,
        replace: current.payload.replace,
        shouldDeleteLinkedBaseEntities: current.payload.shouldDeleteLinkedBaseEntities,
        parentCode: current.payload.parentCode,
        totalCount: current.payload.returnCount,
        linkCode: current.payload.linkCode,
        ...item,
        links: item.questions ? item.links.concat(item.questions) : item.links,
      })),
    ]

    return output
  }

  handleBulkPullMessage = async message => {
    console.log('Processing QBulkPullMessage...', { message }) // eslint-disable-line
    const { data = {}, accessToken } = store.getState().keycloak
    const { api_url } = data

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `bearer ${accessToken}`,
    }

    if (isString(api_url) && isString(message.pullUrl)) {
      let apiUrl = api_url

      if (apiUrl.endsWith(':')) {
        apiUrl = `${api_url.substring(0, api_url.length - 1)}/`

        console.warn('Changing api_url from:', api_url, 'to:', apiUrl) // eslint-disable-line
      }
      const url = `${apiUrl}${message.pullUrl}`
      console.warn('Making GET request to:', url) // eslint-disable-line

      try {
        const result = await Api.promiseCall({
          method: 'GET',
          url,
          headers: headers,
          timeout: 5000,
        })

        if (isObject(result)) {
          const { data } = result

          if (isObject(data)) {
            data['is_pull_message'] = true
            data['pull_id'] = removeSubstring(message.pullUrl, 'api/pull/')

            this.onMessage(data)
          } else {
            console.error('QBulkPullMessage Error:', '"invalid data"', result)
          }
        } else {
          console.error('QBulkPullMessage Error:', '"invalid result"', result)
        }
      } catch (error) {
        console.error('QBulkPullMessage Error:', error)
      }
    }
  }

  onMessage = message => {
    if (isDevMode) {
      console.warn('INCOMING MESSAGE:', { message }) // eslint-disable-line
    }

    if (!message) return

    const { msg_type, data_type, cmd_type, messages, asks } = message
    const isValidMessage = this.validMessageTypes.includes(msg_type)

    if (cmd_type === 'DOWNLOAD_FILE') {
      store.dispatch({ type: 'DOWNLOAD_LINK', payload: message })

      return
    }

    if (data_type === 'QBulkPullMessage') {
      this.handleBulkPullMessage(message)

      return
    }

    if (!isValidMessage && data_type !== 'QBulkMessage') {
      this.log(
        `Ignoring message of type ${msg_type}. Must be one of the following: ${this.validMessageTypes.join(
          '|',
        )}`,
        'warn',
      )

      return
    }

    if (data_type === 'QBulkMessage') {
      console.log('Processing QBulkMessage...', { message }) // eslint-disable-line
      store.dispatch({ type: 'SAM_MSG', payload: message })
      if (isArray(messages, { ofMinLength: 1 }) || isArray(asks, { ofMinLength: 1 })) {
        if (isArray(messages, { ofMinLength: 1 })) {
          this.log('Processing QBulkMessage "messages"...', 'warn')
          messages.forEach(this.onMessage)
        }
        if (isArray(asks, { ofMinLength: 1 })) {
          this.log('Processing QBulkMessage "asks"...', 'warn')
          asks.forEach(this.onMessage)
        }
      } else {
        this.log('No "messages" or "asks" supplied with QBulkMessage', 'warn')
      }

      return
    }

    const eventType = this.eventTypes[msg_type]
    const event = message[eventType]
    const action = events[event]

    if (!action) {
      this.log(
        `Could not find action for type of '${eventType}'! (derived from message type '${msg_type}')`,
        'warn',
      )

      return
    }

    if (message.data_type === 'BaseEntity' && !message.delete && !message.replace) {
      /* Add to a batch */
      this.beBatch.push(action(message))

      this.lastBe = new Date().getTime()
    } else {
      const payload = message

      if (isArray(payload.items)) {
        payload.items = payload.items.map(item => ({
          shouldDeleteLinkedBaseEntities: payload.shouldDeleteLinkedBaseEntities,
          parentCode: payload.parentCode,
          delete: payload.delete,
          totalCount: payload.returnCount,
          replace: payload.replace,
          ...item,
          links: item.questions ? item.links.concat(item.questions) : item.links,
        }))
      }

      if (payload.is_pull_message) {
        console.warn('Dispatching Pull message:', event, payload.pull_id, payload) // eslint-disable-line
      }

      store.dispatch(action(payload))

      if (payload.is_cached_message) {
        this.addMessageToDispatchHistory(payload)
      }
    }
  }
}

export default MessageHandler
