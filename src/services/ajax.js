/* eslint-disable */
import axios from 'axios'
import constants from '../data/constants'

export const ajaxAddTodaysPrograms = context => {
  let days = new Set()

  axios
    .get(constants.TV_LIST)
    .then(res => {

      res.data.map((el, index) => {
        if (index < res.data.length - 2) {
          const totalMinutes = (res.data[index + 1].timestamp - el.timestamp) / (1000 * 60)
          const hours = parseInt(totalMinutes / 60)
          const minutes = totalMinutes % 60
          el.duration = hours + ':' + minutes
          //el.link = `<a href=${el.link} target="_blank">Link</a>`
        }
      })

      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('ERORAS:', err))
}


export const ajaxGetSelectedPrograms = (context, { day, startHour, endHour }) => {
  console.log('startHour = ', startHour)
  console.log('endHour = ', endHour)

  const d = new Date()

  console.log('startHour = ', new Date(startHour + d.getTimezoneOffset() * 60 * 1000))
  console.log('endHour = ', new Date(endHour + d.getTimezoneOffset() * 60 * 1000))


/// const query   = 'q={$and:[{timestamp:{$gt:1548194400000}},{timestamp:{$lt:1548198000000}}]}&f={date:0,dateTimestamp:0,tvHour:0}&s={id:1}'

/// const query = `q={$and:[{timestamp:{$gt:${startHour}}},{timestamp:{$lt:${endHour}}}]}&f={date:0,dateTimestamp:0,tvHour:0}&s={id:1}`


    const query = `q={$and:[{timestamp:{$gt:${startHour}}},{timestamp:{$lt:${endHour}}}]}&f={tvHour:0}&s={id:1}`



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
          //el.link = `<a href=${el.link} target="_blank">Link</a>`
        }
      })

      console.log('res.data = ', res.data)

      context.commit('ADD_TODAYS_PROGRAMS', res.data)

    })
    .catch(err => console.log('My error: ', err))
}


