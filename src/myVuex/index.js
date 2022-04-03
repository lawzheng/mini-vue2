let Vue

function install (_Vue, storeName = '$store') {
  Vue = _Vue
  // 混入：把store选项指定到Vue原型上
  Vue.mixin({
    beforeCreate () {
      // 判断main.js的当期组件选择中，是否有sotre
      if (this.$options.store) {
        Vue.prototype[storeName] = this.$options.store
      }
    }
  })
}

class Store {
  // eslint-disable-next-line no-useless-constructor
  constructor (options) {
    let {
      state = {},
      getters = {},
      mutations = {},
      actions = {},
      modules = {}
    } = options

    for (var key in modules) {
      state = Object.assign(state, modules[key].state)
      mutations = Object.assign(mutations, modules[key].mutations)
      getters = Object.assign(getters, modules[key].getters)
      actions = Object.assign(actions, modules[key].actions)
    }

    this.state = new Vue({
      data: state
    })
    this.actions = actions
    this.mutations = mutations
    this.observerGettersFunc(getters)
  }

  observerGettersFunc (getters) {
    this.getters = {} // store实例上的getters
    // 定义只读的属性
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }

  // 触发mutations，需要实现commit
  commit = (type, arg) => {
    // this只想Store实例
    const fn = this.mutations[type] // 获取状态变更函数
    fn(this.state, arg)
  }

  dispatch = (type, arg) => {
    const fn = this.actions[type]
    return fn({ commit: this.commit, state: this.state }, arg)
  }
}

export default {
  Store,
  install
}
