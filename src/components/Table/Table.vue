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
      //return FIELDS.concat(CHECKBOX)
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
      let favorites = this.$store.getters.getFavorites

      if (this.$store.getters.showFavorites) {
        console.log('%c Jesteś w Favorites i dwuklikłeś !','color: yellow')
        console.log('%c Trzeba odjąć ten rekord z Favoritsów','color: orange')

        console.log('favorites = ', favorites)

        favorites = favorites.filter(el => {
          return el.id !== item.id
        })

        console.log('favorites = ', favorites)

        //favorites.splice(i, 1)
      }
      else {
        console.log('%c Tu else','color: orange')
        const record = {
          category: item.category,
          channel: item.channel,
          date: item.date,
          dateTimestamp: item.dateTimestamp,
          dayString: item.dayString,
          id: item.id,
          link: item.link,
          title: item.title,
          time: item.time,
          timestamp: item.timestamp,
          type: item.type,
        }

        console.log('record = ', record)
        favorites.push(record)
      }

      //console.table(favorites, ['title'])
      //console.log('favorites = ', favorites)

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

