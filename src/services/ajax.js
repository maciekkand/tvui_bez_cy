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

            /*
            console.log('el.date = ', el.date)
            //let date = el.date.slice(8,10)
            //let monthNumber = el.date.slice(8,10)

            let date = new Date (el.date)
            let dayOfWeek = date.getDay()
            let dayOfMonth = date.getDate()

            const month = date.toLocaleString('en-us', { month: 'short' });
            // let month = date.getMonth()

            var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            let weekDay = date.toLocaleTimeString('en-us', {weekday: 'long'}).toString().substr(0, date.length - 10)
            // weekDay = weekDay.substr(0, date.length - 10)

            console.log('dayOfWeek = ', dayOfWeek)
            console.log('dayOfMonth = ', dayOfMonth)
            console.log('month = ', month)
            console.log('weekDay = ', weekDay)
            console.log('_______________________________')

            //days.add(el.dayString)
            */

          }
        })

        days = Array.from(days).sort()
        console.log('days = ', days)

        context.commit('ADD_TODAYS_PROGRAMS', res.data)
        context.commit('ADD_DAYS', days)
        //sessionStorage.setItem('todaysPrograms', JSON.stringify(res.data))
      })
      .catch(err => console.log('ERORAS:', err))
  }
}

export const ajaxAddSelectedPrograms = (context, { homeData, radius, allShops }) => {

  if (sessionStorage.getItem('homeGPSAndAddress')) {
    const sessionHomeGPSAndAddress = JSON.parse(sessionStorage.getItem('homeGPSAndAddress'))

    if (sessionHomeGPSAndAddress.city === homeData.city &&
      sessionHomeGPSAndAddress.street === homeData.street &&
      sessionHomeGPSAndAddress.streetNumber === homeData.streetNumber) {

      setTimeout(() => {
        context.commit('SHOW_LOADER', false)
      }, 0);

      return shopsFiltering(JSON.parse(sessionStorage.getItem('homeGPSAndAddress')), radius, allShops)
    }
  }

  axios.get(url)
    .then(res => {
      if (res.data.results[0].confidence < 9) {
        context.commit('SHOW_LOADER', false)
        alert('Nie ma takiej ulicy. Spróbuj jeszcze raz')
        return context.commit('FIND_SELECTED_SHOPS', [])
      }

      const homeGPSAndAddress = {
        lat: res.data.results[0].geometry.lat,
        lon: res.data.results[0].geometry.lng,
        city: homeData.city,
        street: homeData.street,
        streetNumber: homeData.streetNumber
      }

      sessionStorage.setItem('homeGPSAndAddress', JSON.stringify(homeGPSAndAddress))
      shopsFiltering(homeGPSAndAddress, radius, allShops)

    })
    .catch(err => console.log('My error: ', err))

  function shopsFiltering(homeGPSAndAddress, radius, allShops) {
    const shopsInRadius = filteredShops(homeGPSAndAddress, radius, allShops)

    context.commit('FIND_SELECTED_SHOPS', shopsInRadius)
    context.commit('SHOW_LOADER', false)
    context.commit('SHOW_TABLE', true)
  }
}

export const daysForSelectBox = () => {
  const daysForSelectArray = []

  for (let index = 0; index < 7; index++) {
    const day = new Date().getTime() + index * 1000 * 60 * 60 * 24
    const dayString = new Date(day).toString().slice(0,10)
    const dayObj = { text: dayString, value: '' }
    daysForSelectArray.push(dayObj)
  }
  return daysForSelectArray
}
