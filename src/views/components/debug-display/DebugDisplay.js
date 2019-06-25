import React from 'react';
import ReactJson from 'react-json-view';
import { Icon, Box, Text, Button } from '../../components';
import store from '../../../redux/store';
import './index.css';

class DebugDisplay extends React.Component {
  state = {
    minimized: true,
    displayStore: false,
  }; // eslint-disable-line

  handleClick = () => {
    this.setState({
      justReRender: true, // eslint-disable-line
    });
  };

  handleMinimize = () => {
    this.setState( state => ({ minimized: !state.minimized }));
    console.log( this.state, 'STATE' );
  };

  handleDisplayStore = () => {
    this.setState({
      displayStore: true,
    });
  };

  render() {
    const { minimized, displayStore } = this.state;

    return (
      <Box
        padding={10}
        background="snow"
        overflow="scroll"
        height={minimized ? '80px' : '600px'}
        position="relative"
        borderWidth="1px"
        borderColor="#e3e3e3"
      >
        <Box
          position="absolute"
          right={20}
          cursor="pointer"
          height={40}
        >
          <Button
            onPress={this.handleMinimize}
            height={40}
          >
            {minimized ? (
              <Icon
                name="expand_less"
                color="black"
                cursor="pointer"
              />
            ) : (
              <Icon
                name="expand_more"
                color="black"
                cursor="pointer"
              />
            )}
          </Button>
        </Box>
        {minimized ? (
          <Box flexDirection="column">
            <Text size="md">
              {' '}
Expand to View Debug Mode
            </Text>
            <Box marginTop="10px">
              <Text
                color="#e89131"
                size="sm"
              >
                Note: Debug mode could be slow
              </Text>
            </Box>
          </Box>
        ) : (
          <pre style={{ width: '900px' }}>
            <button
              onClick={this.handleClick}
              style={{ height: 40 }}
            >
              Re-render the page
            </button>
            <Box
              height={300}
              overflow="scroll"
              overflowY="auto"
              marginTop={10}
              flexDirection="column"
            >
              <Text size="md">
Keycloak Session From Redux store
              </Text>
              <ReactJson src={store.getState().keycloak} />
            </Box>
            <Box
              flexDirection="column"
              marginTop={20}
            >
              <Text size="md">
Session
              </Text>
            </Box>

            {!minimized ? <ReactJson src={store.getState().testReducer} /> : null}

            <Box
              flexDirection="column"
              marginTop={10}
            >
              <Text size="md">
Redux Store
              </Text>

              <Box flexDirection="column">
                <Box marginTop={20}>
                  <Button
                    background="#e3e3e3"
                    height="40px"
                    color="#e3e3e3"
                    width="200px"
                    onPress={this.handleDisplayStore}
                  >
                    <Text text="Click to Display store" />
                  </Button>
                </Box>
                <Box marginTop={10}>
                  {!displayStore ? (
                    <Text size="xs">
Hidden for performance reasons click above button to show
                    </Text>
                  ) : null}
                </Box>
              </Box>
              {displayStore ? (
                <ReactJson
                  src={store.getState()}
                  collapsed={false}
                />
              ) : null}
            </Box>
          </pre>
        )}
      </Box>
    );
  }
}

export default DebugDisplay;
