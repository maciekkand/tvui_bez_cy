<template src="./Table.html"></template>

<script>
export default {
  computed: {
    items() {
      return this.$store.getters.getTodaysPrograms
    },
    fields() {
      return this.$store.getters.getStock
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
    color: white
  }
</style>

