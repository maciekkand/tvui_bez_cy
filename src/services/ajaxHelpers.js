/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default ({ day, startHour, endHour, categories, stations }) => {
  let query = ''
  console.log('day = ', day)
  console.log('startHour = ', Boolean(startHour))
  console.log('typeof startHour = ', typeof startHour)
  console.log('endHour = ', Boolean(endHour))

  categories ? (categories = JSON.stringify(categories)) : null

  const hours24 = 24 * 60 * 60 * 1000

  const startDay = new Date().setUTCHours(0, 0, 0, 0) + day * hours24
  console.log('startDay = ', new Date(startDay))

  const start = new Date().setUTCHours(startHour || day * 24 + new Date().getHours(), 0, 0, 0)
  const end   = new Date().setUTCHours(endHour   || day * 24 + 24 + new Date().getHours(), 0, 0, 0)

  //const end = endHour ? start + endHour * 60 * 60 * 1000 : new Date().setUTCHours(24, 0, 0, 0)

  console.log('start = ', new Date(start))
  console.log('end = ', new Date(end))






  //const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${todayEnd}}}]}`
  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lt:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    console.log('****** queryCategoriesStations')
    query = queryCategoriesStations
  }
 else if (categories) {
    console.log('****** queryCategories')
    query = queryCategories
  }
 else if (stations) {
    console.log('****** queryStations')
    query = queryStations
  }
 else {
    console.log('****** queryHours')
    query = `${queryHours}]}`
  }

  //! const urlString = LITERALS.TV_LIST_PREFIX + queryHours + LITERALS.TV_LIST_SUFFIX
  //! const urlString = LITERALS.TV_LIST_PREFIX + queryStations + LITERALS.TV_LIST_SUFFIX

  //const urlString = LITERALS.TV_LIST_PREFIX + queryCategoriesStations + LITERALS.TV_LIST_SUFFIX
  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  console.log('urlString = ', urlString)
  return urlString
}
