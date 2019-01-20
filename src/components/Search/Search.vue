<template src="./Search.html"></template>

<script>
export default {
  data() {
    return {
      selectedDay: null,
      selectedStartHour: null,
      selectedEndHour: null,
      days: [
        { text: 'Wybierz dzień', value: 'null' },
        { text: 'Dziś od teraz', value: 'odTeraz' },
        { text: 'Dziś', value: 'dzis' },
        { text: 'Jutro', value: 'jutro' },
        { text: 'Poniedziałek', value: 'poniedzialek' },
        { text: 'Wtorek', value: 'wtorek' },
        { text: 'Środa', value: 'sroda' },
        { text: 'Czwartek', value: 'czwartek' },
        { text: 'Piątek', value: 'piatek' },
      ],
      startHours: [
        { text: 'Od godziny', value: null },
        { text: '5', value: 5 },
        { text: '6', value: 6 },
        { text: '7', value: 7 },
        { text: '8', value: 8 },
        { text: '9', value: 9 },
        { text: '10', value: 10 },
        { text: '11', value: 11 },
        { text: '12', value: 12 },
        { text: '13', value: 13 },
        { text: '14', value: 14 },
        { text: '15', value: 15 },
        { text: '16', value: 16 },
        { text: '17', value: 17 },
        { text: '18', value: 18 },
        { text: '19', value: 19 },
        { text: '20', value: 20 },
        { text: '21', value: 21 },
        { text: '22', value: 22 },
        { text: '23', value: 23 },
        { text: '24', value: 24 },
      ],
      endHours: [
        { text: 'Do godziny', value: null },
        { text: '5', value: 5 },
        { text: '6', value: 6 },
        { text: '7', value: 7 },
        { text: '8', value: 8 },
        { text: '9', value: 9 },
        { text: '10', value: 10 },
        { text: '11', value: 11 },
        { text: '12', value: 12 },
        { text: '13', value: 13 },
        { text: '14', value: 14 },
        { text: '15', value: 15 },
        { text: '16', value: 16 },
        { text: '17', value: 17 },
        { text: '18', value: 18 },
        { text: '19', value: 19 },
        { text: '20', value: 20 },
        { text: '21', value: 21 },
        { text: '22', value: 22 },
        { text: '23', value: 23 },
        { text: '24', value: 24 },
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
    if (sessionStorage.getItem('homeData')) {
      const homeData = JSON.parse(sessionStorage.getItem('homeData'))
      this.city = homeData.city
      this.street = homeData.street
      this.streetNumber = homeData.streetNumber
    }
  },
  methods: {
    search() {
      if (!this.day) {
        return this.$refs.modalDay.show()
      }
      if (!this.startHour) {
        return this.$refs.modalStartHour.show()
      }
      if (!this.endHour) {
        return this.$refs.modalEndHour.show()
      }

      const searchData = {
        day: this.day,
        startHour: this.startHour,
        endHour: this.endHour
      }

      sessionStorage.setItem('searchData', JSON.stringify(searchData))
    },
    hideModalCity() {
      this.$refs.modalCity.hide()
    },
    hideModalStreet() {
      this.$refs.modalStreet.hide()
    },
    hideModalRadius() {
      this.$refs.modalRadius.hide()
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

