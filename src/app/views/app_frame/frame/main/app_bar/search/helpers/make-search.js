import debounce from 'lodash.debounce'

import { Bridge } from '../../../../../../../../utils/vertx/index'

const debouncedSearch = debounce(({ setViewing, ...rest }) => {
  Bridge.sendFormattedAnswer(rest)
  setViewing(viewing => ({ ...viewing, view: 'TABLE' }))
}, 2000)

const makeSearch = meta => value => debouncedSearch({ ...meta, value })

export default makeSearch
