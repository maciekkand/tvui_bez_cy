<template src="./Table.html"></template>

<script>
import { FIELDS } from '../../services/constants'

const favorites = []

export default {
  data() {
    return {
      selected: []
    }
  },
  computed: {
    items() {
      if (this.$store.getters.showFavorites) {
        console.log('1')
        this.$store.commit('SHOW_FAVORITES', false)
        return this.$store.getters.getFavorites
      }
      else if (this.$store.getters.getCategoryFiltered && this.$store.getters.getCategoryFiltered.length) {
        // console.log('2')
        return this.$store.getters.getCategoryFiltered
      }
      else {
        console.log('3')
        this.$store.commit('SET_LOADING', false)
        return this.$store.getters.getTodaysPrograms
      }
    },
    fields() {
      return FIELDS
    },
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
    this.$store.dispatch('startStations')
    this.$store.dispatch('setLoading', true)
  },
  methods: {
    onRowClicked(item) {
      console.log('Tu onRowClicked: item = ', item)

      if (typeof item !== 'object') {
        console.log('%c Tu if: item = ' + item,'color: yellow')

        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i].id === item) {
            favorites.splice(i, 1)
          }
        }
      }
      else {
        console.log('%c Tu else','color: orange')

        const record = {
          category: item.item.category,
          channel: item.item.channel,
          date: item.item.date,
          dateTimestamp: item.item.dateTimestamp,
          dayString: item.item.dayString,
          id: item.item.id,
          link: item.item.link,
          title: item.item.title,
          time: item.item.time,
          timestamp: item.item.timestamp,
          type: item.item.type,
        }

        favorites.push(record)
      }

      console.log('this.selected = ', this.selected)

      if (favorites.length > 2) {
        console.log('favorites.length > 2; kasuję this.selected');
        this.selected = []
      }

      console.table(favorites, ['title'])
      console.log('favorites = ', favorites)

      this.$store.dispatch('addFavorites', favorites)
    },
    onDblClick(item) {
      console.log('Tu onDblClick: item = ', item)

    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

