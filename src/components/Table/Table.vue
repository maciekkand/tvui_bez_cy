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
          key: 'index',
          label: '#'
        },
        {
          key: 'id',
          label: 'id',
          sortable: true
        },
        {
          key: 'dayString',
          label: 'dayString'
        },
        {
          key: 'channel',
          label: 'channel',
          sortable: true
        },
        {
          key: 'time',
          label: 'time',
          sortable: true
        },
        /* {
          key: 'timestamp',
          label: 'timestamp'
        }, */
        {
          key: 'title',
          label: 'title'
        },
        {
          key: 'type',
          label: 'type'
        },
        {
          key: 'category',
          label: 'category',
          sortable: true
        },
        {
          key: 'link',
          label: 'link',
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

