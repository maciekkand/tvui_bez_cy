<template src="./Table.html"></template>

<script>
import { FIELDS } from '../../services/constants'

const selectedPrograms = new Set()

export default {
  computed: {
    items() {
      //console.log('%c Tu Table computed()','color: yellow')
      //console.log('this.$store.getters.getTodaysPrograms = ', this.$store.getters.getTodaysPrograms)
      //console.log('getters.getCategoryFiltered = ', this.$store.getters.getCategoryFiltered)
      //console.log('typeof getters.getCategoryFiltered = ', typeof this.$store.getters.getCategoryFiltered)
      //console.log('isArray getters.getCategoryFiltered = ', Array.isArray(this.$store.getters.getCategoryFiltered))
      console.log('getters.getCategoryFiltered = ', this.$store.getters.getCategoryFiltered)
      console.log('getters.getCategoryFiltered.length = ', this.$store.getters.getCategoryFiltered.length)

      //return this.$store.getters.getTodaysPrograms
      //return (this.$store.getters.getCategoryFiltered && this.$store.getters.getCategoryFiltered.length) || this.$store.getters.getTodaysPrograms

      return !this.$store.getters.getCategoryFiltered.length ? this.$store.getters.getTodaysPrograms : this.$store.getters.getCategoryFiltered
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
      console.log('item = ', item)

      if (typeof item !== 'object') {
        selectedPrograms.forEach(el => {
          if (el.id === item) {
            selectedPrograms.delete(el)
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
        selectedPrograms.add(row)
      }

      const arrSelectedPrograms = Array.from(selectedPrograms)
      console.table(arrSelectedPrograms, ['title'])

      this.$store.dispatch('addSelectedPrograms', arrSelectedPrograms)
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

