<template src="./Stations.html"></template>

<script>
import { stations } from '../../data/data'

export default {
  data() {
    return {
      selected: null,
      options: stations,
      show: true
    }
  },
  methods: {
    resetSelectedStations() {
      this.selected = null
      this.$store.dispatch('setSelectedStations', null)
    },
    setSelectedStations() {
      console.log(this.selected)
      this.$store.dispatch('setSelectedStations', this.selected)
    }
  }
}
</script>

<style scoped>
div {
  color: white
}
</style>
