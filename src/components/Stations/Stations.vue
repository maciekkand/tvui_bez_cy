<template src="./Stations.html"></template>

<script>
import {
  canal, discoveryNational,
  filmboxHboKino, polsat, polskie,
  tvpTvn, inne
} from '../../data/data'

export default {

  data() {
    return {
      // trzeba po kliku w OK wypychać wybrane stacje do vuexa
      // Zmienić wszędzie Stations na channels
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
  methods: {
    setSelectedStations() {
      console.log(this.selected)
      localStorage.setItem('stations', JSON.stringify(this.selected))

      this.$store.dispatch('setSelectedStations', this.selected)
      this.$router.push('/')
    },
    resetSelectedStations() {
      // localStorage.removeItem('stations')
      //this.selected = null
      //this.$store.dispatch('setSelectedStations', null)
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
