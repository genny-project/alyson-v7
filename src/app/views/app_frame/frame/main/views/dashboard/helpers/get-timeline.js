import {map, path, prop} from 'ramda'

const getTimeline = (asks, user) =>
  map(({name, question, parentCode, childAsks})=>({header: name, parentCode:parentCode, body:map(({name, attributeCode, question}) => ({content:name, status:user.attributes[attributeCode].valueBoolean, attributeCode: attributeCode, code:path(['code'], question)}), childAsks)}))(path(['QUE_DASHBOARD_TIMELINE_GRP', 'childAsks'], asks))

export default getTimeline
