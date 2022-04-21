<template>
  <div>
    <input type="text" v-model="input">
    <span>{{ USERS_COUNT }}</span>
  </div>
</template>

<script>
// import UserItem from '@/components/UserItem.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    // UserItem,
  },
  data() {
    return {
      inputValue: '',
    }
  },
  computed: {
    ...mapGetters(['USERS_COUNT']),
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
    ...mapMutations(['RESET_USERS']),
    getUsers() {
      this.inputValue.length > 0 ? this.GET_USERS(this.inputValue) : this.RESET_USERS()
    }
  }
};
</script>
