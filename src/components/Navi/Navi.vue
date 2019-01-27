<template src="./Navi.html"></template>

<script>
import constants from '../../data/constants'

export default {
  data() {
    return {
      stations: this.$store.getters.getSelectedStations,
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
    if (!localStorage.getItem('stations')) localStorage.setItem('stations', JSON.stringify(constants.START_STATIONS))

    let stations = localStorage.getItem('stations') // || constants.START_STATIONS
    //console.log('stations = ', stations)

    stations = `${stations
      .replace('[', '')
      .replace(']', '')
      .replace(/"/g, '')
      .replace(/,/g, ',  ')
      .slice(0, 44)}..`

    // stations = `${stations.slice(0, 48)} ..`

    /// this.stations = stations.slice(0,75).replace('[', '').replace(']', '').replace(/"/g, '').replace(/,/g, ',  ') + '...'
    //this.$store.dispatch('setSelectedStations', stations)
    this.stations = stations
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
