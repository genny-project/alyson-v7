import React from 'react'
import Bridge from '../../../../../../../utils/vertx/Bridge'
import Form from '../form'
import { map, addIndex, pathOr, replace, length } from 'ramda'
import { connect } from 'react-redux'

import Unity, { UnityContent } from 'react-unity-webgl'
import { Button, Typography, TextField, Menu, MenuItem } from '@material-ui/core'
import { Col, Row } from '../../components/layouts'

const scenes = [
  'STT_SC_ONE',
  'STT_SC_TWO',
  'STT_SC_THREE',
  'STT_SC_FOUR',
  'STT_SC_FIVE',
  'STT_SC_SIX',
  'STT_SC_SEVEN',
  'STT_SC_EIGHT',
  'STT_SC_NINE',
  'STT_SC_TEN',
]

class UnityRender extends React.Component {
  constructor(props) {
    super(props)

    this.unityContent = new UnityContent('/unity/safeTrafficTown.json', '/unity/UnityLoader.js')

    this.unityContent.on('loaded', () => {
      this.setState({ unityLoaded: true })
      Bridge.sendEvent({
        event: 'BTN',
        eventType: 'BTN_CLICK',
        data: {
          code: 'UNITY_LOADED',
          parentCode: 'UNITY_LOADED',
          targetCode: this.props.user.data.code,
          rootCode: 'UNITY_LOADED',
        },
        sendWithToken: true,
      })
    })

    this.unityContent.on('unityEvent', eventname => {
      this.setState({
        eventname: eventname,
      })
    })

    this.unityContent.on('unityAnswer', answername => {
      this.setState({
        answername: answername,
      })
    })
  }

  onClick = () => {
    const { unityParam } = this.state
    this.unityContent.send('reactObject', 'changeScene', unityParam)
  }

  state = {
    eventname: null,
    answername: null,
    unityParam: null,
    menu: null,
    unityLoaded: false,
    lastSentMessage: null,
  }

  myChangeHandler = event => {
    const value = event.target.value
    this.setState({
      unityParam: value,
    })
  }

  handleMenuOpen = event => {
    this.setState({
      menu: event.currentTarget,
    })
  }

  handleMenuClose = event => {
    this.setState({
      menu: null,
    })
  }

  handleMenu = scene => event => {
    this.setState({
      unityParam: scene,
      menu: null,
    })
    this.unityContent.send('reactObject', 'changeScene', scene)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.unityLoaded) {
      Bridge.sendEvent({
        event: 'BTN',
        eventType: 'BTN_CLICK',
        data: {
          code: 'UNITY_LOADED',
          parentCode: 'UNITY_LOADED',
          targetCode: this.props.user.data.code,
          rootCode: 'UNITY_LOADED',
        },
        sendWithToken: true,
      })
    }

    if (this.props.unityEvent.code) {
      const action = JSON.parse(replace(/\\/g, '', this.props.unityEvent.code))

      const thirdParam = typeof action[2] === 'object' ? JSON.stringify(action[2]) : action[2]

      if (thirdParam !== this.state.lastSentMessage) {
        this.unityContent.send(action[0], action[1], thirdParam)

        this.setState({ lastSentMessage: thirdParam })
      }
    }
  }

  render() {
    const {
      setViewing,
      setLoading,
      currentAsk,
      attributes,
      baseEntities,
      googleApiKey,
      user,
    } = this.props
    return (
      <div style={{ marginTop: '5rem', marginLeft: '12rem', marginRight: '2rem' }}>
        <Unity unityContent={this.unityContent} />
        <Form
          redirect={() => setViewing({ view: 'UNITY' })}
          setViewing={setViewing}
          setLoading={setLoading}
          currentAsk={currentAsk}
          attributes={attributes}
          baseEntities={baseEntities}
          googleApiKey={googleApiKey}
          user={user}
          viewing={{ viewingRedirect: () => setViewing({ view: 'UNITY' }) }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  unityEvent: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'unityEvent'], state),
  currentAsk: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'currentAsk'], state),
  user: state.vertx.user,
})
export default connect(mapStateToProps)(UnityRender)
