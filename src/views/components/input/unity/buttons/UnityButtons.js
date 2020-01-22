/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { object } from 'prop-types';
import { Box, Text, Touchable } from '../../../../components';
import UnityConsumer from '../consumer';

class UnityButtons extends Component {
  static defaultProps = {
    // backgroundColor: '#ddd',
    // color: 'white',
  }

  static propTypes = {
    unity: object,
    // backgroundColor: string,
    // color: string,
  }

  render() {
    const { unity /* , backgroundColor, color */ } = this.props;

    const buttons = [
      {
        label: 'Toggle trees',
        method: 'toggleTrees',
        params: null,
      },
      {
        label: 'Place a speed sign',
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "signholder", "ObjectPath": "Prefabs/multi message sign", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframeGraphicWorkerDigging", "ObjectRightSignPath": "Textures/signframeGraphic40kmh", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/roadwork_40_sign", "ObjectSpeedLimit": 11.1 } } ] } }',
      },
      {
        label: 'Place a traffic controller sign',
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "signholder", "ObjectPath": "Prefabs/sign holder", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },
      {
        label: 'Place a line of bollards',
        method: 'twoPointReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "bollard", "ObjectPath": "Prefabs/bollard", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },
    ];

    return (
      <Box
        width="100%"
        padding={5}
        flexWrap="wrap"
      >
        {buttons.map(( button, index, array ) => {
          return (
            <Box
              key={button.label}
              padding={10}
              backgroundColor="#395268"
              borderRadius={10}
              marginRight={index + 1 >= array.length ? null : 5}
              marginBottom={5}
            >
              <Touchable
                withFeedback
                onPress={() => !unity ? null : unity.sendEventToUnity(
                  button.method,
                  button.params,
                )}
              >
                <Text
                  size="xs"
                  color="white"
                  text={button.label}
                />
              </Touchable>

            </Box>

          );
        })}
      </Box>
    );
  }
}

// export default UnityButtons;

export default props => (
  <UnityConsumer>
    { unity => (
      <UnityButtons
        {...props}
        unity={unity}
      />
    )}
  </UnityConsumer>
);
