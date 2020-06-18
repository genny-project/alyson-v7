import React, { Component } from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import { KeycloakConsumer, Redirect } from '../../components'
import Generic from '../generic'

class Login extends Component {
  static propTypes = {
    keycloak: object,
    config: object,
  }

  state = {
    browserDismissed: false,
  }

  componentDidMount() {
    if (this.shouldDoLogin()) {
      this.doLogin()
    }
  }

  componentDidUpdate() {
    if (this.shouldDoLogin()) {
      this.doLogin()
    }
  }

  shouldDoLogin = () => {
    const { keycloak } = this.props
    const { config } = this.props

    return (
      !keycloak.isAuthenticated &&
      !keycloak.isCheckingStorage &&
      !keycloak.isAuthenticating &&
      config !== null &&
      config.ENV_USE_CUSTOM_AUTH_LAYOUTS !== 'TRUE' &&
      config.ENV_USE_CUSTOM_AUTH_LAYOUTS !== 'true'
    )
  }

  doLogin = async () => {
    const { attemptLogin } = this.props.keycloak

    const attempt = await attemptLogin({ replaceUrl: true })

    if (attempt && attempt.type === 'cancel') this.setState({ browserDismissed: true })
  }

  render() {
    const { isAuthenticated, error } = this.props.keycloak
    const { config } = this.props
    const { browserDismissed } = this.state

    if (
      config &&
      (config.ENV_USE_CUSTOM_AUTH_LAYOUTS === 'TRUE' ||
        config.ENV_USE_CUSTOM_AUTH_LAYOUTS === 'true')
    ) {
      return <Generic layout="login" />
    }

    if (isAuthenticated) return <Redirect to="app" />

    if (browserDismissed) return <Redirect to="splash" />

    if (error) return <div>{`Error`}</div>

    return <div>{`Loggin in`}</div>
  }
}

const mapStateToProps = state => ({
  config: state.keycloak.data,
})

export default connect(mapStateToProps)(props => (
  <KeycloakConsumer>{keycloak => <Login {...props} keycloak={keycloak} />}</KeycloakConsumer>
))
