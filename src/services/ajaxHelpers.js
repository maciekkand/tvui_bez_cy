/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default (context) => {
  let query = ''
  const day = context.getters.getDay
  const startHour = context.getters.getStartHour
  const endHour = context.getters.getEndHour
  let categories = JSON.stringify(context.getters.getCategories)
  let stations = JSON.stringify(context.getters.getStations)

  categories = categories === '[]' || categories === 'null' ? null : categories
  stations = stations === 'null' ? null : stations

  /*
  console.log('day = ', day)
  console.log('startHour = ', startHour)
  console.log('endHour = ', endHour)
  console.log('categories = ', categories)
  console.log('stations = ', stations)
 */

  const start = new Date().setUTCHours((day * 24 + startHour) || day * 24 + new Date().getHours(), 0, 0, 0)
  const end = new Date().setUTCHours((day * 24 + endHour) || day * 24 + 24 + new Date().getHours(), 0, 0, 0)

  /*
  console.log('start = ', start)
  console.log('end = ', end)

  console.log('start = ', new Date(start))
  console.log('end = ', new Date(end))
 */

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    console.log('queryCategoriesStations')
    query = queryCategoriesStations
  }
  else if (categories) {
    console.log('queryCategories')
    query = queryCategories
  }
  else if (stations) {
    console.log('queryStations')
    query = queryStations
  }
  else {
    console.log('queryHours')
    query = `${queryHours}]}`
  }

  //! const urlString = LITERALS.TV_LIST_PREFIX + queryHours + LITERALS.TV_LIST_SUFFIX
  //! const urlString = LITERALS.TV_LIST_PREFIX + queryStations + LITERALS.TV_LIST_SUFFIX

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  console.log('urlString = ', urlString)
  return urlString
}
