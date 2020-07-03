import { path } from 'ramda';

const getIsAdmin = (user) => path(['attributes', 'PRI_IS_ADMIN', 'value'], user)
const getIsAgent= (user) => path(['attributes', 'PRI_IS_AGENT', 'value'], user)
const getIsSupervisor = (user) => path(['attributes', 'PRI_IS_SUPERVISOR', 'value'], user)
const getIsIntern = (user) => path(['attributes', 'PRI_IS_INTERN', 'value'], user)


export { getIsAdmin, getIsAgent, getIsSupervisor, getIsIntern }
