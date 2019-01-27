<template src="./Stations.html"></template>

<script>
import { START_STATIONS, CANAL, DISCOVERY_NATIONAL, FILMBOX_HBO_KINO, POLSAT,
         POLSKIE, TVP_TVN, INNE  } from '../../services/constants'

export default {
  data() {
    return {
      selected: this.$store.getters.getSelectedStations || START_STATIONS,   //
      canal: CANAL,
      discoveryNational: DISCOVERY_NATIONAL,
      filmboxHboKino: FILMBOX_HBO_KINO,
      polsat: POLSAT,
      polskie: POLSKIE,
      tvpTvn: TVP_TVN,
      inne: INNE
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

      console.log('this.selected = ', this.selected)

      //localStorage.setItem('stations', JSON.stringify(this.selected))

      this.$store.dispatch('setSelectedStations', this.selected)
      this.$router.push('/')
    },
    resetSelectedStations() {
      this.selected = null
      this.$store.dispatch('setSelectedStations', [])
      localStorage.setItem('stations', [])
      console.log(localStorage.getItem('stations'))
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>
