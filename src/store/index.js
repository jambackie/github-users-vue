import { createStore } from 'vuex';

export default createStore({
  state: {
    users: {
      items: [],
      total_count: 0
    },
    userPage: {},
  },
  getters: {
    USERS_LIST: (state) => state.users.items,
    USERS_COUNT: (state) => state.users.total_count,
  },
  mutations: {
    SET_USERS(state, obj) {
      state.users = obj
    },
    RESET_USERS(state) {
      state.users = {
        items: [],
        total_count: 0
      }
    }
  },
  actions: {
    async GET_USERS({ commit }, login) {
      try {
        await fetch(`https://api.github.com/search/users?q=${login}&sort=repos&per_page=10&?access_token=${process.env.VUE_APP_TOKEN}`)
          .then(res => res.json()).then(data => commit('SET_USERS', data))
      } catch(err) {        
        console.log(err)
      }
    },
  },
  modules: {},
});