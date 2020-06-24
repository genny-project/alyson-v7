import EventBus from 'vertx3-eventbus-client'
import decodeToken from 'jwt-decode'
import NProgress from 'nprogress'
import { push } from 'react-router-redux'
import { prefixedLog /* Storage */ } from '../../utils'
import { store } from '../../redux'
import * as actions from '../../redux/actions'
import * as events from './events'

const { deepParseJson } = require('deep-parse-json')
const ZstdCodec = require('zstd-codec').ZstdCodec

function convertDataURIToBinary(base64) {
  // var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  // var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64)
  var rawLength = raw.length
  var array = new Uint8Array(new ArrayBuffer(rawLength))

  for (var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i)
  }

  return array
}

const codecFunc = cb =>
  ZstdCodec.run(zstd => {
    const simple = new zstd.Simple()

    cb(simple)
  })

class Vertx {
  constructor() {
    this.log = prefixedLog('Vertx')
  }

  constants = {
    RECONNECT_TIMEOUT: 1500,
  }

  state = {
    connected: false,
    url: null,
    token: null,
    eventBus: null,
    reconnectTimeout: null,
    messageQueue: [],
  }

  setState = state => {
    this.state = {
      ...this.state,
      ...(typeof state === 'function' ? state(this.state) : state),
    }
  }

  init(url, token) {
    this.setState({ token, url })

    this.log('Initiating...')

    this.openEventBus(url)
  }

  openEventBus({url = 'https://internmatch-test2.gada.io/frontend/'}) {
    const eventBus = new EventBus(url)

    this.log('Connecting to event bus...')

    this.setState({ eventBus })

    eventBus.onopen = this.handleEventBusOpen
    eventBus.onclose = this.handleEventBusClose
  }

  handleEventBusOpen = () => {
    this.setState({ connected: true })

    this.log('Connected!')

    if (this.state.reconnectTimeout) clearTimeout(this.state.reconnectTimeout)

    const sessionData = decodeToken(this.state.token)

    if (sessionData && sessionData.session_state) {
      const { session_state } = sessionData
      const { eventBus } = this.state

      store.dispatch(actions.rawSession(sessionData.session_state))

      eventBus.registerHandler(session_state, this.handleRegisterHandler)

      store.dispatch(actions.initVertxSuccess())

      this.sendQueuedMessages()
    }
  }

  uncompress = async (incomingCompressedMessage, callback) => {
    console.warn('Comporession being used.') // eslint-disable-line
    codecFunc(simple => {
      const incomingByteArray = convertDataURIToBinary(incomingCompressedMessage)
      const decompressedDataArray = simple.decompress(incomingByteArray)
      const decompressedStr = new TextDecoder('utf-8').decode(decompressedDataArray)
      var decoded = window.atob(decompressedStr)
      const deeplyParsed = deepParseJson(decoded)

      callback(deeplyParsed)
    })
  }

  handleRegisterHandler = (error, message) => {
    if (message && message.body && message.body.zip) {
      this.uncompress(message.body.zip, data => {
        this.handleIncomingMessage(data)
      })
    } else if (message) this.handleIncomingMessage(message.body)

    if (error) this.log(error, 'error')
  }

  handleLogoutOnLogoutEvent = async () => {
    const promises = [
      Storage.remove('kcSessionState'),
      Storage.remove('kcSessionNonce'),
      Storage.remove('kcAuth'),
      this.asyncSetState({
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        sessionState: null,
        sessionNonce: null,
        error: null,
        user: {},
        consecutiveTokenFails: 0,
      }),
    ]

    await Promise.all(promises)
  }

  handleIncomingMessage = (message, isCachedMessage, isAnswerMessage) => {
    const { incomingMessageHandler } = this.state

    if (isCachedMessage) {
      message['is_cached_message'] = true
    }

    if (isAnswerMessage) {
      message['is_answer_message'] = true
    }

    if (message.cache && !isCachedMessage) {
      console.warn('Caching Incoming Message...') // eslint-disable-line

      const action = events['CacheActions']

      store.dispatch(action({ actions: [message] }))
    }

    if (!isCachedMessage && message.exec != null && message.exec === false) {
      console.warn('Incoming Message: Do Not Exec') // eslint-disable-line

      return
    }

    if (message.cmd_type && message.cmd_type === 'ROUTE_CHANGE') {
      NProgress.done()
    }

    if (message.cmd_type === 'LOGOUT') {
      // debugger // eslint-disable-line
      store.dispatch(actions.userLogout())
      // debugger // eslint-disable-line
      // this.handleLogoutOnLogoutEvent();
      store.dispatch(push('/logout'))

      return
    }

    // this.log( 'Receiving a message' );

    // if ( isAnswerMessage ) console.log( 'message', JSON.stringify({ message }));
    if (incomingMessageHandler) incomingMessageHandler(message)
  }

  handleEventBusClose = () => {
    const { reconnectTimeout } = this.state
    const { RECONNECT_TIMEOUT } = this.constants

    this.log('Closed connection.', 'warn')

    if (reconnectTimeout) clearInterval(reconnectTimeout)

    this.setState({
      connected: false,
      reconnectTimeout: setTimeout(this.attemptReconnect, RECONNECT_TIMEOUT),
    })
  }

  setIncomingMessageHandler(handler) {
    this.setState({
      incomingMessageHandler: handler,
    })
  }

  attemptReconnect = () => {
    const { url, token } = this.state

    this.init(url, token)
  }

  pushToMessageQueue(message) {
    this.setState(state => ({
      messageQueue: [...state.messageQueue, message],
    }))
  }

  popMessageQueue() {
    this.setState(state => ({
      messageQueue: state.messageQueue.slice(1),
    }))
  }

  sendQueuedMessages() {
    const { messageQueue } = this.state

    if (messageQueue.length === 0) return

    messageQueue.forEach(message => {
      this.sendMessage(message)

      this.popMessageQueue()
    })
  }

  sendMessage(message) {
    const { connected, eventBus } = this.state

    this.log('Sending a message...')

    if (!connected) {
      this.log('Message not sent, not connected to Vertx.', 'warn')

      this.pushToMessageQueue(message)
    } else {
      this.log('Message sent.')

      eventBus.send('address.inbound', {
        data: message,
      })
    }
  }
}

export default new Vertx()
