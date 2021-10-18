<template>
  <el-container style="height:100%">
    <el-header style="background:#3E4353">
      <nav-bar></nav-bar>
    </el-header>
    <el-container>
      <el-aside>
        <side-bar :list="navList"></side-bar>
      </el-aside>
      <el-main>
        <div>
          <el-container>
            <el-header class="tagNav">
              <tag-nav></tag-nav>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import sideBar from '@/components/sideBar.vue'
import tagNav from '@/components/tagNav.vue'
import navBar from '@/components/navBar.vue'
import { mapState, useStore } from 'vuex'
export default {
  name: 'home',
  components: {
    sideBar,
    tagNav,
    navBar
  },
  setup() {
    const store = useStore()
    store.dispatch('getNavList')
  },
  computed: {
    ...mapState(['navList'])
  }
}
</script>
<style lang="scss" scoped>
.el-main {
  padding: 0;
}
</style>
