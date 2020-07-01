import { compose } from 'ramda'

const getUserDetails = ({
  attributes: {
    PRI_NAME: { value: username },
    PRI_EMAIL: { value: email },
  },
}) => ({ username, email })

export default getUserDetails
