<template src="./Table.html"></template>

<script>
import { FIELDS } from '../../services/constants'

export default {
  data() {
    return {
      selected: [],
      fields: FIELDS
    }
  },
  computed: {
    items() {
      const showFavorites = this.$store.getters.showFavorites
      const getFavorites = this.$store.getters.getFavorites
      const categoryFiltered = this.$store.getters.getCategoryFiltered
      const showCategories = this.$store.getters.showCategories
      const todaysPrograms = this.$store.getters.getTodaysPrograms

      //if (this.$store.getters.showFavorites) {
      if (showFavorites) {
        // console.log('%c 1','color: red')
        // this.$store.commit('SHOW_FAVORITES', false)
        return getFavorites || []
      }
      //else if (this.$store.getters.getCategoryFiltered && this.$store.getters.getCategoryFiltered.length) {
      else if (showCategories && categoryFiltered && categoryFiltered.length) {
        //console.log('%c 2','color: red')
        // console.log('%c categoryFiltered = ', 'color: yellow')
        // console.log(categoryFiltered)
        return this.$store.getters.getCategoryFiltered
        //return todaysPrograms
      }
      else {
        // console.log('%c 3','color: red')
        //this.$store.commit('SET_LOADING', false)
        return todaysPrograms
      }
    },
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
    this.$store.dispatch('getSelectedPrograms')
    this.$store.dispatch('setLoading', true)
  },
  methods: {
    onRowClicked(item) {
      //console.log('Tu onRowClicked: item = ', item)
      let favorites = this.$store.getters.getFavorites || []

      if (this.$store.getters.showFavorites) {
        //console.log('favorites = ', favorites)

        favorites = favorites.filter(el => {
          return el.id !== item.id
        })
      }
      else {
        const isPresent = favorites.some(el => {
          return el.id === item.id
        })

        if (!isPresent) favorites.push(item)
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

