import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { ajaxGetSelectedPrograms, ajaxFindText } from '../services/ajax'

Vue.use(Vuex)

function initialState() {
  return {
    day: null,
    startHour: null,
    endHour: null,
    stations: [],
    categories: [],
    todaysPrograms: null,
    selectedPrograms: null,
    categoryFiltered: [],
    loading: false,
    favorites: null,
    showFavorites: false,
    showCategories: true,
    documentsCount: 0,
    email: ''
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: initialState,
  getters: {
    getTodaysPrograms: state => state.todaysPrograms,
    getCategoryFiltered: state => state.categoryFiltered,
    getStations: state => state.stations,
    getCategories: state => state.categories,
    getDay: state => state.day,
    getStartHour: state => state.startHour,
    getEndHour: state => state.endHour,
    getLoading: state => state.loading,
    getFavorites: state => state.favorites,
    showFavorites: state => state.showFavorites,
    showCategories: state => state.showCategories,
    getDocumentsCount: state => state.documentsCount,
    getEmail: state => state.email
  },
  mutations: {
    START_STATIONS(state, todaysPrograms) {
      console.log('%c todaysPrograms = ' + todaysPrograms.length, 'color: violet')
      state.todaysPrograms = todaysPrograms || state.selectedPrograms

      if (todaysPrograms) {
        state.loading = true
      }
    },
    SET_CATEGORY_FILTERED(state, categoryFiltered) {
      state.categoryFiltered = categoryFiltered
    },
    SET_STATIONS(state, stations) {
      state.stations = stations
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_DAY(state, day) {
      state.day = day
    },
    SET_START_HOUR(state, startHour) {
      state.startHour = startHour
    },
    SET_END_HOUR(state, endHour) {
      state.endHour = endHour
    },
    SET_LOADING(state, loadingStatus) {
      state.loading = loadingStatus
    },
    ADD_SELECTED_PROGRAMS(state, selectedPrograms) {
      state.selectedPrograms = selectedPrograms
    },
    SHOW_FAVORITES(state, bool) {
      state.showFavorites = bool
    },
    SHOW_CATEGORIES(state, bool) {
      state.showCategories = bool
    },
    AJAX_FIND_TEXT(state, foundPrograms) {
      console.log('%c foundPrograms = ' + foundPrograms.length, 'color: white')
      state.todaysPrograms = foundPrograms
    },
    ADD_SAVED_PROGRAMS(state, savedPrograms) {
      state.todaysPrograms = savedPrograms
    },
    RESET_STATE(state) {
      const init = initialState()
      Object.keys(init).forEach(key => {
        if (key !== 'favorites' && key !== 'todaysPrograms' && key !== 'email') state[key] = init[key]
      })
    },
    ADD_FAVORITES(state, favorites) {
      state.favorites = favorites
    },
    RESET_FAVORITES(state) {
      state.favorites = null
    },
    GET_DOCUMENTS_COUNT(state, documentsCount) {
      state.documentsCount = documentsCount
    },
    SET_EMAIL(state, email) {
      console.log('%c 2) SET_EMAIL email = ' + email, 'color: white')
      state.email = email
    }
  },
  actions: {
    getSelectedPrograms(context) {
      ajaxGetSelectedPrograms(context)
    },
    setCategoryFiltered(context, categoryFiltered) {
      context.commit('SET_CATEGORY_FILTERED', categoryFiltered)
    },
    setStations(context, stations) {
      context.commit('SET_STATIONS', stations)
    },
    setCategories(context, categories) {
      context.commit('SET_CATEGORIES', categories)
    },
    setDay(context, day) {
      context.commit('SET_DAY', day)
    },
    setStartHour(context, startHour) {
      context.commit('SET_START_HOUR', startHour)
    },
    setEndHour(context, endHour) {
      context.commit('SET_END_HOUR', endHour)
    },
    setLoading(context, loadingStatus) {
      context.commit('SET_LOADING', loadingStatus)
    },
    addSelectedPrograms(context, selectedPrograms) {
      context.commit('ADD_SELECTED_PROGRAMS', selectedPrograms)
    },
    findText(context, text) {
      console.log('%c text = ' + text, 'color: white')
      context.commit('SET_LOADING', true)
      ajaxFindText(context, text)
    },
    resetState(context) {
      context.commit('RESET_STATE')
    },
    addFavorites(context, favorites) {
      context.commit('ADD_FAVORITES', favorites)
    },
    resetFavorites(context) {
      context.commit('RESET_FAVORITES')
    },
    setEmail(context, email) {
      console.log('1. Tu setEmail()')
      context.commit('SET_EMAIL', email)
    },
  },
})
