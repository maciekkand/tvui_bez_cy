<template src="./Table.html"></template>

<script>
import { FIELDS } from '../../services/constants'

const favorites = []

export default {
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
      console.log('item = ', item)

      if (typeof item !== 'object') {
        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i].id === item) {
            favorites.splice(i, 1)
          }
        }
      }
      else {
        favorites.push(item.item)
      }

      console.table(favorites, ['title'])
      console.log('favorites = ', favorites)

      this.$store.dispatch('addFavorites', favorites)
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

