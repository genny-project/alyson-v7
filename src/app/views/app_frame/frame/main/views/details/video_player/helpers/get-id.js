import { compose, split, last } from 'ramda'

const getId = compose(
  last,
  split('='),
)

export default getId
