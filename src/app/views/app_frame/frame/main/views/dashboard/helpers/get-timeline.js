import {map, path, prop} from 'ramda'

const getTimeline = (asks, user) =>
  map(({name, question, sourceCode, childAsks})=>({header: name, parentCode:sourceCode, code: prop('code', question), body:map(({name, attributeCode}) => ({content:name, status:user.attributes[attributeCode].valueBoolean, attributeCode: attributeCode}), childAsks)}))(path(['QUE_DASHBOARD_TIMELINE_GRP', 'childAsks'], asks))

export default getTimeline
