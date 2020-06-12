import React from 'react';
import { path, propEq, find, prop } from 'ramda';

import Unity from '../../../../input/unity';

const UnityRender = ({ frames, attributes, baseEntities, asks, setViewing, viewing }) => {
  const unityQuestionLinks = path( ['FRM_CONTENT_QUE_UNITY_ASK_GRP', 'links'], frames );
  const unityAskGrpCode = find( propEq( 'type', 'ask' ))( unityQuestionLinks );
  const unityAskGrp = prop( unityAskGrpCode, asks );
  const unityAskGrpChildAsks = prop( 'childAsks', unityAskGrp );

  console.log( frames );

  return <Unity />;
};

export default UnityRender;
