<template>
  <el-row class="aside">
    <el-col>
      <el-menu
        background-color="#333744"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
        style="border:none"
        :default-active="activeMenu"
      >
        <template v-for="sm in list" :key="sm.path">
          <el-sub-menu :index="sm.path" v-if="sm.children">
            <template #title>
              <i :class="sm.iconCls"></i>
              <span>{{ sm.name }}</span>
            </template>
            <el-menu-item
              :index="item.path"
              :key="item.path"
              v-for="item in sm.children"
              @click="clickMenu(item)"
              >{{ item.name }}</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item v-else :index="sm.path" @click="clickMenu(sm)">{{
            sm.name
          }}</el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
  props: {
    list: Array
  },
  setup() {
    let openedTab = ref([])
    return {
      openedTab
    }
  },
  computed: {
    activeMenu() {
      if (this["$store"].state.tagNavMod.activeTab) {
        console.log(this["$store"].state.tagNavMod.activeTab)
        return this["$store"].state.tagNavMod.activeTab
      } else {
        return ''
      }
    }
  },
  methods: {
    clickMenu(componentName) {
      this.openedTab = this["$store"].state.tagNavMod.openedTab
      // tabNum 为当前点击的列表项在openedTab中的index，若不存在则为-1
      let tabNum = this.openedTab.indexOf(componentName)
      if (tabNum === -1) {
        // 该标签当前没有打开
        // 将componentName加入到已打开标签页state.openedTab数组中
        this["$store"].commit('addTab', componentName)
        this["$store"].commit('changeTab', componentName.path)
      } else {
        // 该标签是已经打开过的，需要激活此标签页
        this["$store"].commit('changeTab', componentName.path)
      }
    }
  }
}
</script>
<style lang="scss">
.aside {
  height: 100%;
  background: #3e4353;
  box-sizing: border-box;
}
</style>
