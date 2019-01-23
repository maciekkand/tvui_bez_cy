/* eslint-disable */
import axios from 'axios'
import constants from '../data/constants'

export const ajaxAddTodaysPrograms = context => {
  axios
    .get(constants.TV_LIST)
    .then(res => {

      res.data.map((el, index) => {
        if (index < res.data.length - 2) {
          const totalMinutes = (res.data[index + 1].timestamp - el.timestamp) / (1000 * 60)
          const hours = parseInt(totalMinutes / 60)
          const minutes = totalMinutes % 60
          el.duration = hours + ':' + minutes
        }
      })

      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('ERORAS:', err))
}

export const ajaxGetSelectedPrograms = (context, { day, startHour, endHour, selectedCategories, selectedStations }) => {
  console.log('selectedStations = ', selectedStations) // todo: tu jest ok, ruszaj stąd

  const arrSelectedCategories = JSON.stringify(selectedCategories)
  const arrSelectedStations = JSON.stringify(selectedStations)

  const query1 = `q={$and:[{timestamp:{$gt:${startHour}}},{timestamp:{$lt:${endHour}}`
  //const query2 = selectedCategories && selectedCategories.length ? `,category:{$in:${arrSelectedCategories}}}]}}` : ''
  const query2 = selectedCategories && selectedCategories.length ? `,category:{$in:${arrSelectedCategories}}` : ''

  const query3 = selectedStations && selectedStations.length ? `,stations:{$in:${arrSelectedStations}}}]}}` : ''

  // { "timestamp": { $gte: NumberLong(1548306000000) }, $and: [ { "timestamp": { $lt: NumberLong(1548320400000) } }, { $and: [ { "category": { $in: ['serial'] } } ] } ] }

  /*
  1) Dopisz: `q= na początku (z backtikiem !)
  2) wywal 'NumberLong i okrągłe nawiasy
  3) wywal wszystkie spacje
  4) zamień timestampy na ${startHour} i ${endHour}
  */

 /// const query = `q={"timestamp":{$gte:1548306000000},$and:[{"timestamp":{$lt:1548320400000}},{$and:[{"category":{$in:['serial']}}]}]}`

 /// const query = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:['serial']}}]}]}`

 console.log('arrSelectedCategories = ', arrSelectedCategories)

 /// const query = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}}]}]}`

 const query = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}},{$and:[{"channel":"TVP 2"}]}]}]}`

 //{ "timestamp": { $gte: NumberLong(1548306000000) }, $and: [ { "timestamp": { $lt: NumberLong(1548320400000) } }, { $and: [ { "category": { $in: ['serial'] } }, { $and: [ { "channel": "TVP 2" } ] } ] } ] }


  // const url = constants.TV_LIST_PREFIX + query1 + query2 + query3 + constants.TV_LIST_SUFFIX
  const url = constants.TV_LIST_PREFIX + query + constants.TV_LIST_SUFFIX

  console.log('url = ', url)



  axios.get(url)
    .then(res => {
      res.data.map((el, index) => {
        if (index < res.data.length - 2) {
          const totalMinutes = (res.data[index + 1].timestamp - el.timestamp) / (1000 * 60)
          const hours = parseInt(totalMinutes / 60)
          const minutes = totalMinutes % 60
          el.duration = hours + ':' + minutes
        }
      })
      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('My error: ', err))
}
