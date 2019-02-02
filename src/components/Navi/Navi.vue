<template src="./Navi.html"></template>

<script>
import store from '../../store/store'

export default {
  data() {
    return {
      showBadge: false,
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
    stations() {
      const stations = store.getters.getStations
      if (stations) {
        return stations.join(', ').length > 70 ? `${stations.join(', ').slice(0, 70)} ...` : stations.join(', ')
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
