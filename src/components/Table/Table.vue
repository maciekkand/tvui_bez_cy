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
        }, */
        {
          key: 'id',
          label: 'id',
          sortable: true
        },
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
    this.$store.dispatch('addTodaysPrograms')
  },
  methods: {
    showTable() {
      return this.$store.getters.getShowTable
    },
    onRowClicked(item, index, event) {
      console.log('index = ', index)
      console.log('item = ', item)
      console.log('title = ', item.item.title)

      const element = event.srcElement
      const isFirstElement = !element.previousSibling
      if (!isFirstElement) {
        this.$router.push('/mythingy')
      }
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

