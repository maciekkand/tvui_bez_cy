<template src="./Navi.html"></template>

<script>
import { START_STATIONS } from '../../services/constants'

export default {
  data() {
    return {
      //stations: this.$store.getters.getSelectedStations || START_STATIONS.join(', ').slice(0, 44)
      stations: START_STATIONS.join(', ').slice(0, 44)
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
    console.log('getters.getSelectedStations = ', this.$store.getters.getSelectedStations)
     this.$store.getters.getSelectedStations ? this.stations = stations : null
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
