import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { ajaxGetSelectedPrograms, ajaxStartStations, ajaxFindText } from '../services/ajax'

Vue.use(Vuex)

function initialState() {
  return {
    day: null,
    startHour: null,
    endHour: null,
    stations: null,
    categories: null,
    todaysPrograms: null,
    selectedPrograms: null,
    categoryFiltered: null,
    loading: false,
    favorites: null,
    showFavorites: false,
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: initialState,
  getters: {
    getTodaysPrograms(state) {
      return state.todaysPrograms
    },
    getCategoryFiltered(state) {
      return state.categoryFiltered
    },
    getStations(state) {
      return state.stations
    },
    getCategories(state) {
      return state.categories
    },
    getDay(state) {
      return state.day
    },
    getStartHour(state) {
      return state.startHour
    },
    getEndHour(state) {
      return state.endHour
    },
    getLoading(state) {
      return state.loading
    },
    getSelectedPrograms(state) {
      return state.selectedPrograms
    },
    getFavorites(state) {
      console.log('getter: getFavorites = ')
      return state.favorites
    },
    showFavorites(state) {
      console.log('getter: showFavorites')
      return state.showFavorites
    },
  },
  mutations: {
    START_STATIONS(state, todaysPrograms) {
      //console.log('Tu store START_STATIONS')
      //console.log('todaysPrograms = ', todaysPrograms)
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
      console.log('ADD_SELECTED_PROGRAMS = ')
      console.log(selectedPrograms)
      state.selectedPrograms = selectedPrograms
    },
    SHOW_FAVORITES(state, bool) {
      console.log('SHOW_FAVORITES = ', bool)
      state.showFavorites = bool
    },
    AJAX_FIND_TEXT(state, foundPrograms) {
      state.todaysPrograms = foundPrograms
    },
    ADD_SAVED_PROGRAMS(state, savedPrograms) {
      state.todaysPrograms = savedPrograms
    },
    RESET_STATE(state) {
      const s = initialState()
      Object.keys(s).forEach(key => {
        if (key !== 'selectedPrograms') state[key] = s[key]
      })
    },
    ADD_FAVORITES(state, favorites) {
      console.log('ADD_FAVORITES: favorites PRZED = ', favorites)
      //state['selectedPrograms'] = initialState()['selectedPrograms']
      state.favorites = favorites
      console.log('state.favorites PO = ', state.favorites)
    },
    RESET_FAVORITES(state) {
      console.log('RESET_FAVORITES')
      //state['selectedPrograms'] = initialState()['selectedPrograms']
      state.favorites = null
    },
  },
  actions: {
    startStations(context) {
      // console.log('Tu store startStations')
      ajaxStartStations(context)
    },
    getSelectedPrograms(context, searchData) {
      ajaxGetSelectedPrograms(context, searchData)
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
      context.commit('SET_LOADING', true)
      ajaxFindText(context, text)
    },
    resetState(context) {
      context.commit('RESET_STATE')
    },
    addFavorites(context, favorites) {
      context.commit('ADD_FAVORITES', favorites)
    },
    /* showFavorites(context, bool) {
      console.log('showFavorites')
      //context.commit('SHOW_FAVORITES', bool)
    }, */
    resetFavorites(context) {
      context.commit('RESET_FAVORITES')
    },
  },
})
