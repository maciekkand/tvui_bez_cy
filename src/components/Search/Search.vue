<template src="./Search.html"></template>

<script>
import store from '../../store/store'
import { daysForSelectBox, hoursForSelectBox } from '../../services/helpers'
import { CATEGORIES } from '../../services/constants'
import email from '../../services/helpers'

export default {
  data() {
    return {
      day: this.$store.getters.getDay,
      startHour: this.$store.getters.getStartHour,
      endHour: this.$store.getters.getEndHour,
      categories: this.$store.getters.getCategories,
      textSearch: null,
      days: daysForSelectBox(),
      startHours: hoursForSelectBox(this.selectedDay, false),
      endHours: hoursForSelectBox(this.selectedDay, true),
      categoriesList: CATEGORIES,
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
  },
  methods: {
    categorySelected(categories) {
      console.log('categories = ', categories)
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
    resetFavorites() {
      this.$store.commit('ADD_SAVED_PROGRAMS', [])

      this.$store.dispatch('getSelectedPrograms', [])
      this.$store.dispatch('setLoading', true)
    },
    email() {
      const arrSelectedPrograms = []

      selectedPrograms.map(el => {
        arrSelectedPrograms.push(`${el.dayString} ${el.time} - ${el.channel} - ${el.title}\r\n`)
      })

      const emailText = arrSelectedPrograms.join()
      // email(emailText)  // fixme: odkomentuj to będzie słał maile
    },
    search() {
      if (this.textSearch) return this.$store.dispatch('findText', this.textSearch)
      if (this.selectedStartHour && this.selectedEndHour && this.selectedEndHour < this.selectedStartHour) return alert('Błąd godzin')

      const time = {
        day: this.day,
        startHour: this.startHour,
        endHour: this.endHour,
      }

      const searchData = Object.assign(time, {
        categories: this.categories, // && this.Categories.length ? this.Categories : null,
        stations: this.$store.getters.getStations,
      })

      this.$store.dispatch('getSelectedPrograms', searchData)
      this.$store.dispatch('setLoading', true)
    },
    resetAll() {
      console.log('Reset')
      this.day = null
      this.startHour = null
      this.endHour = null
      this.categories = null
      this.textSearch = null
      localStorage.setItem('vuex', []),
      this.$store.dispatch('resetState')

    },
    show() {
      const currentSelectedPrograms = this.$store.getters.getSelectedPrograms
      currentSelectedPrograms ? console.log('currentSelectedPrograms = ', currentSelectedPrograms) : null
      this.$store.commit('ADD_TODAYS_PROGRAMS')
      //this.$store.commit('ADD_SAVED_PROGRAMS', [])
      //if (!savedPrograms) return alert('Brak zapamiętanych programów')
    },
  },
}
</script>

<style scoped>
div {
  color: white;
}
</style>
