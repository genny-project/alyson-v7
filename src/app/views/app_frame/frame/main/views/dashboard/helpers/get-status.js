import { any, all, equals, map, prop, complement } from 'ramda';

const equalsFalse = equals(false)
const equalsTrue = complement(equalsFalse)
const getStatusOffBody = map(prop('status'))

const getStatus = (body) => ({
  isComplete: all(equalsTrue)(getStatusOffBody(body)),
  isNotStarted: all(equalsFalse)(getStatusOffBody(body)),
  isOngoingComplete: any(equalsTrue)(getStatusOffBody(body)),
  isOngoingNotComplete: any(equalsFalse)(getStatusOffBody(body)),
  isOngoing: any(equalsTrue)(getStatusOffBody(body)) && any(equalsFalse)(getStatusOffBody(body))
})

export default getStatus
