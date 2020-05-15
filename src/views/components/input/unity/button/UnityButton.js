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
    // color: string,
    items: array,
  }

  render() {
    const { unity, backgroundColor, color } = this.props;

    const { items } = this.props;

    const buttons = {
      SEL_S1_B_ONE: {
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "mms-workers-40kmph-roadwork", "ObjectPath": "Prefabs/multi message sign", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframeGraphicWorkerDigging", "ObjectRightSignPath": "Textures/signframeGraphic40kmh", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/roadwork_40_sign", "ObjectSpeedLimit": 11.1 } } ] } }',
      },

      SEL_S1_B_TWO: {
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "mms_prepare_trafficcontroller_roadwork", "ObjectPath": "Prefabs/multi message sign", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },

      SEL_S1_B_THREE: {
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "mms_endroadwork_100_blank", "ObjectPath": "Prefabs/multi message sign", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframe 600-600 End Road Work", "ObjectRightSignPath": "Textures/signframe 600-600 Graphic 100kmh", "ObjectBottomSignPath": "Textures/signframe-01", "ObjectPlaneSignPath": "Textures/endroadwork-100-blank", "InstantiatedSpeedLimit": 27.77 } } ] } }',
      },

      SEL_S1_B_FOUR: {
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "shortrunofbollards", "ObjectPath": "Prefabs/shortrunofbollards", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },

      SEL_S1_B_FIVE: {
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "longrunwithtaper", "ObjectPath": "Prefabs/longrunwithtaper", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
      },

      SEL_S1_B_SIX: {
        method: 'spawnObjectReact',
        params: '{"reactiveQuestion": {"Objects": [ { "ObjectName": "leadouttaper", "ObjectPath": "Prefabs/leadouttaper", "ObjectMultiMessage": { "ObjectLeftSignPath": "Textures/signframePrepareToStop", "ObjectRightSignPath": "Textures/signframeGraphicTrafficController", "ObjectBottomSignPath": "Textures/signframeRoadwork", "ObjectPlaneSignPath": "Textures/prepare_sign_holder_sign" } } ] } }',
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
