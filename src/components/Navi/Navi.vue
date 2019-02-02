<template src="./Navi.html"></template>

<script>
import store from '../../store/store'
import { LITERALS } from '../../services/constants'

export default {
  data() {
    return {
      showBadge: false
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
    stations() {
      let stations = store.getters.getStations
      if (stations) {
        //return (stations = store.getters.getStations.join(', ').length > 72 ? store.getters.getStations.join(', ').slice(0, 72) + ' ...' : store.getters.getStations.join(', '))
        // return stations = stations.join(', ').length > 72 ? stations.join(', ').slice(0, 72) + ' ...' : stations.join(', ')
        return stations.join(', ').length > 74 ? stations.join(', ').slice(0, 74) + ' ...' : stations.join(', ')
      }
    },
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
