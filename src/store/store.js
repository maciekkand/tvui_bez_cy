import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxAddTodaysPrograms, ajaxFindSelectedPrograms } from '../services/ajax'

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
      console.log('store: todaysPrograms = ', todaysPrograms)
      state.todaysPrograms = todaysPrograms
    }
  },
  actions: {
    addTodaysPrograms(context) {
      ajaxAddTodaysPrograms(context)
    }
  },
})
