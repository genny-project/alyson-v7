import { forEach, pathOr } from 'ramda'

const extendBoundsFromData = ({ dataPoints, bounds }) =>
  forEach(point => {
    const { lat, lng } = pathOr({}, ['geometry', 'location'], point)
    bounds.extend({ lat: lat(), lng: lng() })
  }, dataPoints)

export default extendBoundsFromData
