<template src="./Navi.html"></template>

<script>
import store from '../../store/store'

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
      const stations = store.getters.getStations
      if (stations) {
        return stations.join(', ').length > 63 ? `${stations.join(', ').slice(0, 63)} ...` : stations.join(', ')
      }
    },
    documents() {
      return store.getters.getDocumentsCount
    }
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
.documents {
  color: lime;
}

</style>
