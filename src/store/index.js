import Vue from 'vue'
import Vuex from '../myVuex'
// import Vuex from 'vuex'
import otherModel from './modules/other-model'
import userModel from './modules/user-model'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModel,
    otherModel
  }
})
