import Unity, { UnityContent } from 'react-unity-webgl'
import { replace } from 'ramda'
import Bridge from '../../../../../../../../utils/vertx/Bridge'

const unityContent = new UnityContent('/unity/safeTrafficTown.json', '/unity/UnityLoader.js')

const sendLoadedSignal = ({ user, onLoaded }) => () => {
  if (typeof onLoaded === 'function') onLoaded()
  Bridge.sendEvent({
    event: 'BTN',
    eventType: 'BTN_CLICK',
    data: {
      code: 'UNITY_LOADED',
      parentCode: 'UNITY_LOADED',
      targetCode: user.data.code,
      rootCode: 'UNITY_LOADED',
    },
    sendWithToken: true,
  })
}

const buildUnityContent = ({ onUnityEvent, onUnityAnswer, user, onLoaded }) => {
  unityContent.on('loaded', sendLoadedSignal({ user, onLoaded }))
  unityContent.on('unityEvent', onUnityEvent)
  unityContent.on('unityAnswer', onUnityAnswer)

  const sendToUnity = code => {
    const action = JSON.parse(replace(/\\/g, '', code))

    console.log('SENDING TO UNITY', code)
    unityContent.send(
      action[0],
      action[1],
      typeof action[2] === 'object' ? JSON.stringify(action[2]) : action[2],
    )
  }

  return {
    sendToUnity,
    unityContent,
    sendLoadedSignal: sendLoadedSignal({ user }),
  }
}

export default buildUnityContent
