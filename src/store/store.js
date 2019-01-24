import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxAddTodaysPrograms, ajaxGetSelectedPrograms } from '../services/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todaysPrograms: [],
    selectedStations: null,
    loading: false
  },
  getters: {
    getTodaysPrograms(state) {
      return state.todaysPrograms
    },
    getSelectedStations(state) {
      return state.selectedStations
    },
    getLoading(state) {
      return state.loading
    }
  },
  mutations: {
    ADD_TODAYS_PROGRAMS(state, todaysPrograms) {
      state.todaysPrograms = todaysPrograms
      state.loading = true
    },
    SET_SELECTED_STATIONS(state, stations) {
      state.selectedStations = stations
    },
    SET_LOADING(state, loadingStatus) {
      state.loading = loadingStatus
    }
  },
  actions: {
    addTodaysPrograms(context) {
      ajaxAddTodaysPrograms(context)
    },
    getSelectedPrograms(context, searchData) {
      ajaxGetSelectedPrograms(context, searchData)
    },
    setSelectedStations(context, stations) {
      context.commit('SET_SELECTED_STATIONS', stations)
    },
    setLoading(context, loadingStatus) {
      context.commit('SET_LOADING', loadingStatus)
    }
  }
})
