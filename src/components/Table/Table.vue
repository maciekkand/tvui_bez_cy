<template src="./Table.html"></template>

<script>
import { FIELDS } from '../../services/constants'

const selectedPrograms = new Set()

export default {
  computed: {
    items() {
      return (this.$store.getters.getCategoryFiltered.length && this.$store.getters.getCategoryFiltered) ||  this.$store.getters.getTodaysPrograms
    },
    fields() {
      return FIELDS
    },
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
    console.log('Tu Table created()')
    this.$store.dispatch('startStations')
    this.$store.dispatch('setLoading', true)
  },
  methods: {
    onRowClicked(item) {
      console.log('item = ', item.item)

      if (typeof item !== 'object') {
        selectedPrograms.forEach(el => {
          if (el.id === item) {
            selectedPrograms.delete(el)
          }
        })
      }
      else {
        const row = {
          title: item.item.title,
          id: item.item.id,
          dayString: item.item.dayString,
          time: item.item.time,
          channel: item.item.channel,
          type: item.item.type,
          category: item.item.category,
          link: item.item.link,
          date: item.item.date,
          timestamp: item.item.timestamp,
          dateTimestamp: item.item.dateTimestamp,
        }
        selectedPrograms.add(row)
      }

      const arrSelectedPrograms = Array.from(selectedPrograms)
      // console.table(selectedPrograms, ['title'])

      const arrCleanedSelectedPrograms = arrSelectedPrograms.map( ({category, channel, date, dateTimestamp, daystring, id, link, time, timestamp, title, type}) => {
        return { category, channel, date, dateTimestamp, daystring, id, link, time, timestamp, title, type }
      })

      console.log('arrCleanedSelectedPrograms = ', arrCleanedSelectedPrograms)

      console.table(arrCleanedSelectedPrograms, ['title'])
      this.$store.dispatch('addSelectedPrograms', arrCleanedSelectedPrograms)
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

