<template>
  <div class="container">
    <div class="user">
      <button class="user__btn" @click="goBack"></button>
      <img class="user__img" :src="user.avatar_url" alt="user">
      <div>
        <h1 class="user__name">{{ user.login }}jkdshfkjasd</h1>
        <span class="user__active">{{ active }}lact active</span>
        <a class="user__github" href="" target="_blank">GitHub</a>
      </div>
    </div>
    <div class="repos">
      <h2>Repositories:</h2>
      <a
        v-for="repo in repos"
        :key="repo.id"
        :href="repo.html_url"
        class="repos__item"
        target="_blank"
      >{{repo.name}}</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  mounted() {
    window.scrollTo(0, 0)
    this.getRepos()
  },
  computed: {
    ...mapState(['userPage', 'scroll']),
    user() {
      return this.userPage
    },
    repos() {
      return this.userPage.repos
    },
    active() {
      return `Last active: ${this.user.lastEvent ? new Date(this.user.lastEvent).toLocaleString() : 'never'}`
    }
  },
  methods: {
    ...mapActions(['LOAD_DATA']),
    getRepos() {
      this.LOAD_DATA(this.user.login)
    },
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>