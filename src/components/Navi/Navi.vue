<template src="./Navi.html"></template>

<script>
import { LITERALS } from '../../services/constants'

export default {
  data() {
    return {
      //stations: this.$store.getters.getStations || LITERALS.START_STATIONS.join(', ').slice(0, 44)
      // stations: LITERALS.START_STATIONS.join(', ').slice(0, 44)
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
    console.log('Tu Navi created()')
    console.log('getters.getStations = ', this.$store.getters.getStations)
    this.$store.getters.getStations ? this.stations = stations : null
  },
}
</script>

<style>
a {
  color: greenyellow;
}
body {
  color: white;
  font-variant: italic;
}
.stations {
  color: yellow;
}
</style>
