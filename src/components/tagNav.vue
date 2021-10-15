<template>
  <div class="tabs">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="elTabs"
      @tab-remove="removeTab"
      @tab-click="handleClickTab"
      @contextmenu.prevent="handleClickContextMenu($event)"
    >
      <el-tab-pane
        v-for="(item, index) in openedTab"
        :key="item.path"
        :label="item.name"
        :name="item.path"
        :closable="index !== 0"
        :data-index="index"
      >
      </el-tab-pane>
    </el-tabs>
    <el-dropdown
      style="position:absolute;right:10px;top:15px;"
      @command="handleCommand"
    >
      <span class="el-dropdown-link">
        <el-icon :size="20">
          <operation />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="">关闭当前</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          <el-dropdown-item command="left">关闭左边</el-dropdown-item>
          <el-dropdown-item command="right">关闭右边</el-dropdown-item>
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { computed, ref } from '@vue/reactivity'
import { Operation } from '@element-plus/icons'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  components: { Operation },
  setup() {
    let editableTabsValue = ref('/system')
    let openedTab = ref([
      {
        name: '首页',
        path: '/system'
      }
    ])

    /**
     * 刷新页面时 router回到首页
     */
    const router = useRouter()
    router.push('/system')

    /**
     * 关闭标签的按钮功能
     */
    const store = useStore()
    const handleCommand = e => {
      // console.log(e)
      switch (e) {
        case '':
          removeTab(editableTabsValue.value)
          break
        case 'all':
          store.commit('CLOSE_ALL_TABS')
          router.push('/system')
          break
        default:
          store.commit('CLOSE_TABS', e)
          break
      }
    }
    // 计算属性
    const getOpenedTab = computed(() => {
      return store.state.tagNavMod.openedTab
    })
    const changeTab = computed(() => {
      return store.state.tagNavMod.activeTab
    })
    //关闭单个标签
    const removeTab = targetName => {
      if (targetName === '/system') return
      let tabs = getOpenedTab.value // 所有打开的标签
      let activeName = editableTabsValue.value // 当前激活的标签
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
      store.commit('DEDUCT_TAB', targetName)
      openedTab.value.forEach((tab, index) => {
        if (tab.path === targetName) {
          openedTab.value.splice(index, 1)
        }
      })
      if (openedTab.value.length === 1) {
        // 标签全部关闭时
        store.commit('CHANGE_TAB', '/system')
        router.push('/system')
      } else {
        editableTabsValue.value = activeName
        store.commit('CHANGE_TAB', activeName)
        router.push(activeName)
      }
    }
    return {
      editableTabsValue,
      openedTab,
      handleCommand,
      removeTab,
      getOpenedTab,
      changeTab
    }
  },
  computed: {
    // getOpenedTab() {
    //   return this['$store'].state.tagNavMod.openedTab
    // },
    // changeTab() {
    //   return this['$store'].state.tagNavMod.activeTab
    // }
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
        if (val.length >= this.openedTab.length) {
          let newTab = val[val.length - 1] // 新增的肯定在数组最后一个
          this.editableTabsValue = newTab.path
          this.openedTab.push(newTab)
          return
        }
        this.openedTab = [
          {
            name: '首页',
            path: '/system'
          },
          ...val
        ]
      },
      deep: true
    }
  },
  methods: {
    handleClickTab(tab) {
      // const route = {
      //   path: tab.props.name,
      //   name: tab.props.label
      // }
      const path = tab.props.name
      this['$store'].commit('CHANGE_TAB', path)
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss">
.tabs {
  position: relative;
  .elTabs {
    padding-right: 40px;
  }
}
.contextmenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
}
.contextmenu li {
  margin: 0;
  padding: 0px 22px;
}
.contextmenu li:hover {
  background: #f2f2f2;
  cursor: pointer;
}
.contextmenu li button {
  color: #2c3e50;
}
</style>
