<template src="./Search.html"></template>

<script>
import { daysForSelectBox, hoursForSelectBox } from '../../data/data'
import email from '../../services/email'

export default {
  data() {
    return {
      selectedDay: null,
      selectedStartHour: null,
      selectedEndHour: null,
      selectedCategories: null,
      days: daysForSelectBox(),
      startHours: hoursForSelectBox(this.selectedDay, false),
      endHours: hoursForSelectBox(this.selectedDay, true),
      categories: [
        { text: 'Film', value: 'film' },
        { text: 'Serial', value: 'serial' },
        /*  { text: 'Telenowela', value: 'telenowela' }, */
        { text: 'Sport', value: 'sport' },
        { text: 'Rozrywka', value: 'rozrywka' },
        { text: 'Dzieci', value: 'dzieci' },
        { text: 'News', value: 'wiadomosci' },
        { text: 'Inne', value: 'inne' }
      ],
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    onChangedSelection() {
      setTimeout(() => {
        hoursForSelectBox(this.selectedDay, false) // todo: co z tym ?
      }, 100)
    },
    search() {
      if (this.selectedStartHour && this.selectedEndHour && this.selectedEndHour < this.selectedStartHour) {
        console.log('Błąd godzin ')
        // return this.$refs.modalHoursError.show()
      }

      console.log('this.selectedDay = ', this.selectedDay)
      const day = this.selectedDay || new Date().setUTCHours(0, 0, 0, 0)

      const searchData = {
        day,
        startHour: this.selectedStartHour * 1000 * 60 * 60 + day,
        endHour: this.selectedEndHour * 1000 * 60 * 60 + day,
        selectedCategories: this.selectedCategories,
        selectedStations: this.$store.getters.getSelectedStations
      }

      //console.log('searchData = ', searchData)

      //console.log('day = ', new Date(searchData.day))
      //console.log('startHour = ', new Date(searchData.startHour))
      //console.log('endHour = ', new Date(searchData.endHour))

      // sessionStorage.setItem('searchData', JSON.stringify(searchData))
      this.$store.dispatch('getSelectedPrograms', searchData)
      this.$store.dispatch('setLoading', true)
    },

    add() {
      console.log('Tu Search: metoda add !')
      this.$store.commit('ADD_TODAYS_PROGRAMS')
    },

    save() {
      console.log('Tu Save: zapisuję do localStorage, ślę maila i wyświetlam modala !')

      if (typeof (Storage) === 'undefined') {
        return alert('Sorry! Nie zapamiętam programów, bo Twoja przeglądarka nie wspiera localStorage')
      }

      //localStorage.removeItem('selectedPrograms')

      const oldSelectedPrograms = JSON.parse(localStorage.getItem('selectedPrograms')) || []
      const currentSelectedPrograms = this.$store.getters.getSelectedPrograms

      console.log('oldSelectedPrograms = ', oldSelectedPrograms)
      console.log('currentSelectedPrograms = ', currentSelectedPrograms)

      const allSelectedPrograms = oldSelectedPrograms.concat(currentSelectedPrograms)
      console.log('allSelectedPrograms = ', allSelectedPrograms)

      localStorage.setItem('selectedPrograms', JSON.stringify(allSelectedPrograms))

      email('dupa bez tego htmla')
    },

    show() {
      console.log('Tu Show: jeśli jest coś w localStorage o kluczu SelectedPrograms, to to wyświetlam')

      if (localStorage.getItem('selectedPrograms')) {
        this.$store.commit('ADD_TODAYS_PROGRAMS', JSON.parse(localStorage.getItem('selectedPrograms')))
      }
    },
    reset() {
      console.log('Reset')
      this.selectedDay = null
      this.selectedStartHour = null
      this.selectedEndHour = null
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

