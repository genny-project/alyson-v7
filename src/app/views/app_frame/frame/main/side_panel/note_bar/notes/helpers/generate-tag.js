import {concat, compose, toUpper, replace} from 'ramda'

const generateTag = ({name, value}) => ({
  name: concat('TAG_', compose(toUpper, replace(/ /g, '_'))(name)),
  value: value || 2
})

export default generateTag
