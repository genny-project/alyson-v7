import { pickBy, includes, has } from 'ramda'
const getApplication = pickBy((val, key) => includes('APP', key) && has('QQQ_QUESTION_GROUP', val))

export default getApplication
