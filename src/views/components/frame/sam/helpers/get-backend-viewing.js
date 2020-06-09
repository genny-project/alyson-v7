import { path } from 'ramda';

const getBackedView = frames => {
  const contentSetByBackend = path(['FRM_CONTENT', 'links', 0, 'code'], frames);

  return contentSetByBackend === 'FRM_QUE_TAB_VIEW'
    ? 'TABLE'
    : contentSetByBackend === 'FRM_QUE_UNITY_ASK_GRP'
      ? 'UNITY'
      : '';
};

export default getBackedView;
