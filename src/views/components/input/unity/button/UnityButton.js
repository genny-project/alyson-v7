/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { object, string, array } from 'prop-types';
import { Text, Touchable, Box } from '../../..';
import UnityConsumer from '../consumer';

class UnityButton extends Component {
  static defaultProps = {
    backgroundColor: '#ddd',
    color: 'white',
  }

  static propTypes = {
    unity: object,
    backgroundColor: string,
    color: string,
    items: array,
  }

  render() {
    const { unity, backgroundColor, color } = this.props;

    const { items } = this.props;
    const buttonLabel = items.map(( item ) => item.label );

    const buttons = {
      OBJ_SPEED_SIGN: {
        label: buttonLabel[0],
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "signholder", "ObjectPath": "Prefabs/multi message sign", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframeGraphicWorkerDigging", "ObjectRightSignPath": "Textures/signframeGraphic40kmh", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/roadwork_40_sign", "ObjectSpeedLimit": 11.1 } } ] } }',
      },
      OBJ_TRAFFIC_CONTROLLER_SIGN: {
        label: buttonLabel[1],
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "signholder", "ObjectPath": "Prefabs/sign holder", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },
      OBJ_BOLLARD: {
        label: buttonLabel[2],
        method: 'twoPointReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "bollard", "ObjectPath": "Prefabs/bollard", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },
    };

    // const buttonType = 'OBJ_SPEED_SIGN';

    // const button = buttons[buttonType];

    return (
      // <Touchable
      //   withFeedback
      //   onPress={() => !unity ? null : unity.sendEventToUnity(
      //     button.method,
      //     button.params,
      //   )}
      //   padding={10}
      //   backgroundColor={backgroundColor}
      //   borderRadius={10}
      // >
      //   <Text
      //     size="xs"
      //     color={color}
      //     text={button.label}
      //   />
      // </Touchable>
      <Box
        width="100%"
        padding={5}
        flexWrap="wrap"
      >
        {Object.keys( buttons ).map(( buttonKey, index, array ) => {
          const button = buttons[buttonKey];
          // const mapButton = button.map(( label, params, method ) =>
          //   label.foreach(( buttonLabel ) => {
          //     buttonLabel;
          //   })
          // );

          // switch ( button.label ) {
          //   case 'Place a speed sign':
          //     return Object.assign ( button, items[0] );
          //   case 'Place a traffic controller sign':
          //     return Object.assign ( button, items[1] );
          //   case 'Place a line of bollards':
          //     return Object.assign ( button, items[2] );
          //   default:
          //     break;
          // }

          const unityButton = Object.assign ({}, button );

          // console.warn( 'Unity Button--->', { button, unityButton, buttonLabel });

          return (
            <Box
              key={unityButton.label}
              padding={10}
              backgroundColor={backgroundColor}
              borderRadius={10}
              marginRight={index + 1 >= array.length ? null : 5}
              marginBottom={5}
            >
              <Touchable
                withFeedback
                onPress={() => !unity ? null : unity.sendEventToUnity(
                  unityButton.method,
                  unityButton.params,
                )}
              >
                <Text
                  size="xs"
                  color={color}
                  text={unityButton.label}
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
      <UnityButton
        {...props}
        unity={unity}
      />
    )}
  </UnityConsumer>
);
