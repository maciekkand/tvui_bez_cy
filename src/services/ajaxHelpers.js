/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default (context) => {
  let query = ''
  const startOfDay = context.getters.getDay || new Date().setUTCHours(0,0,0,0)
  console.log('startOfDay = ', startOfDay)

  const startHour = context.getters.getStartHour || 3
  const endHour = context.getters.getEndHour || 24

  console.log('startHour = ', startHour)
  console.log('endHour = ', endHour)

  console.log('context.getters.getCategories = ', context.getters.getCategories)
  //console.log('context.getters.getCategories.length = ', context.getters.getCategories.length)

   const categories = context.getters.getCategories && context.getters.getCategories.length ? context.getters.getCategories : null
   console.log('categories = ', categories)

  // console.log('context.getters.getCategories.length = ', context.getters.getCategories.length > 0)

  //let categories = context.getters.getCategories
  // let categories = JSON.stringify(context.getters.getCategories)

  //categories = categories && categories.length ? JSON.stringify(categories) : []
  //categories = categories && categories.length ? categories : []

  //console.log('categories = ', categories)
  //console.log('typeof categories = ', typeof categories)

  //categories = categories === '[]' || categories === 'null' ? null : categories
  //categories = categories === [] || categories === null ? null : categories

  let stations = context.getters.getStations || LITERALS.START_STATIONS
  stations = JSON.stringify(stations)


  const start = startOfDay + startHour * 60 * 60 * 1000
  const end = startOfDay + endHour * 60 * 60 * 1000

















  //const end = day ? start + 24 * 60 * 60 * 1000 : start + (24 - new Date().getHours()) * 60 * 60 * 1000

  console.log('start = ', new Date(start))
  console.log('end = ', new Date(end))

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    console.log('%c queryCategoriesStations = ' + stations + ' ' + categories,  'color: orange')
    query = queryCategoriesStations
  }
  else if (categories) {
    console.log('%c queryCategories = ' + categories, 'color: orange')
    query = queryCategories
  }
  else if (stations && stations.length) {
    console.log('%c queryStations = ' + stations, 'color: orange')
    query = queryStations
  }
  else {
    console.log('%c queryHours', 'color: orange')
    query = `${queryHours}]}`
  }

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  console.log('urlString = ', urlString)
  return urlString
}
