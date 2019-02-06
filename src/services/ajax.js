import axios from 'axios'
import url from './ajaxHelpers'
import { LITERALS } from './constants'

export const ajaxGetSelectedPrograms = context => {
  axios
    .get(url(context))
    .then(res => {
      // context.commit('SET_LOADING', false)
      if (res.data.length > 999) alert(LITERALS.EXCESSIVE_DATA_MSG)
      console.log('%c res.data.length = ' + res.data.length, 'color: violet')

      context.commit('GET_DOCUMENTS_COUNT', res.data.length)
      context.commit('START_STATIONS', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}

export const ajaxFindText = (context, text) => {
  let query = ''
  const minutes = 60 * 1000
  const day = context.getters.getDay
  const startOfDay = day || new Date().setUTCHours(0, 0, 0, 0)
  let startHour = context.getters.getStartHour
  const endHour = context.getters.getEndHour || 24

  if (!startHour && (!day || new Date(day).getDate() === new Date().getDate())) {
    startHour = new Date().getHours()
  }

  const start = startOfDay + startHour * 60 * minutes - 30 * minutes
  const end = startOfDay + endHour * 60 * minutes

  const queryTextFragment = `$or:[{"type":{"$regex":".*${text}.*",$options:"i"}},{"title":{"$regex":".*${text}.*",$options:"i"}}]`
  const queryHoursText = `s={timestamp:1}&q={"timestamp":{$gte:${start}},$and:[{"timestamp":{$lte:${end}}}],` + queryTextFragment + `}`
  const queryText = `s={timestamp:1}&q={$or:[{"type":{"$regex":".*${text}.*",$options:"i"}},{"title":{"$regex":".*${text}.*",$options:"i"}}]}`

  query = !day && !context.getters.getStartHour && !context.getters.getStartHour ? queryText : queryHoursText

  const urlTextSearch = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX
  console.log('%c urlTextSearch = ' + urlTextSearch, 'color: lime')

  axios
    .get(urlTextSearch)
    .then(res => {
      console.log('%c res.data = ' + res.data.length, 'color: white')
      context.commit('GET_DOCUMENTS_COUNT', res.data.length)
      context.commit('SHOW_CATEGORIES', false)
      context.commit('AJAX_FIND_TEXT', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('SET_LOADING', false)
    })
}

export const sendEmail = (email, favorites) => {
  let html = ''
  const subject = LITERALS.EMAIL_SUBJECT
  const proxy = LITERALS.EMAIL_PROXY

  favorites.map(el => {
    html += '<h4>' + el.dayString + ' ' + el.time + ' ' + el.channel + ' ' + el.title + '</h4>'
  })

  html = 'Wybrane przez Ciebie programy na najbliższy tydzień:' + html
  console.log('%c html = ' + html, 'color: lightblue')

  const mailUrl = proxy + '?to=' + email + '&subject=' + subject + '&html=' + html
  console.log('%c mailUrl = ' + mailUrl, 'color: orange')

  axios.post(mailUrl)
    .then(() => {
      console.log('Email wysłany')
      alert('Email wysłany. Sprawdź za chwilę skrzynkę')
    })
    .catch(err => console.log('Mail error: ', err))
    .finally(() => {
      alert('Email wysłany. Sprawdź za chwilę skrzynkę')
    })
}
