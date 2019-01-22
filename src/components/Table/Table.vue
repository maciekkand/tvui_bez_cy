<template src="./Table.html"></template>

<script>
export default {
  computed: {
    items() {
      return this.$store.getters.getTodaysPrograms
    },
    fields() {
      return [
        {
          key: 'dayString',
          label: 'Dzień'
        },
        {
          key: 'channel',
          label: 'Kanał'
        },
        {
          key: 'time',
          label: 'Godzina'
        },
        /* {
          key: "duration",
          label: "Czas"
        }, */
        {
          key: 'title',
          label: 'Tytuł'
        },
        {
          key: 'type',
          label: 'Opis',
          sortable: true
        },
        {
          key: 'link',
          label: 'Link',
        },
      ]
    },
    loading() {
      return this.$store.getters.getLoading
    }
  },
  created() {
    this.$store.dispatch('addTodaysPrograms')
  },
  methods: {
    showTable() {
      return this.$store.getters.getShowTable
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

