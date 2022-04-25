<template>
  <div class="container">
    <div class="user">
      <button class="user__btn" @click="goBack"></button>
      <img class="user__img" :src="user.avatar_url" alt="user">
      <div>
        <h1 class="user__name">{{ user.login }}</h1>
        <span class="user__active">{{ active }}</span>
        <a class="user__github" :href="user.html_url" target="_blank">GitHub</a>
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
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  mounted() {
    window.scrollTo(0, 0)
    this.getRepos()
    window.addEventListener('scroll', this.onScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    ...mapState(['userPage', 'reposBottom']),
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
  watch: {
    reposBottom: 'addRepos'
  },
  methods: {
    ...mapActions(['LOAD_DATA', 'ADD_REPOS']),
    ...mapMutations(['GET_BOTTOM']),
    getRepos() {
      this.LOAD_DATA(this.user.login)
    },
    goBack() {
      this.$router.go(-1)
    },
    onScroll() {
      let bottom = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
      if(bottom) this.GET_BOTTOM('reposBottom')
    },
    addRepos() {
      if(!this.user.reposEnd) this.ADD_REPOS(this.user.login)
    }
  },
}
</script>