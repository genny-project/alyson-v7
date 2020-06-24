import React, { Component } from 'react'
import { any, number, func } from 'prop-types'
import { store } from '../../../redux'
import { fetchKeycloakConfig } from '../../../redux/actions'

class AuthenticatedAppError extends Component {
  static propTypes = {
    error: any,
    secondsUntilRetry: number,
    onMount: func,
  }

  componentDidMount() {
    if (this.props.onMount) this.props.onMount()
  }

  handleRetry = () => {
    store.dispatch(fetchKeycloakConfig())
  }

  render() {
    const { error, secondsUntilRetry } = this.props

    return <div>{`${error} retrying in ${secondsUntilRetry}`}</div>
  }
}

export default AuthenticatedAppError
