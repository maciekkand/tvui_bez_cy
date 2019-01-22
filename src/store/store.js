import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxAddTodaysPrograms, ajaxGetSelectedPrograms } from '../services/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todaysPrograms: []

  },
  getters: {
    getTodaysPrograms(state) {
      return state.todaysPrograms
    }
  },
  mutations: {
    ADD_TODAYS_PROGRAMS(state, todaysPrograms) {
      state.todaysPrograms = todaysPrograms
    }
  },
  actions: {
    addTodaysPrograms(context) {
      ajaxAddTodaysPrograms(context)
    },
    getSelectedPrograms(context, searchData) {
      ajaxGetSelectedPrograms(context, searchData)
    }
  }
})
