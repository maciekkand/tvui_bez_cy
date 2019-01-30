<template src="./Table.html"></template>

<script>
import { FIELDS } from '../../services/constants'

const favorites = new Set()

export default {
  computed: {
    items() {
      /* console.log('items')
      console.log('getters.showFavorites = ', this.$store.getters.showFavorites)
      console.log('getters.getCategoryFiltered = ', this.$store.getters.getCategoryFiltered)
      console.log('getters.getTodaysPrograms = ', this.$store.getters.getTodaysPrograms)
 */
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
    // console.log('Tu Table created()')
    this.$store.dispatch('startStations')
    this.$store.dispatch('setLoading', true)
  },
  methods: {
    onRowClicked(item) {
      console.log('item PRZED = ', item)

      if (typeof item !== 'object') {
        favorites.forEach(el => {
          if (el.id === item) {
            favorites.delete(el)
          }
        })
      }
      else {
        const row = {
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
        favorites.add(row)
      }

      const arrFavorites = Array.from(favorites)
      console.table(arrFavorites, ['title'])
      console.log('item PO = ', item)

      this.$store.dispatch('addFavorites', arrFavorites)
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

