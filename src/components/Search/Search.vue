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
    }
  },
  methods: {
    categorySelected(categories) {
      console.log('categories = ', categories)
      const todaysPrograms = this.$store.getters.getTodaysPrograms
      console.log('todaysPrograms = ', todaysPrograms)

      const categoryFiltered = todaysPrograms.filter(el => {
        return categories.includes(el.category)
      })

      console.log('categoryFiltered = ', categoryFiltered)

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
      const selectedPrograms =  store.getters.getSelectedPrograms
      console.log('selectedPrograms = ', selectedPrograms)

      selectedPrograms.map(el => {
        arrSelectedPrograms.push(`${el.dayString} ${el.time} - ${el.channel} - ${el.title}\r\n`)
      })

      const emailText = arrSelectedPrograms.join()

      console.log('emailText = ', emailText)

      email(emailText)  // fixme: odkomentuj to będzie słał maile
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
      // localStorage.setItem('vuex', []),
      this.$store.dispatch('resetState')

    },
    show() {
      console.log('Tu Search: show()')
      const selectedPrograms = this.$store.getters.getSelectedPrograms
      if (!this.$store.getters.getSelectedPrograms) return alert('Brak wybranych programów')
      //currentSelectedPrograms ? console.log('currentSelectedPrograms = ', currentSelectedPrograms) : null
      console.log('selectedPrograms = ')
      console.table(selectedPrograms, ['title'])

      const arrSelectedPrograms = selectedPrograms.map( ({category, channel, date, dateTimestamp, daystring, id, link, time, timestamp, title, type}) => {
        return { category, channel, date, dateTimestamp, daystring, id, link, time, timestamp, title, type }
      })

      console.log('arrSelectedPrograms = ')
      console.log(arrSelectedPrograms)

      this.$store.commit('START_STATIONS')
    },
    resetFavorites() {
      //this.$store.commit('ADD_SAVED_PROGRAMS', [])
      this.$store.commit('START_STATIONS', [])
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
