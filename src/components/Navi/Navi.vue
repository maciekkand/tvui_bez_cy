<template src="./Navi.html"></template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.getLoading
    }
  },
}
</script>

<style>
  a {
    color: greenyellow;
  }
</style>
