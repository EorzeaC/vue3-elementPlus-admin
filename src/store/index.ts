import { createStore } from 'vuex'
import userMod from './modules/user.module'
import tagNavMod from './modules/tagNav.module'
import { getMenuList } from '@/api/api'
export default createStore({
  state: {
    navList: []
  },
  mutations: {
    setNavList(state, data) {
      state.navList = data.data
    }
  },
  actions: {
    getNavList({ commit, state }) {
      if (state.navList.length === 0) {
        getMenuList().then(res => {
          commit('setNavList', res.data)
        })
      }
    }
  },
  modules: {
    userMod,
    tagNavMod
  }
})
