import { UnityContent } from 'react-unity-webgl'
import { replace } from 'ramda'
import Bridge from '../../../../../../../../utils/vertx/Bridge'

const unityContent = new UnityContent('/unity/safeTrafficTown.json', '/unity/UnityLoader.js')

const sleep = async cb => {
  console.log('SLEEPING')
  await new Promise(r => setTimeout(r, 5000))
  cb()
}

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

const onUnityEvent = ({
  user: {
    data: { code: userCode },
  },
  question: { weight, questionCode, attributeCode, id: askId },
}) => value => {
  Bridge.sendFormattedAnswer({
    askId,
    attributeCode,
    sourceCode: userCode,
    targetCode: userCode,
    code: questionCode,
    identifier: questionCode,
    weight,
    value,
  })
}

const buildUnityContent = ({ user, onLoaded, question }) => {
  unityContent.on('loaded', () => sleep(sendLoadedSignal({ user, onLoaded })))
  unityContent.on('unityEvent', onUnityEvent({ user, question }))
  unityContent.on('unityAnswer', onUnityEvent({ user, question }))

  const sendToUnity = (code, loaded) => {
    if (loaded) {
      const action = JSON.parse(replace(/\\/g, '', code))

      console.log('SENDING TO UNITY', code)
      unityContent.send(
        action[0],
        action[1],
        typeof action[2] === 'object' ? JSON.stringify(action[2]) : action[2],
      )
    }
  }

  return {
    sendToUnity,
    unityContent,
    sendLoadedSignal: sendLoadedSignal({ user }),
  }
}

export default buildUnityContent
