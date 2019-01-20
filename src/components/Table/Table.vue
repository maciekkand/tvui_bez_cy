<template src="./Table.html"></template>

<script>
export default {
  computed: {
    items() {
      console.log('getTodaysPrograms = ', this.$store.getters.getTodaysPrograms)
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
    console.log('created(): addTodaysPrograms dupa')
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

