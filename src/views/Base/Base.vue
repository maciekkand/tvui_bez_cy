<template src="./Base.html" />

<script>
import Search from '../../components/Search/Search.vue'
import Table from '../../components/Table/Table.vue'
import Navi from '../../components/Navi/Navi.vue'

export default {
  components: {
    'tv-navi': Navi,
    'tv-search': Search,
    'tv-table': Table,
  },
}
</script>
