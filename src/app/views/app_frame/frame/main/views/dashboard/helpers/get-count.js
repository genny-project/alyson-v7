import { path } from 'ramda'

const getCount = attributes => name => path([name, 'PRI_COUNT_LONG', 'value'], attributes)

export default getCount
