import { createStore } from 'vuex';

export default createStore({
  state: {
    users: {
      items: [],
      total_count: 0
    },
    userPage: {},
    input: '',
    scroll: 0,
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
    },
    SET_USERPAGE(state, obj) {
      state.userPage = obj
    },
    SET_REPOS(state, arr) {
      state.userPage.repos = arr
    },
    SET_EVENT(state, arr) {
      state.userPage.lastEvent = arr.length > 0 ? arr[0].created_at : null
    },
    UPDATE_INPUT(state, str) {
      state.input = str
    },
    SAVE_SCROLL(state, num) {
      state.scroll = num
    }
  },
  actions: {
    async GET_USERS({ commit }, login) {
      try {
        let data = await fetch(`https://api.github.com/search/users?q=${login}&sort=repositories&per_page=12`, {
          Accept: {
            "access_token":process.env.VUE_APP_TOKEN,
            "scope":"repo,gist",
            "token_type":"bearer"
          }
        })
        data = await data.json()
        commit('SET_USERS', data)
      } catch(err) {        
        console.log(err)
      }
    },
    async LOAD_DATA({ commit }, login) {
      const accept = {Accept: {
        "access_token":process.env.VUE_APP_TOKEN,
        "scope":"repo,gist",
        "token_type":"bearer"
      }}
      try {
        let reposList = await fetch(`https://api.github.com/users/${login}/repos?per_page=100`, accept)
        reposList = await reposList.json()
        commit('SET_REPOS', reposList)
        let eventsList = await fetch(`https://api.github.com/users/${login}/events`, accept)
        eventsList = await eventsList.json()
        commit('SET_EVENT', eventsList)
      } catch(err) {
        console.log(err)
      }
    }
  }
});