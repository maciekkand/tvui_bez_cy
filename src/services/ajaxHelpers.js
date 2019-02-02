/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default (context, stationsList) => {
  let query = ''
  const day = context.getters.getDay
  const startHour = context.getters.getStartHour
  const endHour = context.getters.getEndHour
  let categories = JSON.stringify(context.getters.getCategories)
  let stations = stationsList || JSON.stringify(context.getters.getStations)

  categories = categories === '[]' || categories === 'null' ? null : categories
  stations = stations === 'null' ? null : stations

  const start = new Date().setUTCHours(day * 24 + startHour || day * 24 + new Date().getHours(), 0, 0, 0)
  const end = day ? start + 24 * 60 * 60 * 1000 : start + (24 - new Date().getHours()) * 60 * 60 * 1000

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    // console.log('%c queryCategoriesStations', 'color: orange')
    query = queryCategoriesStations
  }
  else if (categories) {
    // console.log('%c queryCategories' + categories, 'color: orange')
    query = queryCategories
  }
  else if (stations) {
    // console.log('%c queryStations' + stations, 'color: orange')
    query = queryStations
  }
  else {
    // console.log('%c queryHours', 'color: orange')
    query = `${queryHours}]}`
  }

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  // console.log('urlString = ', urlString)
  return urlString
}
