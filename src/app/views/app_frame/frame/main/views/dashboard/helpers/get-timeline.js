import {map, path, prop} from 'ramda'

const getTimeline = (asks) => map(({name, question, sourceCode, childAsks})=>({header: name, parentCode:sourceCode, code: prop('code', question), body:map(({name})=>({content:name, status:false}), childAsks)}))(path(['QUE_DASHBOARD_TIMELINE_GRP', 'childAsks'], asks))

export default getTimeline
