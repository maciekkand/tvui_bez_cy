<template src="./Navi.html"></template>

<script>
import { sendEmail } from '../../services/ajax'
let email = ''
let favorites = null

export default {
  data() {
    return {
      showBadge: false,
      email: null
    }
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading
    },
    stations() {
      const stations = this.$store.getters.getStations

      if (stations) {
        return stations.join(', ').length > 62 ? `${stations.join(', ').slice(0, 62)} ...` : stations.join(', ')
      }

      return 'Wszystkie stacje'
    },
    documents() {
      const showCategories = this.$store.getters.showCategories

      if (showCategories && this.$store.getters.getCategoryFiltered.length) {
        return this.$store.getters.getCategoryFiltered.length
      }
      return this.$store.getters.getDocumentsCount
    }
  },
  methods: {
    onEmail() {
      email = this.$store.getters.getEmail
      favorites = this.$store.getters.getFavorites
      if (!favorites) return alert('Brak wybranych programów')
      if (!email) return this.$refs.modalEmail.show()

      console.log('%c Mail jest idę do sendEmail = ', 'color: white')
      sendEmail(email, favorites)
    },
    clearEmail() {
      this.email = ''
    },
    handleOk(evt) {
      evt.preventDefault()
      if (!this.email) {
        alert('Proszę podaj swój email')
      }
      else {
        this.handleSubmit()
      }
    },
    handleSubmit() {
      this.$store.dispatch('setEmail', this.email)
      sendEmail(this.email, favorites)
      this.clearEmail()
      this.$refs.modalEmail.hide()
      console.log('%c Mail teraz już jest, idę do sendMail; this.email = ' + this.email, 'color: white')
    }
  }
}
</script>

<style>
a {
  color: lime;
  font-size: 1.1em
}
body {
  color: white;
  font-variant: italic;
}
.stations {
  color: yellow;
}
.documents {
  color: lime;
}
</style>
