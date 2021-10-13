<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="handleClickTab"
  >
    <el-tab-pane
      v-for="item in getOpenedTab"
      :key="item.path"
      :label="item.name"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      editableTabsValue: '2',
      tabIndex: 0,
      openedTab: []
    }
  },
  computed: {
    getOpenedTab() {
      return this['$store'].state.tagNavMod.openedTab
    },
    changeTab() {
      return this['$store'].state.tagNavMod.activeTab
    }
  },
  watch: {
    changeTab(val) {
      // 监听activetab以实现点击左侧栏时激活已存在的标签
      if (val !== this.editableTabsValue) {
        this.editableTabsValue = val
      }
    },
    getOpenedTab: {
      handler(val) {
        if (val.length > this.openedTab.length) {
          let newTab = val[val.length - 1] // 新增的肯定在数组最后一个
          ++this.tabIndex
          this.editableTabsValue = newTab.path
          this.openedTab.push(newTab)
        }
      },
      deep: true
    }
  },
  created() {
    // 刷新页面时（F11)
    // router回到index
    this.$router.push('/menu1')
  },
  methods: {
    handleClickTab(tab) {
      // const route = {
      //   path: tab.props.name,
      //   name: tab.props.label
      // }
      const path = tab.props.name
      this['$store'].commit('changeTab', path)
      this.$router.push(path)
    },
    removeTab(targetName) {
      let tabs = this.getOpenedTab // 所有打开的标签
      let activeName = this.editableTabsValue // 当前激活的标签
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.path === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.path
            }
          }
        })
      }
      this['$store'].commit('deductTab', targetName)
      this.openedTab.forEach((tab, index) => {
        if (tab.path === targetName) {
          this.openedTab.splice(index, 1)
        }
      })
      if (this.openedTab.length === 0) {
        // 标签全部关闭时
        this['$store'].commit('changeTab', '')
        this.$router.push('/menu1')
      } else {
        console.log('关闭标签')
        this.editableTabsValue = activeName
        this['$store'].commit('changeTab', activeName)
        console.log(this['$store'].state.tagNavMod.activeTab)
        this.$router.push(activeName)
      }
    }
  }
}
</script>
<style lang="scss"></style>
