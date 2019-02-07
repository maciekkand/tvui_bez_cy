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
      const showCategories = this.$store.getters.showCategories
      const todaysPrograms = this.$store.getters.getTodaysPrograms

      if (showFavorites) {
        return getFavorites || []
      }
      if (showCategories) {
        return this.$store.getters.getCategoryFiltered
      }
      return todaysPrograms
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
      let favorites = this.$store.getters.getFavorites || []

      if (this.$store.getters.showFavorites) {
        favorites = favorites.filter(el => el.id !== item.id)
      }
      else {
        const isPresent = favorites.some(el => el.id === item.id)
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
