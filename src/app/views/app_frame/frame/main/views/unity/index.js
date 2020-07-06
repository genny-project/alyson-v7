import React from 'react'
import Bridge from '../../../../../../../utils/vertx/Bridge'
import { map, addIndex, pathOr, replace } from 'ramda'
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
      Bridge.sendEvent({
        event: 'UNITY_LOADED',
        data: { code: 'UNITY_LOADED' },
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

  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props)
    if (this.props.unityEvent.code && this.props.unityEvent.code !== prevProps.unityEvent.code) {
      const action = JSON.parse(replace(/\\/g, '', this.props.unityEvent.code))

      console.log(
        'SENDING',
        ...[
          action[0],
          action[1],
          typeof action[2] === 'object' ? JSON.stringify(action[2]) : action[2],
        ],
      )

      this.unityContent.send(
        ...[
          action[0],
          action[1],
          typeof action[2] === 'object' ? JSON.stringify(action[2]) : action[2],
        ],
      )
    }
  }

  render() {
    return (
      <div style={{ marginTop: '5rem', marginLeft: '12rem', marginRight: '2rem' }}>
        <Col>
          <Typography>{`UnityEvent: ${this.state.eventname}, UnityAnswer: ${
            this.state.answername
          }`}</Typography>
          <Row>
            <TextField label="unityParam:" onChange={this.myChangeHandler} />
            <Button onClick={this.onClick} color="primary">
              SUBMIT PARAM
            </Button>
            <Button color="secondary" variant="outlined" onClick={this.handleMenuOpen}>
              Select Scene
            </Button>
          </Row>
          <Menu open={!!this.state.menu} anchorEl={this.state.menu} onClose={this.handleMenuClose}>
            {addIndex(map)((scene, idx) => (
              <MenuItem onClick={this.handleMenu(scene)}>{`Scene ${idx + 1}`}</MenuItem>
            ))(scenes)}
          </Menu>
        </Col>

        <div>
          <Unity unityContent={this.unityContent} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  unityEvent: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'unityEvent'], state),
})
export default connect(mapStateToProps)(UnityRender)
