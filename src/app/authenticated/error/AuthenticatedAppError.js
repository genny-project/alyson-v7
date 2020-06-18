import React, { Component } from 'react'
import { any, number, func } from 'prop-types'
import { Box, Text, Touchable, Heading } from '../../views/app_frame'
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

    return (
      <Box justifyContent="center" alignItems="center" flex={1} flexDirection="column">
        <Box marginBottom={20}>
          <Heading align="center">Failed to load the page!</Heading>
        </Box>

        <Text align="center">{error || 'Unknown error'}</Text>

        <Box marginTop={20} padding={20}>
          <Touchable
            withFeedback
            backgroundColor="green"
            size="md"
            onPress={this.handleRetry}
            padding={8}
            borderRadius={8}
          >
            <Text text="Retry" color="white" />
          </Touchable>
        </Box>

        {secondsUntilRetry ? (
          <Box>
            <Text color="grey" size="xs">
              Retrying in {secondsUntilRetry} second
              {secondsUntilRetry !== 1 ? 's' : ''}
              ...
            </Text>
          </Box>
        ) : null}
      </Box>
    )
  }
}

export default AuthenticatedAppError
