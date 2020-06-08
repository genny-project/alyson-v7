import { path } from 'ramda';

const getBackedView = frames => {
  const content = path(['FRM_CONTENT', 'links', 0, 'code'], frames);

  return content === 'FRM_QUE_TAB_VIEW' ? 'TABLE' : '';
};

export default getBackedView;
