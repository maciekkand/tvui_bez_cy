<template src="./Table.html"></template>

<script>
import { FIELDS, CHECKBOX } from '../../services/constants'

const favorites = []

export default {
  data() {
    return {
      selected: [],
      //fields: FIELDS
    }
  },
  computed: {
    items() {
      if (this.$store.getters.showFavorites) {
        console.log('1')
        // this.$store.commit('SHOW_FAVORITES', false)
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
      let favorites = this.$store.getters.getFavorites || []

      if (this.$store.getters.showFavorites) {
        favorites = favorites.filter(el => {
          return el.id !== item.id
        })
      }
      else {
        favorites.push(item)
      }

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

