/* eslint-disable */
import axios from 'axios'
import constants from '../data/constants'

const initQuery = () => {
  const topStations = JSON.stringify(['TVP 1', 'TVP 2', 'TVN'])
  const nowHour = new Date().getTime() + 30 * 60 * 1000
  const nowMidnight = new Date().setUTCHours(24, 0, 0, 0)

  console.log('initQuery: nowHour = ', new Date(nowHour))
  console.log('initQuery: nowMidnight = ', new Date(nowMidnight))

  let query = 'https://api.mlab.com/api/1/databases/tvui/collections/tvui1?s={timestamp:1}&q='
  query += `{"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"channel":{$in:${topStations}}}]}]}`
  query += '&l=200&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI'

  console.log('query = ', query)

  return query
}

export const ajaxAddTodaysPrograms = context => {
  axios
    .get(initQuery())
    .then(res => {
      /*
      res.data.map((el, index) => {
        if (index < res.data.length - 2) {
          const totalMinutes = (res.data[index + 1].timestamp - el.timestamp) / (1000 * 60)
          const hours = parseInt(totalMinutes / 60)
          const minutes = totalMinutes % 60
          el.duration = hours + ':' + minutes
        }
      })
      */

      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('ERORAS:', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}

/* #region  */
/*
  Stwórz query w Studio 3T Query Builderze.
  Linijkę z okna Query skopiuj tu i:

    1) Dopisz: `q= na początku (z backtikiem !)
    2) wywal 'NumberLong i okrągłe nawiasy
    3) zamień timestampy na ${startHour} i ${endHour}
    4) wywal wszystkie spacje
    5) parametry fields i sortowania wpisz z ręki, bo tu są osobno
*/
/* #endregion */

export const ajaxGetSelectedPrograms = (context, { selectedDay, selectedStartHour, selectedEndHour, selectedCategories, selectedStations }) => {
  let query = ''

  const dayStartTimestamp = new Date().setUTCHours(0, 0, 0, 0) + selectedDay * 24 * 60 * 60 * 1000
  console.log('dayStartTimestamp = ', new Date(dayStartTimestamp))

  console.log('selectedStartHour = ', selectedStartHour)
  console.log('selectedEndHour = ', selectedEndHour)

  if (!selectedDay && !selectedStartHour) selectedStartHour = new Date().getHours() + (new Date().getMinutes() - 30) / 60
  else if (!selectedStartHour) selectedStartHour = 1

  console.log('selectedStartHour = ', selectedStartHour)

  if (!selectedEndHour) selectedEndHour = 24

  console.log('selectedEndHour = ', selectedEndHour)

  const startHour = dayStartTimestamp + selectedStartHour * 60 * 60 * 1000
  const endHour = dayStartTimestamp + selectedEndHour * 60 * 60 * 1000

  console.log('startHour = ', new Date(startHour))
  console.log('endHour = ', new Date(endHour))



  const arrSelectedCategories = JSON.stringify(selectedCategories)
  const arrSelectedStations = JSON.stringify(selectedStations)

  const queryHours = `s={timestamp:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}}]}`
  const queryHoursCategory = `s={timestamp:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}}]}]}`
  const queryHoursStations = `s={timestamp:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"channel":{$in:${arrSelectedStations}}}]}]}`
  const queryHoursCategoryStations = `s={timestamp:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}},{$and:[{"channel":{$in:${arrSelectedStations}}}]}]}]}`


  if (startHour && endHour && selectedCategories && selectedStations) {
    query = queryHoursCategoryStations
  }
  else if (startHour && endHour && selectedCategories) {
    query = queryHoursCategory
  }
  else if (startHour && endHour && selectedStations) {
    query = queryHoursStations
  }
  else if (startHour && endHour) {
    console.log('startHour && endHour')
    query = queryHours
  }
  else if (!startHour && !endHour) {
    console.log('!startHour && !endHour')
    query = initQuery()
  }

  const url = constants.TV_LIST_PREFIX + query + constants.TV_LIST_SUFFIX

  console.log('url = ', url)

  axios
    .get(url)
    .then(res => {
      res.data.map((el, index) => {
        /*
        if (index < res.data.length - 2) {
          const totalMinutes = (res.data[index + 1].timestamp - el.timestamp) / (1000 * 60)
          const hours = parseInt(totalMinutes / 60)
          const minutes = totalMinutes % 60
          el.duration = hours + ':' + minutes
        }
        */
      })

      if(res.data.length > 999) alert('Zawęż przedział czasu, ilość kanałów lub kategorii, bo teraz część późniejszych programów nie jest wyświetlana')
      console.log('ilość rekordów = ', res.data.length)
      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}
