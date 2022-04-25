<template>
  <div class="container">
    <h1 class="heading">Github users search</h1>
    <label class="input">
      <input type="text" v-model="input" placeholder="Login">
      Total users: <b>{{ total }}</b>
    </label>
    <div class="items">
      <div
        v-for="user in users"
        :key="user.id"
        class="item"
        @click="clickUser(user)"
      > 
        <img class="item__img" :src="user.avatar_url" alt="pic">
        <h2 class="item__name">{{ user.login }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {
      inputValue: '',
    }
  },
  mounted() {
    this.inputValue = this.$store.state.input
    window.scrollTo(0, this.scroll)
    window.addEventListener('scroll', this.onScroll)
  },
  beforeRouteLeave() {
    this.SAVE_SCROLL(window.scrollY)
    this.UPDATE_INPUT(this.inputValue)
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    ...mapGetters(['USERS_COUNT', 'USERS_LIST']),
    ...mapState(['input', 'scroll', 'usersBottom']),
    users() {
      return this.USERS_LIST
    },
    total() {
      return this.USERS_COUNT
    },
    input: {
      get() {
        return this.inputValue
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.inputValue = val
          this.getUsers()
        }, 1000)
      }
    }
  },
  watch: {
    usersBottom: 'addUsers',
  },
  methods: {
    ...mapActions(['GET_USERS', 'ADD_USERS']),
    ...mapMutations([
      'RESET_USERS',
      'SET_USERPAGE',
      'UPDATE_INPUT',
      'SAVE_SCROLL',
      'GET_BOTTOM'
    ]),
    getUsers() {
      this.inputValue.length > 0 ? this.GET_USERS(this.inputValue) : this.RESET_USERS()
    },
    clickUser(user) {
      this.$router.push(`/${user.login}`)
      this.SET_USERPAGE(user)
    },
    onScroll() {
      let bottom = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
      if(bottom) this.GET_BOTTOM('usersBottom')
    },
    addUsers() {
      if(this.usersBottom && this.users.length < this.total) {
        this.ADD_USERS(this.inputValue)
      }
    }
  }
};
</script>
