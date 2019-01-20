<template src="./Table.html"></template>

<script>
export default {
  computed: {
    items() {
      return this.$store.getters.getSelectedShops
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
</script>ś

<style scoped>
  div {
    color: white
  }
</style>

