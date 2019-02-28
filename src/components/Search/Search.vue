<template src="./Search.html"></template>

<script>
import { daysForSelectBox, hoursForSelectBox } from '../../services/helpers'
import { CATEGORIES } from '../../services/constants'
import email from '../../services/helpers'

export default {
  data() {
    return {
      day: null,
      startHour: null,
      endHour: null,
      categories: null,
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
      this.$store.dispatch('setCategories', categories)
    },
    show() {
      if (!savedPrograms) return alert('Brak zapamiętanych programów')
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
      if (this.selectedStartHour && this.selectedEndHour && this.selectedEndHour < this.selectedStartHour) return alert('Bład godzin')

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
      this.selectedDay = null
      this.selectedStartHour = null
      this.selectedEndHour = null
      this.textSearch = null
      this.selectedCategories = []
    },
    save() {
      if (typeof Storage === 'undefined') {
        return alert('Sorry! Nie zapamiętam programów, bo Twoja przeglądarka nie wspiera localStorage')
      }

      const currentSelectedPrograms = this.$store.getters.getSelectedPrograms
      const allSelectedPrograms = oldSelectedPrograms.concat(currentSelectedPrograms)
      this.$store.commit('ADD_TODAYS_PROGRAMS')
    },
  },
}
</script>

<style scoped>
div {
  color: white;
}
</style>
