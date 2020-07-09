import { includes, prop } from 'ramda'

const getView = ({ viewing: { view, parentCode = '', code = '' }, asks }) =>
  view === 'QUE_PRE_AGREEMENT_DOC_GRP'
    ? prop(view, asks)
    : view
      ? view
      : includes('QUE_VIEW_AGREEMENT', code)
        ? 'AGREEMENT'
        : includes('QUE_PRI_EVENT_VIEW', code)
          ? 'DETAIL'
          : includes('DASHBOARD', code)
            ? 'DASHBOARD'
            : 'DASHBOARD'

export default getView
