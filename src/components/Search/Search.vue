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
        // { text: 'Tele', value: 'telenowela' },
        { text: 'Sport', value: 'sport' },
        { text: 'Info', value: 'wiadomosci' },
        { text: 'Rozrywka', value: 'rozrywka' },
        { text: 'Dzieci', value: 'dla dzieci' },
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

      //console.log('this.selectedDay = ', this.selectedDay)
      //const day = this.selectedDay || new Date().setUTCHours(0, 0, 0, 0)
      //const day = this.selectedDay
      //console.log('day = ', new Date(day))

      //console.log('this.selectedStartHour = ', this.selectedStartHour)
      //console.log('this.selectedEndHour = ', this.selectedEndHour)
      //const startHour = this.selectedStartHour || new Date().setUTCHours(3, 0, 0, 0)

      // const startHour = this.selectedStartHour ? new Date().setUTCHours(this.selectedStartHour, 0, 0, 0) : new Date().setUTCHours(3, 0, 0, 0)
      // const endHour = this.selectedEndHour ? new Date().setUTCHours(this.selectedEndHour, 0, 0, 0) : new Date().setUTCHours(24, 0, 0, 0)
      // const endHour = this.selectedEndHour ? new Date().setUTCHours(this.selectedEndHour, 0, 0, 0) : new Date().setUTCHours(24, 0, 0, 0)

      //console.log('startHour = ', new Date(startHour))
      //console.log('startHour = ', startHour)

      const searchData = {
        selectedDay: this.selectedDay,
        selectedStartHour: this.selectedStartHour,
        selectedEndHour: this.selectedEndHour,
        selectedCategories: this.selectedCategories,
        selectedStations: this.$store.getters.getSelectedStations
      }

      console.log('searchData = ', searchData)

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

      //console.log('oldSelectedPrograms = ', oldSelectedPrograms)
      //console.log('currentSelectedPrograms = ', currentSelectedPrograms)

      const allSelectedPrograms = oldSelectedPrograms.concat(currentSelectedPrograms)
      //console.log('allSelectedPrograms = ', allSelectedPrograms)

      localStorage.setItem('savedPrograms', JSON.stringify(allSelectedPrograms))
    },
    show() {
      const savedPrograms = localStorage.getItem('savedPrograms')
      console.log('savedPrograms = ', savedPrograms)

      if (savedPrograms) {
        console.log('savedPrograms = ', savedPrograms)
        //selectedPrograms
        this.$store.commit('ADD_SAVED_PROGRAMS', JSON.parse(localStorage.getItem('savedPrograms')))
      }
    },
    email() {
      const arrSelectedPrograms = []
      const selectedPrograms = JSON.parse(localStorage.getItem('selectedPrograms'))

      selectedPrograms.map(el => {
        arrSelectedPrograms.push (
          `${el.dayString} ${el.time} - ${el.channel} - ${el.title}\r\n`
        )
      })

      const emailText = arrSelectedPrograms.join()
      // email(emailText)  // fixme: odkomentuj to będzie słał maile
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
