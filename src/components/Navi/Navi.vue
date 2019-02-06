<template src="./Navi.html"></template>

<script>
import { email } from '../../services/ajax'

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
      const stations = this.$store.getters.getStations

      if (stations) {
        return stations.join(', ').length > 65 ? `${stations.join(', ').slice(0, 65)} ...` : stations.join(', ')
      }

      return 'Wszystkie stacje'
    },
    documents() {
      const showCategories = this.$store.getters.showCategories

      if (showCategories && this.$store.getters.getCategoryFiltered.length) {
        return this.$store.getters.getCategoryFiltered.length
      }
      return this.$store.getters.getDocumentsCount
    }
  },
  methods: {
    sendEmail() {
      const address = 'nabu1312@gmail.com'
      email(address, JSON.stringify(this.$store.getters.getFavorites))
    }
  }
}
</script>

<style>
a {
  color: greenyellow;
  font-size: 1.1em
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
