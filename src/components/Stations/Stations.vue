<template src="./Stations.html"></template>

<script>
import {
  canal, discoveryNational, filmboxHboKino,
  polsat, polskie, tvpTvn, inne
} from '../../data/data'

export default {

  data() {
    return {
      selected: this.$store.getters.getSelectedStations,
      canal,
      discoveryNational,
      filmboxHboKino,
      polsat,
      polskie,
      tvpTvn,
      inne
    }
  },
  created() {
    if (localStorage.getItem('stations')) {
      this.$store.dispatch('setSelectedStations', localStorage.getItem('stations'))
      console.log('getters.getSelectedStations', this.$store.getters.getSelectedStations)

      this.selected = JSON.parse(localStorage.getItem('stations'))
    }
  },
  methods: {
    setSelectedStations() {
      console.log(this.selected)
      localStorage.setItem('stations', JSON.stringify(this.selected))
      this.$store.dispatch('setSelectedStations', this.selected)
      this.$router.push('/')
    },
    resetSelectedStations() {
      this.selected = []
      this.$store.dispatch('setSelectedStations', null)
      localStorage.removeItem('stations')
      console.log(localStorage.getItem('stations'))
    }
  }
}
</script>

<style scoped>
div {
  color: white
}
</style>
