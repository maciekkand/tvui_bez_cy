<template src="./Table.html"></template>

<script>
import { FIELDS } from '../../services/constants'

export default {
  data() {
    return {
      selected: [],
      fields: FIELDS,
    }
  },
  computed: {
    items() {
      const showFavorites = this.$store.getters.showFavorites
      const getFavorites = this.$store.getters.getFavorites
      const categoryFiltered = this.$store.getters.getCategoryFiltered
      const showCategories = this.$store.getters.showCategories
      const todaysPrograms = this.$store.getters.getTodaysPrograms

      if (showFavorites) {
        return getFavorites || []
      }

      //if (showCategories && categoryFiltered && categoryFiltered.length) {
      if (showCategories) {
        console.log('%c showCategories = ' + showCategories, 'color: yellow')
        return this.$store.getters.getCategoryFiltered
      }

      console.log('%c todaysPrograms = ' + todaysPrograms.length, 'color: yellow')
      return todaysPrograms

    },
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
    this.$store.dispatch('getSelectedPrograms')
    this.$store.dispatch('setLoading', true)
    // this.$store.commit('GET_DOCUMENTS_COUNT', 0)
    //this.$store.commit('', true)
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
        const isPresent = favorites.some(el => {
          return el.id === item.id
        })
        if (!isPresent) favorites.push(item)
      }
      this.$store.dispatch('addFavorites', favorites)
    },
  },
}
</script>

<style scoped>
div {
  color: white;
}
</style>
