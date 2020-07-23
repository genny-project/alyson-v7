import { map, path } from 'ramda'

const createGetTimeline = ( user ) =>
  map(({ name, questionCode, childAsks }) => ({
    header: name,
    parentCode: questionCode,
    body: map(({ name, attributeCode, question }) => ({
      content: name,
      status: user.attributes[attributeCode].valueBoolean,
      attributeCode: attributeCode,
      code: path( ['code'], question ) }), childAsks )
  }))

export default createGetTimeline
