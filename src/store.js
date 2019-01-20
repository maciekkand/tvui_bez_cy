import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxAddTodaysPrograms, ajaxFindSelectedPrograms } from '../services/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    addTodaysPrograms(context) {
      ajaxAddTodaysPrograms(context)
    }
  },
})
