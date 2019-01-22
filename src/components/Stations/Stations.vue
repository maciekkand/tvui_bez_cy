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
    resetStations() {
      this.selected = []
      this.$store.dispatch('setStations', [])
    },
    setStations() {
      console.log(this.selected)
    }
  }
}
</script>

<style scoped>
div {
  color: white
}
</style>
