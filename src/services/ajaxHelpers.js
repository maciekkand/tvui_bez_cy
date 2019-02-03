import { LITERALS } from './constants'

export default context => {
  let query = ''
  const minutes = 60 * 1000
  const day = context.getters.getDay
  //const startOfDay = context.getters.getDay || new Date().setUTCHours(0, 0, 0, 0)
  const startOfDay = day || new Date().setUTCHours(0, 0, 0, 0)
  let startHour = context.getters.getStartHour
  const endHour = context.getters.getEndHour || 24
  let categories = context.getters.getCategories
  let stations = context.getters.getStations

  if (!startHour && (!day || new Date(day).getDate() === new Date().getDate())) {
    startHour = new Date().getHours()
  }

  //const start = startOfDay + (startHour - 0.5) * 60 * 60 * 1000
  //const start = startOfDay + startHour * 60 * 60 * 1000
  //console.log('%c new Date().getMinutes() = ' + new Date().getMinutes(), 'color: white')

  const start = startOfDay + startHour * 60 * minutes + (new Date().getMinutes() - 30) * minutes
  console.log('%c start = ' + new Date(start), 'color: white')
  console.log('%c new Date().getMinutes() - 30 = ' + (new Date().getMinutes() - 30), 'color: white')

  const end = startOfDay + endHour * 60 * minutes

  //console.log('%c start = ' + new Date(start), 'color: yellow')
  //console.log('%c end = ' + new Date(end), 'color: yellow')

  categories = categories && categories.length ? JSON.stringify(categories) : null
  stations = stations ? encodeURIComponent(JSON.stringify(stations)) : null

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    query = queryCategoriesStations
  }
  else if (categories) {
    query = queryCategories
  }
  else if (stations && stations.length) {
    query = queryStations
  }
  else {
    query = `${queryHours}]}`
  }

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX
  //console.log('%c urlString = ' + urlString, 'color: lime')

  return urlString
}
