<template src="./Stations.html"></template>

<script>
import { stations } from '../../data/data'

export default {
  data() {
    return {
      selected: [],
      options: stations,
      show: true
    }
  },
  methods: {
    resetSelectedStations() {
      this.selected = []
      this.$store.dispatch('setSelectedStations', [])
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
