/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default ({ day, startHour, endHour, categories, stations }) => {
  console.log('day = ', day)
  console.log('startHour = ', startHour)
  console.log('endHour = ', endHour)
  console.log('categories = ', categories)
  console.log('stations = ', stations)

  let query = ''

  //const selectedStations = localStorage.getItem('stations') || LITERALS.START_STATIONS
  const selectedStations = localStorage.getItem('stations')

  const selectedCategories = localStorage.getItem('categories')

  const hour = new Date().getTime() + 5 * 60 * 1000
  const midnight = new Date().setUTCHours(24, 0, 0, 0)

  //const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}}]}`
  //const queryHoursStations = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"channel":{$in:${selectedStations}}}]}]}`
  //const queryHoursCategories = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"channel":{$in:${selectedCategories}}}]}]}`
  //const queryHoursCategoryStations = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"category":{$in:${selectedCategories}}},{$and:[{"channel":{$in:${selectedStations}}}]}]}]}`

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

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX
  console.log('url = ', url)

  return urlString
}
