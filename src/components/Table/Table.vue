<template src="./Table.html"></template>

<script>
export default {
  data() {
    return {
      selected: []
    }
  },
  computed: {
    items() {
      return this.$store.getters.getTodaysPrograms
    },
    fields() {
      return [
        /* {
          key: 'index',
          label: '#'
        },
        {
          key: 'id',
          label: 'id',
          sortable: true
        },
        */
        {
          key: 'dayString',
          label: 'daystr'
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
        {
          key: 'checkbox',
          label: ''
        },
      ]
    },
    loading() {
      return this.$store.getters.getLoading
    }
  },
  created() {
    this.$store.dispatch('setLoading', true)
    this.$store.dispatch('addTodaysPrograms')
  },
  methods: {
    onRowClicked(item) {
      console.log('item = ', item)
      console.log('id = ', item.item.id)
      console.log('title = ', item.item.title)
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

