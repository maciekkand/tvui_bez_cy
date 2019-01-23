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
  3) zamień timestampy na ${startHour} i ${endHour}
  4) wywal wszystkie spacje
  */

 /// const query = `q={"timestamp":{$gte:1548306000000},$and:[{"timestamp":{$lt:1548320400000}},{$and:[{"category":{$in:['serial']}}]}]}`
 /// const query = `q={"timestamp":{$gte:1548306000000},$and:[{"timestamp":{$lt:1548320400000}},{$and:[{"category":{$in:['serial']}}]}]}`

 /// const query = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:['serial']}}]}]}`

 console.log('arrSelectedStations = ', arrSelectedStations)

 /// const query = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}}]}]}`

 /// const query = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}},{$and: [{"channel":"TVP 2"}] }]}]}`

 // const query = `q={ "timestamp": { $gte: ${startHour}  }, $and: [ { "timestamp": { $lt: ${endHour}   } }, { $and: [ { "category": { $in: ${arrSelectedCategories}  } }, { $and: [ { "channel": { $in:  ${arrSelectedStations}    } } ] } ] } ] }`


 //const query = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}},{$and:[{"channel":{$in:${arrSelectedStations}}}]}]}]}`






 const queryHours = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}}]}`
 const queryHoursCategory = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}}]}]}`

 //const queryHoursCategoryStations = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}},{$and:[{"channel":{$in:${arrSelectedStations}}}]}]}]}`

// '{ "timestamp": { $gte: NumberLong(1548306000000) }, $and: [ { "timestamp": { $lt: NumberLong(1548320400000) } }, { $and: [ { "category": { $in: ['serial','inne'] } } ] } ] }'


 // const queryHoursCategoryStations = `q={ "timestamp": { $gte: ${startHour}   }, $and: [ { "timestamp": { $lt:  ${endHour}   } }, { $and: [ { "category": { $in:  ${arrSelectedCategories}    } }, { $and: [ { "channel": { $in:   ${arrSelectedStations}     } } ] } ] } ] }`

 const queryHoursCategoryStations = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}},{$and:[{"channel":{$in:${arrSelectedStations}}}]}]}]}`


// https://api.mlab.com/api/1/databases/tvui/collections/tvui1?q={%22timestamp%22:{$gte:1548306000000},$and:[{%22timestamp%22:{$lt:1548320400000}},{$and:[{%22category%22:{$in:[%22serial%22,%22inne%22]}},{$and:[{%22channel%22:{$in:[%22tvp2%22]}}]}]}]}&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI





  // const url = constants.TV_LIST_PREFIX + query1 + query2 + query3 + constants.TV_LIST_SUFFIX
  const url = constants.TV_LIST_PREFIX + queryHoursCategoryStations + constants.TV_LIST_SUFFIX

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
