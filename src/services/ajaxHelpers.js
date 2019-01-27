/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default ({ day, startHour, endHour, categories, stations }) => {
  const query = ''
  console.log('day = ', day)
  console.log('startHour = ', startHour)
  console.log('endHour = ', endHour)
  console.log('categories = ', categories)
  console.log('stations = ', stations)

  const todayStart = new Date().setUTCHours(-1, 0, 0, 0)
  const todayEnd = new Date().setUTCHours(23, 0, 0, 0)
  const nowHour = todayStart + new Date().getHours() * 60 * 60 * 1000

  console.log('todayStart = ', new Date(todayStart))
  console.log('todayEnd = ', new Date(todayEnd))
  console.log('nowHour = ', new Date(nowHour))

  //const startDay = todayStart + day * 24 * 60 * 60 * 1000

  //const selectedStations = localStorage.getItem('stations') || LITERALS.START_STATIONS
  //const selectedStations = localStorage.getItem('stations')

  //const selectedCategories = localStorage.getItem('categories')

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${todayEnd}}}]}`
  //const queryHoursStations = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"channel":{$in:${selectedStations}}}]}]}`
  //const queryHoursCategories = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"channel":{$in:${selectedCategories}}}]}]}`
  //const queryHoursCategoryStations = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"category":{$in:${selectedCategories}}},{$and:[{"channel":{$in:${selectedStations}}}]}]}]}`

  /*
  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}}`
  const queryCategories = `,{$and:[{"channel":{$in:${categories}}}]}]}`
  const queryStations = `,{$and:[{"channel":{$in:${stations}}}]}`
  const queryCategoriesStations = `,{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  const querySuffix = ']}'

  if (selectedCategories && selectedStations) {
    console.log('****** selectedCategories && selectedStations')
    query = queryCategoryStations
  }
 else if (selectedCategories) {
    console.log('****** selectedCategories')
    query = queryHoursCategories
  }
 else if (selectedStations) {
    console.log('****** selectedStations')
    query = queryHoursStations
  }
 else {
    console.log('****** queryHours')
    query = queryHours
  }

  */

  const urlString = LITERALS.TV_LIST_PREFIX + queryHours + LITERALS.TV_LIST_SUFFIX
  console.log('urlString = ', urlString)

  return urlString
}
