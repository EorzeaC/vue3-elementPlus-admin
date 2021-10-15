export default {
  state: {
    openedTab: [],
    activeTab: ''
  },
  mutations: {
    ADD_TAB: (state, componentName) => {
      state.openedTab.push(componentName)
    },
    CHANGE_TAB: (state, componentName) => {
      state.activeTab = componentName
    },
    DEDUCT_TAB: (state, componentName) => {
      state.openedTab.forEach((tab, index) => {
        if (tab.path === componentName) {
          state.openedTab.splice(index, 1)
        }
      })
    },
    CLOSE_ALL_TABS: state => {
      state.openedTab = []
      state.activeTab = '/system'
    },
    CLOSE_TABS: (state, type) => {
      if (
        (type === 'other' || type === 'right') &&
        state.activeTab === '/system'
      ) {
        state.openedTab = []
      }
      if (type === 'left' && state.activeTab === '/system') {
        return
      }
      state.openedTab.forEach((tab, index) => {
        if (tab.path === state.activeTab) {
          state.openedTab = state.openedTab.filter((item, i) => {
            if (type === 'left') return i >= index
            if (type === 'right') return i <= index
            if (type === 'other') return i === index
          })
          return
        }
      })
    }
  },
  actions: {},
  getters: {}
}
