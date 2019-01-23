import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxAddTodaysPrograms, ajaxGetSelectedPrograms } from '../services/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todaysPrograms: [],
    selectedStations: null
  },
  getters: {
    getTodaysPrograms(state) {
      return state.todaysPrograms
    },
    getSelectedStations(state) {
      return state.selectedStations
    }
  },
  mutations: {
    ADD_TODAYS_PROGRAMS(state, todaysPrograms) {
      state.todaysPrograms = todaysPrograms
    },
    SET_SELECTED_STATIONS(state, stations) {
      state.selectedStations = stations
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
    }
  }
})
