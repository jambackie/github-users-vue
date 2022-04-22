<template>
<button @click="$router.push('/')">back</button>
  <h1>{{ user.login }}</h1>
  <img :src="user.avatar_url" alt="user">
  <span>{{ active }}</span>
  <a
    v-for="repo in repos"
    :key="repo.id"
    :href="repo.html_url"
    target="_blank"
  >{{repo.name}}</a>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  mounted() {
    this.getRepos()
  },
  computed: {
    ...mapState(['userPage']),
    user() {
      return this.userPage
    },
    repos() {
      return this.userPage.repos
    },
    active() {
      return `Active: ${this.user.lastEvent ? new Date(this.user.lastEvent).toLocaleString() : 'never'}`
    }
  },
  methods: {
    ...mapActions(['LOAD_DATA']),
    getRepos() {
      this.LOAD_DATA(this.user.login)
    }
  },
}
</script>