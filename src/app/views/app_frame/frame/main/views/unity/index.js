import React from 'react';
import { path, propEq, find, prop } from 'ramda';

import Unity, { UnityContent } from 'react-unity-webgl';

const makeUnityContent = loader => scene => new UnityContent(
  "unity/safeTrafficTown.json",
  "unity/UnityLoader.js"
);

const UnityRender = ({ frames, attributes, baseEntities, asks, setViewing, viewing }) => {
  const unityQuestionLinks = path( ['FRM_CONTENT_QUE_UNITY_ASK_GRP', 'links'], frames );
  const unityAskGrpCode = find( propEq( 'type', 'ask' ))( unityQuestionLinks );
  const unityAskGrp = prop( unityAskGrpCode, asks );
  const unityAskGrpChildAsks = prop( 'childAsks', unityAskGrp );

  const unityContent = makeUnityContent()()


  console.log( unityContent );

  return <Unity unityContent={ unityContent }/>;
};

export default UnityRender;
