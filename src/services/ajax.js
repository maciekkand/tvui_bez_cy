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
          el.link = `<a href=${el.link} target="_blank">Link</a>`
        }
      })

      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('ERORAS:', err))
}


export const ajaxGetSelectedPrograms = (context, { day, startHour, endHour }) => {
  const url =
    `https://api.mlab.com/api/1/databases/tvui/collections/tvui1?s={id:1}q={$and:[{timestamp:{$gt:${startHour}}},{timestamp:{$lt:${endHour}}}]}&&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`

  console.log('url = ', url)

  axios.get(url)
    .then(res => {

      res.data.map((el, index) => {
        if (index < res.data.length - 2) {
          const totalMinutes = (res.data[index + 1].timestamp - el.timestamp) / (1000 * 60)
          const hours = parseInt(totalMinutes / 60)
          const minutes = totalMinutes % 60
          el.duration = hours + ':' + minutes
          el.link = `<a href=${el.link} target="_blank">Link</a>`
        }
      })

      console.log('res.data = ', res.data)

      context.commit('ADD_TODAYS_PROGRAMS', res.data)

    })
    .catch(err => console.log('My error: ', err))
}



export const daysForSelectBox = () => {
  const daysForSelectArray = []

  for (let index = 0; index < 7; index++) {
    const day = new Date().getTime() + index * 1000 * 60 * 60 * 24
    const dayString = new Date(day).toString().slice(0, 10)
    const startOfTodayTimestamp = new Date().setUTCHours(0, 0, 0, 0)
    const dayObj = {
      text: dayString,
      value: startOfTodayTimestamp
    }

    daysForSelectArray.push(dayObj)
  }
  return daysForSelectArray
}
