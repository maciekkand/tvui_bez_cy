/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default ({ day, startHour, endHour, categories, stations } =
  { day: null, startHour: null, endHour: null, categories: null,
    stations: JSON.stringify(LITERALS.START_STATIONS)}) => {

  let query = ''
  //console.log('day = ', day)
  //console.log('startHour = ', startHour)
  //console.log('endHour = ', endHour)

  categories ? (categories = JSON.stringify(categories)) : null

  const start = new Date().setUTCHours(startHour || day * 24 + new Date().getHours(), 0, 0, 0)
  const end = new Date().setUTCHours(endHour || day * 24 + 24 + new Date().getHours(), 0, 0, 0)

  const x = new Date().setUTCHours(startHour, 0, 0, 0)
  const y = new Date().setUTCHours(day * 24 + new Date().getHours(), 0, 0, 0)

  //console.log('x = ', new Date(x))
  //console.log('y = ', new Date(y))

  //console.log('start = ', new Date(start))
  //console.log('end = ', new Date(end))

  //const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${todayEnd}}}]}`
  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    //console.log('****** queryCategoriesStations')
    query = queryCategoriesStations
  }
  else if (categories) {
    //console.log('****** queryCategories')
    query = queryCategories
  }
  else if (stations) {
    //console.log('****** queryStations')
    query = queryStations
  }
  else {
    //console.log('****** queryHours')
    query = `${queryHours}]}`
  }

  //! const urlString = LITERALS.TV_LIST_PREFIX + queryHours + LITERALS.TV_LIST_SUFFIX
  //! const urlString = LITERALS.TV_LIST_PREFIX + queryStations + LITERALS.TV_LIST_SUFFIX

  //const urlString = LITERALS.TV_LIST_PREFIX + queryCategoriesStations + LITERALS.TV_LIST_SUFFIX
  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  //console.log('urlString = ', urlString)
  return urlString
}
