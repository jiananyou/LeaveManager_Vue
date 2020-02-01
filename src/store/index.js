import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    identity: ''
  },
  /* 方法实现 */
  mutations: {
    setIdentity (state, arg) {
      state.identity = arg
    }
  },
  /* commit调用mutations里的方法 */
  actions: {
    setIdentity (context, arg) {
      context.commit('setIdentity', arg)
    }
  }
})
