import { contains, prop, replace } from 'ramda'
import getBackendViewing from '../../helpers/get-backend-viewing'

const getView = ({ viewing: { view, parentCode = '', code = '' }, asks, frames }) =>
  view === 'QUE_PRE_AGREEMENT_DOC_GRP'
    ? prop(view, asks)
    : view
      ? view
      : contains('QUE_VIEW_AGREEMENT', code)
        ? 'AGREEMENT'
        : contains('BUCKET', code)
          ? 'BUCKET'
          : contains('CARD_RIGHT', parentCode)
            ? 'BUCKET'
            : contains('QUE_PRI_EVENT_VIEW', code)
              ? 'DETAIL'
              : getBackendViewing(frames) === 'UNITY'
                ? 'UNITY'
                : contains('DASHBOARD', code)
                  ? 'DASHBOARD'
                  : contains('MENU', code)
                    ? prop(replace('MENU', 'GRP', code), asks)
                    : contains('GRP', parentCode)
                      ? 'TABLE'
                      : 'DASHBOARD'

export default getView
