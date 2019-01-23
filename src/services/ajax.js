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

/*
  Stwórz query w Studio 3T Query Builderze.
  Linijkę z okna Query skopiuj tu i:

    1) Dopisz: `q= na początku (z backtikiem !)
    2) wywal 'NumberLong i okrągłe nawiasy
    3) zamień timestampy na ${startHour} i ${endHour}
    4) wywal wszystkie spacje
    5) parametry fields i sortowania wpisz z ręki, bo tu są osobno
*/
export const ajaxGetSelectedPrograms = (context, { day, startHour, endHour, selectedCategories, selectedStations }) => {
  let query = ''
  const arrSelectedCategories = JSON.stringify(selectedCategories)
  const arrSelectedStations = JSON.stringify(selectedStations)

  //const queryHours = `q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}}]}`

  const queryHours = `s={id:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}}]}`

  const queryHoursCategory = `s={id:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}}]}]}`

  const queryHoursCategoryStations = `s={id:1}&q={"timestamp":{$gte:${startHour}},$and:[{"timestamp":{$lt:${endHour}}},{$and:[{"category":{$in:${arrSelectedCategories}}},{$and:[{"channel":{$in:${arrSelectedStations}}}]}]}]}`

  if(startHour && endHour && selectedCategories && selectedStations) {
    query = queryHoursCategoryStations
  }
  else if(startHour && endHour && selectedCategories) {
    query = queryHoursCategory
  }
  else if(startHour && endHour) {
    query = queryHours
  }

  const url = constants.TV_LIST_PREFIX + query + constants.TV_LIST_SUFFIX

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
