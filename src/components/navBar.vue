<template>
  <div class="navbar">
    <h1>管理平台</h1>
    <div class="user">
      <el-avatar
        :size="35"
        :src="circleUrl"
        style="margin-right:5px"
      ></el-avatar>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="color:#fff;cursor:pointer">
          user
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="exit">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  setup() {
    const handleCommand = e => {
      switch (e) {
        case 'setting':
          break
        case 'exit':
          break
      }
    }
    return {
      handleCommand
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user {
    display: flex;
    align-items: center;
    color: #fff;
    .name {
      cursor: pointer;
    }
  }
}
h1 {
  margin: 0;
  color: #fff;
}
</style>
