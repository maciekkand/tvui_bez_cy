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
      console.log('17. getSelectedStations = ', state.selectedStations)
      return state.selectedStations
    }
  },
  mutations: {
    ADD_TODAYS_PROGRAMS(state, todaysPrograms) {
      state.todaysPrograms = todaysPrograms
    },
    SET_SELECTED_STATIONS(state, stations) {
      console.log('SET_SELECTED_STATIONS: stations = ', stations)
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
