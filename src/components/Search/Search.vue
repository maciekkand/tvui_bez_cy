<template src="./Search.html"></template>

<script>
import { daysForSelectBox, hoursForSelectBox } from '../../data/data'

export default {
  data() {
    return {
      selectedDay: null,
      selectedStartHour: null, // new Date().getHours(), // todo: a) usunąć na końcu b) przy innym dniu startHour = 3 rano
      selectedEndHour: null,
      selectedCategories: null,
      // selectedStations: null,
      days: daysForSelectBox(),
      startHours: hoursForSelectBox(this.selectedDay, false),
      endHours: hoursForSelectBox(this.selectedDay, true),
      categories: [
        { text: 'Film', value: 'film' },
        { text: 'Serial', value: 'serial' },
        { text: 'Telenowela', value: 'telenowela' },
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
    },
    //selectedStations() {
    //console.log("34. getters.selectedStations = ", this.$store.getters.selectedStations)
    //return this.$store.getters.selectedStations;
    //}
  },
  methods: {
    onChangedSelection() {
      setTimeout(() => {
        //console.log(this.selectedDay)
        hoursForSelectBox(this.selectedDay, false) // todo: co z tym ?
      }, 100)
    },
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
        endHour: this.selectedEndHour * 1000 * 60 * 60 + this.selectedDay,
        selectedCategories: this.selectedCategories,
        selectedStations: this.$store.getters.getSelectedStations
      }

      console.log('searchData = ', searchData)

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

