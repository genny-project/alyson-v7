/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { object, string } from 'prop-types';
import { Box, Text, Touchable } from '../../../../components';
import UnityConsumer from '../consumer';

class UnityButtons extends Component {
  static defaultProps = {
    backgroundColor: '#ddd',
    color: 'white',
  }

  static propTypes = {
    unity: object,
    backgroundColor: string,
    color: string,
  }

  render() {
    const { unity, backgroundColor, color } = this.props;

    const buttons = {
      OBJ_SPEED_SIGN: {
        label: 'Place a speed sign',
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "signholder", "ObjectPath": "Prefabs/multi message sign", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframeGraphicWorkerDigging", "ObjectRightSignPath": "Textures/signframeGraphic40kmh", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/roadwork_40_sign", "ObjectSpeedLimit": 11.1 } } ] } }',
      },
      OBJ_TRAFFIC_CONTROLLER_SIGN: {
        label: 'Place a traffic controller sign',
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "signholder", "ObjectPath": "Prefabs/sign holder", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },
      OBJ_BOLLARD: {
        label: 'Place a line of bollards',
        method: 'twoPointReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "bollard", "ObjectPath": "Prefabs/bollard", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },
    };

    const buttonType = 'OBJ_SPEED_SIGN';

    const button = buttons[buttonType];

    return (
      <Touchable
        withFeedback
        onPress={() => !unity ? null : unity.sendEventToUnity(
          button.method,
          button.params,
        )}
        padding={10}
        backgroundColor={backgroundColor}
        borderRadius={10}
      >
        <Text
          size="xs"
          color={color}
          text={button.label}
        />
      </Touchable>
      // <Box
      //   width="100%"
      //   padding={5}
      //   flexWrap="wrap"
      // >
      //   {buttons.map(( button, index, array ) => {
      //     return (
      //       <Box
      //         key={button.label}
      //         padding={10}
      //         backgroundColor={backgroundColor}
      //         borderRadius={10}
      //         marginRight={index + 1 >= array.length ? null : 5}
      //         marginBottom={5}
      //       >
      //         <Touchable
      //           withFeedback
      //           onPress={() => !unity ? null : unity.sendEventToUnity(
      //             button.method,
      //             button.params,
      //           )}
      //         >
      //           <Text
      //             size="xs"
      //             color={color}
      //             text={button.label}
      //           />
      //         </Touchable>

      //       </Box>

      //     );
      //   })}
      // </Box>
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
