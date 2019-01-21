/* eslint-disable */
import axios from 'axios'
//import filteredShops from './filteredShops'
import constants from '../data/constants'

export const ajaxAddTodaysPrograms = context => {
  //if (sessionStorage.getItem('allShops')) {
  let days = new Set()

  if (false) {
    context.commit('ADD_ALL_SHOPS', JSON.parse(sessionStorage.getItem('allShops')))
  }
  else {
    axios
      .get(constants.TV_LIST)
      .then(res => {
        res.data.map(el => {
          el.title = `<b-button size="lg" variant="secondary" >${el.title}</b-button>`
          el.link = `<a href=${el.link} target="_blank">Link</a>`
        })

        res.data.map((el, index) => {
          if (index < res.data.length - 2 ) {
            const totalMinutes = (res.data[index+1].timestamp - el.timestamp) / (1000 * 60)
            const hours = parseInt(totalMinutes / 60)
            const minutes = totalMinutes % 60
            el.duration = hours + ':' + minutes
          }
        })

        context.commit('ADD_TODAYS_PROGRAMS', res.data)
        //sessionStorage.setItem('todaysPrograms', JSON.stringify(res.data))
      })
      .catch(err => console.log('ERORAS:', err))
  }
}

export const ajaxGetSelectedPrograms = (context, { day, startHour, endHour }) => {
  const url = 'https://api.mlab.com/api/1/databases/tvui/collections/tvui1?s={id:1}q={$and:[{timestamp:{$gt:${startHour}}},{timestamp:{$lt: ${endHour}}}]}&&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI'

  console.log('url = ', url)

  axios.get(url)
    .then(res => {
      console.log('res.data = ', res.data)
    })
    .catch(err => console.log('My error: ', err))
}



export const daysForSelectBox = () => {
  const daysForSelectArray = []

  for (let index = 0; index < 7; index++) {
    const day = new Date().getTime() + index * 1000 * 60 * 60 * 24
    const dayString = new Date(day).toString().slice(0,10)
    const startOfTodayTimestamp = new Date().setUTCHours(0,0,0,0)
    const dayObj = { text: dayString, value: startOfTodayTimestamp }

    daysForSelectArray.push(dayObj)
  }
  return daysForSelectArray
}
