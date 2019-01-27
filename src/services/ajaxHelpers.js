import { START_STATIONS, CATEGORY_NAMES, TV_LIST_PREFIX, TV_LIST_SUFFIX } from './constants'

export const query = context => {
  let query = ''
  let selectedStations = localStorage.getItem('stations') || START_STATIONS
  //let selectedCategories = localStorage.getItem('categories') || CATEGORY_NAMES

  let selectedCategories = localStorage.getItem('categories')
  // let selectedCategories = null

  //console.log(' localStorage.getItem(categories) = ', localStorage.getItem('categories'))
  //console.log('CATEGORY_NAMES = ', CATEGORY_NAMES)

  const nowHour = new Date().getTime() + 5 * 60 * 1000
  const nowMidnight = new Date().setUTCHours(24, 0, 0, 0)

  const queryHoursCategoryStations = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"category":{$in:${selectedCategories}}},{$and:[{"channel":{$in:${selectedStations}}}]}]}]}`
  const queryHoursCategories = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"channel":{$in:${selectedCategories}}}]}]}`
  const queryHoursStations = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"channel":{$in:${selectedStations}}}]}]}`
  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}}]}`

  // const queryHoursCategoryStations = `s={timestamp:1}&q={"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"category":{$in:${selectedCategories}}},{$and:[{"channel":{$in:${selectedStations}}}]}]}]}`

  if (selectedCategories && selectedStations) {
    console.log('****** selectedCategories && selectedStations')
    query = queryHoursCategoryStations
  } else if (selectedCategories) {
    console.log('****** selectedCategories')
    query = queryHoursCategories
  } else if (selectedStations) {
    console.log('****** selectedStations')
    query = queryHoursStations
  } else {
    console.log('****** queryHours')
    query = queryHours
  }

  const url = TV_LIST_PREFIX + query + TV_LIST_SUFFIX
  console.log('url = ', url)

  return url
}



