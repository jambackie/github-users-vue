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
    usersBottom: false,
    reposBottom: false,
    usersRequestPage: 2,
    reposRequestPage: 2,
  },
  getters: {
    USERS_LIST: (state) => state.users.items,
    USERS_COUNT: (state) => state.users.total_count,
  },
  mutations: {
    SET_USERS(state, obj) {
      state.users = obj
      state.usersRequestPage = 2
      state.usersBottom = false
    },
    RESET_USERS(state) {
      state.users = {
        items: [],
        total_count: 0
      }
    },
    ADD_USERS(state, obj) {
      state.users.items = state.users.items.concat(obj.items)
      state.usersRequestPage = state.usersRequestPage + 1
      state.usersBottom = false
    },
    SET_USERPAGE(state, obj) {
      state.userPage = obj
      state.reposBottom = false
      state.reposRequestPage = 2
      state.userPage.reposEnd = false
    },
    SET_REPOS(state, arr) {
      state.userPage.repos = arr
      if(arr.length < 100) state.userPage.reposEnd = true
    },
    SET_EVENT(state, arr) {
      state.userPage.lastEvent = arr.length > 0 ? arr[0].created_at : null
    },
    ADD_REPOS(state,arr) {
      if(arr.length === 0) state.userPage.reposEnd = true
      state.userPage.repos = state.userPage.repos.concat(arr)
      state.reposRequestPage = state.reposRequestPage + 1
      state.reposBottom = false
    },
    UPDATE_INPUT(state, str) {
      state.input = str
    },
    SAVE_SCROLL(state, num) {
      state.scroll = num
    },
    GET_BOTTOM(state, str) {
      state[str] = true
    },
  },
  actions: {
    async GET_USERS({ commit }, login) {
      try {
        let data = await fetch(`https://api.github.com/search/users?q=${login}&sort=repositories&per_page=24&page=1`, {
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
        let reposList = await fetch(`https://api.github.com/users/${login}/repos?per_page=100&page-1`, accept)
        reposList = await reposList.json()
        commit('SET_REPOS', reposList)
        let eventsList = await fetch(`https://api.github.com/users/${login}/events`, accept)
        eventsList = await eventsList.json()
        commit('SET_EVENT', eventsList)
      } catch(err) {
        console.log(err)
      }
    },
    async ADD_USERS ({ commit }, login) {
      try {
        let data = await fetch(`https://api.github.com/search/users?q=${login}&sort=repositories&per_page=24&page=${this.state.usersRequestPage}`, {
          Accept: {
            "access_token":process.env.VUE_APP_TOKEN,
            "scope":"repo,gist",
            "token_type":"bearer"
          }
        })
        data = await data.json()
        commit('ADD_USERS', data)
      } catch(err) {        
        console.log(err)
      }
    },
    async ADD_REPOS ({ commit }, login) {
      const accept = {Accept: {
        "access_token":process.env.VUE_APP_TOKEN,
        "scope":"repo,gist",
        "token_type":"bearer"
      }}
      try {
        let reposList = await fetch(`https://api.github.com/users/${login}/repos?per_page=100&page=${this.state.reposRequestPage}`, accept)
        reposList = await reposList.json()
        commit('ADD_REPOS', reposList)
      } catch(err) {
        console.log(err)
      }
    }
  }
});