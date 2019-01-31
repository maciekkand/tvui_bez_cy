<template src="./Navi.html"></template>

<script>
import store from '../../store/store'
import { LITERALS } from '../../services/constants'

export default {
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
    stations() {
      let stations = store.getters.getStations
      if (stations) {
        return (stations = store.getters.getStations.join(', ').length > 45 ? store.getters.getStations.join(', ').slice(0, 45) + '...' : store.getters.getStations.join(', '))
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
