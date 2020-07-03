import { path } from 'ramda';

const getUserRole = ( user ) => {
  const isAdmin = path(['attributes', 'PRI_IS_ADMIN', 'value'], user)
  const isAgent= path(['attributes', 'PRI_IS_AGENT', 'value'], user)
  const isSupervisor = path(['attributes', 'PRI_IS_SUPERVISOR', 'value'], user)
  const isIntern = path(['attributes', 'PRI_IS_INTERN', 'value'], user)
  return {isAdmin, isAgent, isSupervisor, isIntern}
}

export default getUserRole
