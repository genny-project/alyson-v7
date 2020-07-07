import React, { useState, useEffect } from 'react'
import { identity, pathOr, path } from 'ramda'
import { connect } from 'react-redux'

import Unity from 'react-unity-webgl'
import Form from '../form'

import buildUnityContent from './helpers/build-unity-content'

const UnityRender = ({
  setViewing,
  setLoading,
  currentAsk,
  attributes,
  baseEntities,
  googleApiKey,
  user,
  unityEvent,
}) => {
  const [loaded, setLoaded] = useState(false)

  const { unityContent, sendToUnity, sendLoadedSignal } = buildUnityContent({
    user,
    onLoaded: () => setLoaded(true),
    onUnityAnswer: identity,
    onUnityEvent: identity,
  })

  useEffect(
    () => {
      if (unityEvent) {
        sendToUnity(unityEvent)
      }
    },
    [unityEvent],
  )

  if (path(['childAsks', 0, 'name'], currentAsk) === 'Loading Questions' && loaded)
    sendLoadedSignal()

  return (
    <div style={{ marginTop: '5rem', marginLeft: '12rem', marginRight: '2rem' }}>
      <Unity unityContent={unityContent} />
      <Form
        redirect={() => setViewing({ view: 'UNITY' })}
        setViewing={setViewing}
        setLoading={setLoading}
        currentAsk={currentAsk}
        attributes={attributes}
        baseEntities={baseEntities}
        googleApiKey={googleApiKey}
        user={user}
        viewing={{ redirect: () => setViewing({ view: 'UNITY' }) }}
        noSaving
      />
    </div>
  )
}

const mapStateToProps = state => ({
  unityEvent: pathOr('', ['vertx', 'bulkMessage', 'SAM', 'unityEvent', 'code'], state),
  currentAsk: pathOr({}, ['vertx', 'bulkMessage', 'SAM', 'currentAsk'], state),
  user: state.vertx.user,
})
export default connect(mapStateToProps)(UnityRender)
