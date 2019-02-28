<template src="./Navi.html"></template>

<script>
import { LITERALS } from '../../services/constants'

export default {
  data() {
    return {
      stations: this.$store.getters.getStations.join(', ').length > 45 ?  this.$store.getters.getStations.join(', ').slice(0, 45) + '...' :  this.$store.getters.getStations.join(', ')
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
    stations() {
      console.log('computed stations')
      //this.stations = this.$store.getters.getStations
      this.stations = ['dupa']
    }
  },
  created() {
    console.log('stations = ', stations)
    this.stations = stations.length  > 45 ? stations.slice(0, 45) + '...' : stations

  }
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
