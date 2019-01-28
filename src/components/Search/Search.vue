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
    console.log('Tu Search created()')
    this.selectedCategories = JSON.parse(localStorage.getItem('categories'))
    this.$store.dispatch('addTodaysPrograms')
  },
  methods: {
    categorySelected(categories) {
      console.log('categories = ', categories)
      //console.log('item = ', item)
      if (categories.length) {
        localStorage.setItem('categories', JSON.stringify(categories))
      } else {
        localStorage.removeItem('categories')
        // this.selectedCategories = null
      }
    },
    show() {
      const savedPrograms = localStorage.getItem('savedPrograms')
      console.log('savedPrograms = ', savedPrograms)
      if (!savedPrograms) return alert('Brak zapamiętanych programów')

      this.$store.commit('ADD_SAVED_PROGRAMS', JSON.parse(localStorage.getItem('savedPrograms')))
    },
    resetFavorites() {
      console.log('Tu resetFavorites !')
      localStorage.removeItem('savedPrograms')
      this.$store.commit('ADD_SAVED_PROGRAMS', [])

      this.$store.dispatch('getSelectedPrograms', [])
      this.$store.dispatch('setLoading', true)
    },
    email() {
      const arrSelectedPrograms = []
      const selectedPrograms = JSON.parse(localStorage.getItem('selectedPrograms'))

      selectedPrograms.map(el => {
        arrSelectedPrograms.push(`${el.dayString} ${el.time} - ${el.channel} - ${el.title}\r\n`)
      })

      const emailText = arrSelectedPrograms.join()
      // email(emailText)  // fixme: odkomentuj to będzie słał maile
    },
    search() {
      if (this.textSearch) return this.$store.dispatch('findText', this.textSearch)
      if (this.selectedStartHour && this.selectedEndHour && this.selectedEndHour < this.selectedStartHour) return alert('Bład godzin')

      console.log('getters.getStations = ', this.$store.getters.getStations)

      const searchData = {
        day: this.day,
        startHour: this.startHour,
        endHour: this.endHour,
        categories: this.categories, // && this.Categories.length ? this.Categories : null,
        stations: this.$store.getters.getStations,
        //selectedStations: localStorage.getItem('stations'),
      }

      console.log('searchData = ', searchData)

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

      localStorage.removeItem('categories')
    },
    save() {
      console.log('Tu Save: zapisuję do localStorage')

      if (typeof Storage === 'undefined') {
        return alert('Sorry! Nie zapamiętam programów, bo Twoja przeglądarka nie wspiera localStorage')
      }

      const oldSelectedPrograms = JSON.parse(localStorage.getItem('selectedPrograms')) || []
      const currentSelectedPrograms = this.$store.getters.getSelectedPrograms
      const allSelectedPrograms = oldSelectedPrograms.concat(currentSelectedPrograms)

      localStorage.setItem('savedPrograms', JSON.stringify(allSelectedPrograms))
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
