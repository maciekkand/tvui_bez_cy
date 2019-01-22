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

  const query1 = `q={$and:[{timestamp:{$gt:${startHour}}},{timestamp:{$lt:${endHour}},`
  const query2 = selectedCategories && selectedCategories.length ? `category:{$in:${arrSelectedCategories}}}]}` : ''
  const query3 = `}]}`

  const url = constants.TV_LIST_PREFIX + query1 + query2 + query3 + constants.TV_LIST_SUFFIX

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
