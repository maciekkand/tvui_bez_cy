<template src="./Search.html"></template>

<script>
import store from '../../store/store'
import { days, endHours, email } from '../../services/helpers'
import { CATEGORIES, HOURS } from '../../services/constants'

export default {
  data() {
    return {
      day: this.$store.getters.getDay,
      startHour: this.$store.getters.getStartHour,
      endHour: this.$store.getters.getEndHour,
      categories: this.$store.getters.getCategories,
      textSearch: null,
      days: days(),
      startHours: HOURS,
      categoriesList: CATEGORIES,
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
    endHours() {
      return endHours(store.getters.getStartHour || null)
    },
  },
  methods: {
    categorySelected(categories) {
      const todaysPrograms = this.$store.getters.getTodaysPrograms

      const categoryFiltered = todaysPrograms.filter(el => {
        return categories.includes(el.category)
      })

      this.$store.dispatch('setCategoryFiltered', categoryFiltered)
      this.$store.dispatch('setCategories', categories)
    },
    daySelected(day) {
      this.$store.dispatch('setDay', day)
    },
    startHourSelected(startHour) {
      this.$store.dispatch('setStartHour', startHour)
    },
    endHourSelected(endHour) {
      this.$store.dispatch('setEndHour', endHour)
    },
    email() {
      const arrSelectedPrograms = []
      const selectedPrograms = store.getters.getSelectedPrograms
      console.log('selectedPrograms = ', selectedPrograms)

      selectedPrograms.map(el => {
        arrSelectedPrograms.push(`${el.dayString} ${el.time} - ${el.channel} - ${el.title}\r\n`)
      })

      const emailText = arrSelectedPrograms.join()

      console.log('emailText = ', emailText)

      email(emailText) // fixme: odkomentuj to będzie słał maile
    },
    search() {
      if (this.textSearch) return this.$store.dispatch('findText', this.textSearch)
      if (this.startHour && this.endHour && this.endHour < this.startHour) return this.$refs.modalHours.show()

      const time = {
        day: this.day,
        startHour: this.startHour,
        endHour: this.endHour,
      }

      const searchData = Object.assign(time, {
        categories: this.categories, // && this.Categories.length ? this.Categories : null,
        stations: this.$store.getters.getStations,
      })

      this.$store.dispatch('setLoading', true)
      // this.$store.commit('SHOW_SELECTED_PROGRAMS', false)
      this.$store.dispatch('getSelectedPrograms', searchData)
    },
    resetAll() {
      console.log('Reset')
      this.day = null
      this.startHour = null
      this.endHour = null
      this.categories = null
      this.textSearch = null
      // localStorage.setItem('vuex', []),
      this.$store.dispatch('resetState')
    },
    show() {
      console.log('getters.getFavorites = ', this.$store.getters.getFavorites)
      this.$store.commit('SHOW_FAVORITES', true)
    },
    resetFavorites() {
      this.$store.dispatch('resetFavorites')
      this.$store.dispatch('getSelectedPrograms', [])
      this.$store.dispatch('setLoading', true)
    },
  },
}
</script>

<style scoped>
div {
  color: white;
}
</style>
