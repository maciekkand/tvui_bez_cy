<template src="./Table.html"></template>

<script>
import { FIELDS } from '../../services/constants'

const selectedPrograms = new Set()

export default {
  computed: {
    items() {
      return this.$store.getters.getTodaysPrograms
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

    this.$store.dispatch('setLoading', true)
    this.$store.dispatch('addTodaysPrograms')
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

