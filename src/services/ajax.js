/* eslint-disable */
import axios from 'axios'
import constants from '../data/constants'

const initQuery = () => {
  const topStations = JSON.stringify(['TVP 1', 'TVP 2', 'TVN', 'POLSAT'])
  const nowHour = new Date().getTime() + 30 * 60 * 1000
  const nowMidnight = new Date().setUTCHours(24, 0, 0, 0)

  let query = 'https://api.mlab.com/api/1/databases/tvui/collections/tvui1?s={timestamp:1}&q='
  query += `{"timestamp":{$gte:${nowHour}},$and:[{"timestamp":{$lt:${nowMidnight}}},{$and:[{"channel":{$in:${topStations}}}]}]}`
  query += '&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI'

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

export const ajaxGetSelectedPrograms = (context, { day, startHour, endHour, selectedCategories, selectedStations }) => {
  let query = ''
  const arrSelectedCategories = JSON.stringify(selectedCategories)
  const arrSelectedStations = JSON.stringify(selectedStations)

  const queryHours = `s={time:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}}]}`
  const queryHoursCategory = `s={time:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}}]}]}`
  const queryHoursStations = `s={time:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"channel":{$in:${arrSelectedStations}}}]}]}`
  const queryHoursCategoryStations = `s={time:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}},{$and:[{"channel":{$in:${arrSelectedStations}}}]}]}]}`

  console.log('startHour = ', new Date(startHour))
  console.log('endHour = ', new Date(endHour))

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
    query = queryHours
  }
  else if (!startHour && !endHour) {
    query = initQuery()
  }

  const url = constants.TV_LIST_PREFIX + query + constants.TV_LIST_SUFFIX

  axios
    .get(url)
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
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}
