import { includes, prop } from 'ramda'
import getBackendViewing from '../../helpers/get-backend-viewing'

const getView = ({ viewing: { view, parentCode = '', code = '' }, asks, frames }) =>
  view === 'QUE_PRE_AGREEMENT_DOC_GRP'
    ? prop(view, asks)
    : view
      ? view
      : includes('QUE_VIEW_AGREEMENT', code)
        ? 'AGREEMENT'
        : includes('BUCKET', code)
          ? 'BUCKET'
          : includes('CARD_RIGHT', parentCode)
            ? 'BUCKET'
            : includes('QUE_PRI_EVENT_VIEW', code)
              ? 'DETAIL'
              : includes('STT_SCENARIO', code)
                ? 'UNITY'
                : includes('DASHBOARD', code)
                  ? 'DASHBOARD'
                  : includes('GRP', parentCode)
                    ? 'TABLE'
                    : 'DASHBOARD'

export default getView
