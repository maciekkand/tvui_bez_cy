/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default (context, stationsList) => {
  //console.log('stationsList = ', stationsList)
  let query = ''
  const day = context.getters.getDay
  const startHour = context.getters.getStartHour
  const endHour = context.getters.getEndHour
  let categories = JSON.stringify(context.getters.getCategories)
  let stations = stationsList || JSON.stringify(context.getters.getStations)

  categories = categories === '[]' || categories === 'null' ? null : categories
  stations = stations === 'null' ? null : stations

  /*
  console.log('day = ', day)
  console.log('startHour = ', startHour)
  console.log('endHour = ', endHour)
  console.log('categories = ', categories)
  console.log('stations = ', stations)
  */

  console.clear()
  //const start = new Date().setUTCHours(day * 24 + startHour || day * 24 + new Date().getHours(), 0, 0, 0)

  console.log('day = ', day)
  console.log('startHour = ', startHour)
  console.log('endHour = ', endHour)

  /* const hours1 = day * 24 + endHour
  const hours2 = day * 24 + 24 + new Date().getHours()

  console.log('hours1 = ', hours1)
  console.log('hours2 = ', hours2) */

  //const end = new Date().setUTCHours(day * 24 + endHour || day * 24 + 24 + new Date().getHours(), 0, 0, 0)
  const start = new Date().setUTCHours(day * 24 + startHour || day * 24 + new Date().getHours(), 0, 0, 0)
  const end = day ? start + 24 * 60 * 60 * 1000 : start + (24 - new Date().getHours()) * 60 * 60 * 1000

  console.log('start = ', start)
  console.log('end = ', end)





  // console.log('start = ', new Date(start).toString().slice(4,24))
  console.log('%c start = ' + new Date(start).toString().slice(4, 24), 'color: yellow')
  console.log('%c end = ' + new Date(end).toString().slice(4, 24), 'color: yellow')

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    console.log('%c queryCategoriesStations', 'color: orange')
    query = queryCategoriesStations
  }
  else if (categories) {
    console.log('queryCategories')
    console.log('%c queryCategories' + categories, 'color: orange')
    query = queryCategories
  }
  else if (stations) {
    console.log('%c queryStations' + stations, 'color: orange')
    query = queryStations
  }
  else {
    console.log('%c queryHours', 'color: orange')
    query = `${queryHours}]}`
  }

  //! const urlString = LITERALS.TV_LIST_PREFIX + queryHours + LITERALS.TV_LIST_SUFFIX
  //! const urlString = LITERALS.TV_LIST_PREFIX + queryStations + LITERALS.TV_LIST_SUFFIX

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  console.log('urlString = ', urlString)
  return urlString
}
