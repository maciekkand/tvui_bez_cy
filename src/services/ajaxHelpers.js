/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default (context) => {
  let query = ''
  const day = context.getters.getDay
  const startHour = context.getters.getStartHour
  const endHour = context.getters.getEndHour
  const categories = JSON.stringify(context.getters.getCategories)
  const stations = JSON.stringify(context.getters.getStations)

  console.log('day = ', day)
  console.log('startHour = ', startHour)
  console.log('endHour = ', endHour)
  console.log('categories = ', categories)
  console.log('stations = ', stations)

  const start = new Date().setUTCHours(startHour || day * 24 + new Date().getHours(), 0, 0, 0)
  const end = new Date().setUTCHours(endHour || day * 24 + 24 + new Date().getHours(), 0, 0, 0)

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
  else if (stations) {
    query = queryStations
  }
  else {
    query = `${queryHours}]}`
  }

  //! const urlString = LITERALS.TV_LIST_PREFIX + queryHours + LITERALS.TV_LIST_SUFFIX
  //! const urlString = LITERALS.TV_LIST_PREFIX + queryStations + LITERALS.TV_LIST_SUFFIX

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  console.log('urlString = ', urlString)
  return urlString
}
