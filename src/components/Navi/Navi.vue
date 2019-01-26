<template src="./Navi.html"></template>

<script>
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
    let stations = localStorage.getItem('stations') || null

    if (stations) {
      // this.$store.dispatch('setSelectedStations', stations)
      console.log('localStorage(stations) = ', stations)

      ///this.stations = stations.replace('[', '').replace(']', '').replace(/"/g, '').replace(/,/g, ',  ')

      stations = stations
        .replace('[', '')
        .replace(']', '')
        .replace(/"/g, '')
        .replace(/,/g, ',  ')
        
      console.log('stations.length = ', stations.length)

      if (stations.length > 50) {
        stations = `${stations.slice(0, 50)} ..`
      }

      /// this.stations = stations.slice(0,75).replace('[', '').replace(']', '').replace(/"/g, '').replace(/,/g, ',  ') + '...'
      this.stations = stations
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
  font-size: '9px';
  color: yellow;
}
</style>
