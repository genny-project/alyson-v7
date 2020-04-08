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

    // console.warn( 'ITEMS--->', items );
    // const buttonLabel = items.map(( item ) => item.id );

    const buttons = {
      SEL_S1_B_ONE: {
        // label: buttonLabel[0],
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "signholder", "ObjectPath": "Prefabs/multi message sign", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframeGraphicWorkerDigging", "ObjectRightSignPath": "Textures/signframeGraphic40kmh", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/roadwork_40_sign", "ObjectSpeedLimit": 11.1 } } ] } }',
      },

      SEL_S1_B_TWO: {
        // label: buttonLabel[1],
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "signholder", "ObjectPath": "Prefabs/sign holder", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },

      SEL_S1_B_THREE: {
        // label: buttonLabel[2],
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "bollard", "ObjectPath": "Prefabs/bollard", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },

      SEL_S1_B_FOUR: {
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "leadouttaper", "ObjectPath": "Prefabs/leadouttaper", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },

      SEL_S1_B_FIVE: {
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "longrunwithtaper", "ObjectPath": "Prefabs/longrunwithtaper", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },

      SEL_S1_B_SIX: {
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "shortrunofbollards", "ObjectPath": "Prefabs/shortrunofbollards", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
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
        {items.map(( item, index, array ) => {
          // const button = buttons[buttonKey];
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

          // const unityButton = Object.assign ({}, button );

          // console.warn( 'Unity Button--->', { button, unityButton, buttonLabel });

          return (
            <Box
              key={item.label}
              padding={10}
              backgroundColor={backgroundColor}
              borderRadius={10}
              marginRight={index + 1 >= array.length ? null : 5}
              marginBottom={5}
            >
              <Touchable
                withFeedback
                onPress={() => !unity ? null : unity.sendEventToUnity(
                  buttons[item.value].method,
                  buttons[item.value].params,
                )}
              >
                <Text
                  size="xs"
                  color={color}
                  text={item.label}
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
