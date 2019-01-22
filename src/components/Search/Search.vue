<template src="./Search.html"></template>

<script>
import { daysForSelectBox, hoursForSelectBox } from '../../data/data'

export default {
  data() {
    return {
      selectedDay: null,
      selectedStartHour: null,
      selectedEndHour: null,
      days: daysForSelectBox(),
      startHours: hoursForSelectBox(false),
      endHours: hoursForSelectBox(true),
      categories: [
        { text: 'Film', value: 'film' },
        { text: 'Serial', value: 'serial' },
        { text: 'Sport', value: 'sport' },
        { text: 'Rozrywka', value: 'rozrywka' },
        { text: 'Wiadomości', value: 'wiadomosci' },
        { text: 'Inne', value: 'inne' }
      ],
      showAlert: false
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    }
  },
  created() {
    /*
    if (sessionStorage.getItem('homeData')) {
      const homeData = JSON.parse(sessionStorage.getItem('homeData'))
      this.city = homeData.city
      this.street = homeData.street
      this.streetNumber = homeData.streetNumber
    }
    */
  },
  methods: {
    search() {
      if (!this.selectedDay) {
        console.log('brak Day = ')
        return this.$refs.modalDay.show()
      }
      if (!this.selectedStartHour) {
        console.log('brak StartHour ')
        return this.$refs.modalStartHour.show()
      }
      if (!this.selectedEndHour) {
        console.log('brak EndHour ')
        return this.$refs.modalEndHour.show()
      }
      if (this.selectedEndHour < this.selectedStartHour) {
        console.log('Błąd godzin ')
        return this.$refs.modalHoursError.show()
      }

      const searchData = {
        day: this.selectedDay,
        startHour: this.selectedStartHour * 1000 * 60 * 60 + this.selectedDay,
        endHour: this.selectedEndHour * 1000 * 60 * 60 + this.selectedDay
      }

      this.$store.dispatch('getSelectedPrograms', searchData)
      sessionStorage.setItem('searchData', JSON.stringify(searchData))
    },
    save() {
      console.log('Tu Search: metoda save !')
    },
    hideModalDay() {
      this.$refs.modalDay.hide()
    },
    hideModalStartHour() {
      this.$refs.modalStartHour.hide()
    },
    hideModalEndHour() {
      this.$refs.modalEndHour.hide()
    },
    hideModalHoursError() {
      this.$refs.modalHoursError.hide()
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

