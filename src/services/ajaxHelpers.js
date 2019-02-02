/* eslint-disable prettier/prettier */
import { LITERALS } from './constants'

export default (context) => {
  let query = ''
  let startHour = null
  const startOfDay = context.getters.getDay || new Date().setUTCHours(0,0,0,0)
  console.log('%c  context.getters.getDay = '+  context.getters.getDay, 'color: orange')


  if ((!context.getters.getDay || new Date(context.getters.getDay).getDate() === new Date().getDate())) {
    startHour = new Date().getHours()
    console.log('%c startHour = '+ startHour, 'color: lime')
  }
  else {
    startHour = context.getters.getStartHour || 3
    console.log('%c startHour = '+ startHour, 'color: lime ')
  }

  const endHour = context.getters.getEndHour || 24

  const start = startOfDay + startHour * 60 * 60 * 1000
  const end = startOfDay + endHour * 60 * 60 * 1000

  console.log('start = ', new Date(start))
  console.log('end = ', new Date(end))

  const categories = context.getters.getCategories && context.getters.getCategories.length ? JSON.stringify(context.getters.getCategories) : null

  let stations = context.getters.getStations // || LITERALS.START_STATIONS
  stations = stations ?  encodeURIComponent(JSON.stringify(stations)) : null
  //stations = encodeURIComponent(stations)

  console.log('%c stations = '+ stations, 'color: yellow')

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}`
  const queryStations = `${queryHours},{$and:[{"channel":{$in:${stations}}}]}]}`
  const queryCategories = `${queryHours},{$and:[{"category":{$in:${categories}}}]}]}`
  const queryCategoriesStations = `${queryHours},{$and:[{"category":{$in:${categories}}},{$and:[{"channel":{$in:${stations}}}]}]}]}`

  if (categories && stations) {
    // console.log('%c queryCategoriesStations = ' + stations + ' ' + categories,  'color: orange')
    query = queryCategoriesStations
  }
  else if (categories) {
    // console.log('%c queryCategories = ' + categories, 'color: orange')
    query = queryCategories
  }
  else if (stations && stations.length) {
    // console.log('%c queryStations = ' + stations, 'color: orange')
    query = queryStations
  }
  else {
    // console.log('%c queryHours', 'color: orange')
    query = `${queryHours}]}`
  }

  const urlString = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  console.log('urlString = ', urlString)
  return urlString
}
