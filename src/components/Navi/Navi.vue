<template src="./Navi.html"></template>

<script>

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
        return stations.join(', ').length > 63 ? `${stations.join(', ').slice(0, 63)} ...` : stations.join(', ')
      }
      return 0
    },
    documents() {
      const showCategories = this.$store.getters.showCategories
      console.log('%c this.$store.getters.getCategoryFiltered.length = ' + this.$store.getters.getCategoryFiltered.length, 'color: white')

      if(showCategories && this.$store.getters.getCategoryFiltered.length) {
        return this.$store.getters.getCategoryFiltered.length
      }

      //return showCategories ? this.$store.getters.getCategoryFiltered.length : this.$store.getters.getDocumentsCount
      return this.$store.getters.getDocumentsCount
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
