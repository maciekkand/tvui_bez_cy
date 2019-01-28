import axios from 'axios'
import url from './ajaxHelpers'
import { LITERALS } from './constants'

export const ajaxAddTodaysPrograms = context => {
  axios
    .get(url())
    .then(res => {
      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('myError:', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}

// export const ajaxGetSelectedPrograms = (context, { selectedDay, selectedStartHour, selectedEndHour, selectedCategories, selectedStations }) => {
export const ajaxGetSelectedPrograms = (context, searchData) => {

  console.log('Tu ajaxGetSelectedPrograms')
  console.log('searchData = ', searchData)

  axios
    .get(url(searchData))
    .then(res => {
      if (res.data.length > 999) alert('Zawęż przedział czasu, ilość kanałów lub kategorii, bo teraz część późniejszych programów nie jest wyświetlana')
      context.commit('ADD_TODAYS_PROGRAMS', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}

export const ajaxFindText = (context, text) => {
  const query = `s={timestamp:1}&q={"title":{"$regex":".*${text}.*",$options:"i"}}`
  const urlFindText = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX

  axios
    .get(urlFindText)
    .then(res => {
      context.commit('AJAX_FIND_TEXT', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}
