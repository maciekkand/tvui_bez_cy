<template src="./Stations.html"></template>

<script>
import { LITERALS, CANAL, DISCOVERY_NATIONAL, FILMBOX_HBO_KINO, POLSAT, POLSKIE, TVP_TVN, INNE } from '../../services/constants'

export default {
  data() {
    return {
      //selected: this.$store.getters.getStations || LITERALS.START_STATIONS,   //
      selected: null, // this.$store.getters.getStations,   //
      canal: CANAL,
      discoveryNational: DISCOVERY_NATIONAL,
      filmboxHboKino: FILMBOX_HBO_KINO,
      polsat: POLSAT,
      polskie: POLSKIE,
      tvpTvn: TVP_TVN,
      inne: INNE,
    }
  },
  created() {
    if (localStorage.getItem('stations')) {
      this.$store.dispatch('setStations', localStorage.getItem('stations'))
      console.log('getters.getStations', this.$store.getters.getStations)
      this.selected = JSON.parse(localStorage.getItem('stations'))
    }
  },
  methods: {
    stationsSelected(stations) {
      console.log('stations = ', stations)

    if (stations.length) {
        localStorage.setItem('stations', JSON.stringify(stations))
        this.$store.dispatch('setStations', this.selected)
      }
      else {
        localStorage.removeItem('stations')
      }
    },
    onOK() {
      this.$router.push('/')
    },
    resetStations() {
      this.selected = null
      this.$store.dispatch('setStations', null)
      localStorage.removeItem('stations')
      console.log(localStorage.getItem('stations'))
    },
  },
}
</script>

<style scoped>
div {
  color: white;
}
</style>
