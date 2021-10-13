export default {
  state: {
    openedTab: [],
    activeTab: ''
  },
  mutations: {
    addTab(state, componentName) {
      state.openedTab.push(componentName)
    },
    changeTab(state, componentName) {
      state.activeTab = componentName
    },
    deductTab(state, componentName) {
      state.openedTab.forEach((tab, index) => {
        if (tab.path === componentName) {
          state.openedTab.splice(index, 1)
        }
      })
    }
  },
  actions: {},
  getters: {}
}
