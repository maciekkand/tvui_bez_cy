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
    resetStock() {
      this.selected = []
      this.$store.dispatch('getStock', [])
    },

    stationsSelected() {
    }
  }
}
</script>

<style scoped>
div {
  color: white
}
</style>
