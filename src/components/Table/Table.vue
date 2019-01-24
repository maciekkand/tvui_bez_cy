<template src="./Table.html"></template>

<script>
const rows = []

export default {
  data() {
    return {
      selected: [],
      rowsSelected: [],
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
    */
        {
          key: 'id',
          label: 'id',
          sortable: true,
        },
        {
          key: 'dayString',
          label: 'daystr',
        },
        {
          key: 'channel',
          label: 'channel',
          sortable: true,
        },
        {
          key: 'time',
          label: 'time',
          sortable: true,
        },
        /* {
          key: 'timestamp',
          label: 'timestamp'
        },
        */
        /*
        {
          key: 'duration',
          label: 'duration'
        },
        */
        {
          key: 'title',
          label: 'title',
        },
        {
          key: 'type',
          label: 'type',
        },
        {
          key: 'category',
          label: 'category',
          sortable: true,
        },
        {
          key: 'link',
          label: 'link',
        },
        {
          key: 'checkbox',
          label: '',
        },
      ]
    },
    loading() {
      return this.$store.getters.getLoading
    },
  },
  created() {
    this.$store.dispatch('setLoading', true)
    this.$store.dispatch('addTodaysPrograms')
  },
  methods: {
    onRowClicked(item) {
      if (typeof item !== 'object') {
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].id === item) {
            rows.splice(i, 1)
          }
        }
      }
      else {
        const row = {
          id: item.item.id,
          dayString: item.item.dayString,
          time: item.item.time,
          channel: item.item.channel,
          title: item.item.title,
          type: item.item.type,
          category: item.item.category,
          link: item.item.link,
          date: item.item.date,
          timestamp: item.item.timestamp,
          dateTimestamp: item.item.dateTimestamp,
        }
        rows.push(row)
      }
      console.table(rows)
    }
  }
}
</script>

<style scoped>
div {
  color: white;
}
</style>

