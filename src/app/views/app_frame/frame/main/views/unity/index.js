import React from 'react'
import Unity, { UnityContent } from 'react-unity-webgl'
import Button from '@material-ui/core/Button'

class UnityRender extends React.Component {
  constructor(props) {
    super(props)

    this.unityContent = new UnityContent('unity/safeTrafficTown.json', 'unity/UnityLoader.js')

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
  }

  myChangeHandler = event => {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <div>
        <h2>{`UnityEvent: ${this.state.eventname}, UnityAnswer: ${this.state.answername}`}</h2>
        <form>
          <div>
            <p>unityParam: </p>
            <input type="text" name="unityParam" onChange={this.myChangeHandler} />
          </div>
        </form>
        <div>
          <Button
            onClick={this.onClick}
            variant="contained"
            color="primary"
            startIcon={
              <svg x="0px" y="0px" width="24" height="24" viewBox="0 0 978 952">
                <path
                  fill="#FFFFFF"
                  d="M520.289,1.967c-1.615,4.413-14.747,7.465-31.096,7.465c-16.88,0-30.314-4.884-31.217-8.822l-76.571,214.588h-0.018
	c0.037,17,48.295,30.526,107.535,30.526c59.236,0,107.535-13.084,107.535-29.72v-0.005L520.289,1.967z"
                />
                <path
                  fill="#FFFFFF"
                  d="M897.207,691.268l-148.072-45.49l34.283,96.421h-0.003c-0.099,46-131.985,82.708-294.66,82.708
	c-162.679,0-294.562-36.708-294.663-82.708h0.055l34.278-96.406L80.652,691.284C-6.557,718.129-27.55,764.646,41.001,795.37
	l282.491,126.619c89.181,39.971,241.994,40.025,331.121,0.096l282.621-126.606C1005.879,764.728,984.701,718.146,897.207,691.268z"
                />

                <g>
                  <path
                    fill="#FFFFFF"
                    d="M655.997,381.461c-4.879,11.841-21.986,22.058-50.218,29.847c-31.25,8.622-72.838,13.37-117.103,13.37
		c-44.28,0-85.87-4.857-117.109-13.678c-27.324-7.715-44.232-17.743-49.711-29.335l-69.411,194.533h-0.043
		c0.08,35,106.409,66.121,236.528,66.121c130.117,0,236.528-29.668,236.528-66.207v-0.012L655.997,381.461z"
                  />
                </g>
              </svg>
            }
          >
            Place Cone
          </Button>
          <Button
            onClick={this.onClick}
            variant="contained"
            color="primary"
            startIcon={
              <svg width="24" height="24">
                <g>
                  <rect fill="none" id="canvas_background" height="26" width="26" y="-1" x="-1" />
                  <g
                    display="none"
                    overflow="visible"
                    y="0"
                    x="0"
                    height="100%"
                    width="100%"
                    id="canvasGrid"
                  >
                    <rect
                      fill="url(#gridpattern)"
                      stroke-width="0"
                      y="0"
                      x="0"
                      height="100%"
                      width="100%"
                    />
                  </g>
                </g>
                <g>
                  <rect
                    stroke="#000"
                    id="svg_1"
                    height="19.394163"
                    width="1.98261"
                    y="1.485611"
                    x="11.008695"
                    stroke-width="0"
                    fill="#ffffff"
                  />
                  <path
                    stroke="#000"
                    id="svg_2"
                    d="m6.278851,20.926981l3.351354,-1.239156l4.73959,0l3.351354,1.239156l0,1.752454l-3.351354,1.239156l-4.73959,0l-3.351354,-1.239156l0,-1.752454z"
                    stroke-opacity="null"
                    stroke-width="0"
                    fill="#ffffff"
                  />
                  <ellipse
                    stroke="#000"
                    ry="1"
                    rx="1"
                    id="svg_3"
                    cy="1.396792"
                    cx="12"
                    stroke-opacity="null"
                    stroke-width="0"
                    fill="#ffffff"
                  />
                </g>
              </svg>
            }
          >
            Place Bollard
          </Button>
        </div>
        <div>
          <Unity unityContent={this.unityContent} />
        </div>
      </div>
    )
  }
}

export default UnityRender
