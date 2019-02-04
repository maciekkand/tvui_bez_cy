<template src="./Stations.html"></template>

<script>
import { CANAL, DISCOVERY_NATIONAL, FILMBOX_HBO_KINO, POLSAT, POLSKIE, TVP_TVN, INNE } from '../../services/constants'

export default {
  data() {
    return {
      selected: this.$store.getters.getStations,
      canal: CANAL,
      discoveryNational: DISCOVERY_NATIONAL,
      filmboxHboKino: FILMBOX_HBO_KINO,
      polsat: POLSAT,
      polskie: POLSKIE,
      tvpTvn: TVP_TVN,
      inne: INNE,
    }
  },
  methods: {
    stationsSelected(stations) {
      this.$store.dispatch('setStations', stations)
    },
    onOK() {
      this.$store.commit('SHOW_CATEGORIES', false)
      this.$store.dispatch('getSelectedPrograms')
      this.$router.push('/')
    },
    resetStations() {
      this.selected = []
      this.$store.dispatch('setStations', null)
    },
  },
}
</script>

<style scoped>
div {
  color: white;
}
</style>
