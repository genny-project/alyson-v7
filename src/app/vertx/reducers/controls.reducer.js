import { isArray, isString, isObject } from '../../../utils'

const injectControlIntoState = ({ item, state }) => {
  /* alter the state */

  // console.log('item', item);

  let controllablePanels = []

  item.baseEntityAttributes.forEach(attribute => {
    if (attribute.attributeCode === 'PRI_CONTROLLABLE_PANELS') {
      controllablePanels = attribute.value
    }
  })

  const baseEntityCode = item.code

  if (isArray(controllablePanels, { ofMinLength: 1 })) {
    controllablePanels.forEach(panel => {
      const panelId = `${baseEntityCode}:${panel}`

      state[panelId] = 'open'
    })
  }
}

const updateControl = ({ type, payload, state }) => {
  /* alter the state */

  const newState = {
    ...state,
  }

  if (isArray(payload.codes, { ofMinLength: 1 })) {
    payload.codes.forEach(code => {
      if (newState[code]) {
        if (newState[code] !== 'open' && (type === 'toggle' || type === 'open')) {
          newState[code] = 'open'
        } else if (newState[code] !== 'closed' && (type === 'toggle' || type === 'close')) {
          newState[code] = 'closed'
        }
      }
    })
  }

  return newState
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'BASE_ENTITY_MESSAGE': {
      if (!isArray(payload.items, { ofMinLength: 1 })) return state

      /* Loop through all of the layouts and store them in their corresponding layout groups. */
      return payload.items.reduce(
        (newState, item) => {
          // console.log( newState );
          try {
            if (isString(item.code, { startsWith: 'FRM_' })) {
              injectControlIntoState({ item, state: newState })
            } else {
              return state
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.warn('Unable to add control to reducer state', error, item.code, item)
          }

          return newState
        },
        { ...state },
      )
    }

    case 'PANEL_TOGGLE': {
      if (!isObject(payload)) return state

      return {
        ...state,
        ...updateControl({ type: 'toggle', payload, state }),
      }
    }

    case 'PANEL_OPEN': {
      if (!isObject(payload)) return state

      return {
        ...state,
        ...updateControl({ type: 'open', payload, state }),
      }
    }

    case 'PANEL_CLOSE': {
      if (!isObject(payload)) return state

      return {
        ...state,
        ...updateControl({ type: 'close', payload, state }),
      }
    }

    case 'USER_LOGOUT':
      return {}

    default:
      return state
  }
}

export default reducer
