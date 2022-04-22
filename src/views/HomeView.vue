<template>
  <div>
    <div>
    <input type="text" v-model="input" >
    <span>{{ total }}</span>
  </div>
  <div
    v-for="user in users"
    :key="user.id"
    @click="clickUser(user)"
  >
    <h2>{{ user.login }}</h2>
    <img :src="user.avatar_url" width="120" alt="pic">
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {
      inputValue: '',
    }
  },
  mounted() {
    this.inputValue = this.$store.state.input
  },
  computed: {
    ...mapGetters(['USERS_COUNT', 'USERS_LIST']),
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
  methods: {
    ...mapActions(['GET_USERS']),
    ...mapMutations([
      'RESET_USERS',
      'SET_USERPAGE',
      'UPDATE_INPUT'
    ]),
    getUsers() {
      this.inputValue.length > 0 ? this.GET_USERS(this.inputValue) : this.RESET_USERS()
    },
    clickUser(user) {
      this.$router.push(`/${user.login}`)
      this.SET_USERPAGE(user)
      this.UPDATE_INPUT(this.inputValue)
    }
  }
};
</script>
