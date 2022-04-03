const state = {
  name: '前端小伙', //
  url: 'https://juejin.cn/user/4195392104696519' //
}

const getters = {
  getName (state) {
    return state.name
  },
  getUrl (state) {
    return state.url
  }
}

const mutations = {
  setName (value) {
    this.state.name = value
  }
}

const actions = {
  setNameActions ({ commit }, value) {
    setTimeout(() => {
      commit('setName', value)
    }, 500)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
