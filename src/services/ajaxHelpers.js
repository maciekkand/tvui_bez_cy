/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default ({ day, startHour, endHour, categories, stations }) => {
  let query = ''
  console.log('day = ', day)
  console.log('startHour = ', startHour)
  console.log('endHour = ', endHour)

  console.log('categories = ', categories)

  console.log('typeof categories = ', typeof categories)
  categories ? categories = JSON.stringify(categories) : null

  console.log('stations = ', stations)


  const todayStart = new Date().setUTCHours(0, 0, 0, 0)
  const todayEnd = new Date().setUTCHours(24, 0, 0, 0)
  const nowHour = todayStart + new Date().getHours() * 60 * 60 * 1000

  console.log('todayStart = ', new Date(todayStart))
  console.log('todayEnd = ', new Date(todayEnd))
  console.log('nowHour = ', new Date(nowHour))

  //const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${todayEnd}}}]}`
  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${todayEnd}}}`
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
