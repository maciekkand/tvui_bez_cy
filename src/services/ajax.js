import axios from 'axios'
import url from './ajaxHelpers'
import { LITERALS } from './constants'

export const ajaxGetSelectedPrograms = context => {
  axios
    .get(url(context))
    .then(res => {
      // if (res.data.length > 999) alert(LITERALS.EXCESSIVE_DATA_MSG)
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
  const query = `s={timestamp:1}&q={"type":{"$regex":".*${text}.*",$options:"i"}}`
  const urlFindText = LITERALS.TV_LIST_PREFIX + query + LITERALS.TV_LIST_SUFFIX
  console.log('%c urlFindText = ' + urlFindText, 'color: white')

  axios
    .get(urlFindText)
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
