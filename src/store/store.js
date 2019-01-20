import Vue from 'vue'
import Vuex from 'vuex'
import { ajaxAddTodaysPrograms, ajaxAddSelectedPrograms } from '../services/ajax'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    addTodaysPrograms(context) {
      console.log('actions: addTodaysPrograms')
      ajaxAddTodaysPrograms(context)
    }
  }

})
