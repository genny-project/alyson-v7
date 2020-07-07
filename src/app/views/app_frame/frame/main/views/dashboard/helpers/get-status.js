import { any, all, equals } from 'ramda';

const equalsFalse = equals(false)
const equalsTrue = equals(true)
const check = (step) => step.body.map(({status})=> status)

const getStatus = (step) => {

  const isComplete = all(equalsTrue)(check(step))
  const isNotStarted = all(equalsFalse)(check(step))
  const isOngoingComplete = any(equalsTrue)(check(step))
  const isOngoingNotComplete = any(equalsFalse)(check(step))
  const isOngoing = isOngoingComplete && isOngoingNotComplete

  return {isComplete, isNotStarted, isOngoing}

}

export default getStatus
