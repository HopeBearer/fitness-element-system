<template>
  <el-container class="main-container">
    <el-header height="80px">
      <HeaderNav />
    </el-header>
    <el-container>
      <el-aside width="240px">
        <SideBar />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderNav from '@/components/MainLayout/HeaderNav.vue'
import SideBar from '@/components/MainLayout/SideBar.vue'

export default {
  name: 'MainLayoutIndex',
  components: {
    HeaderNav,
    SideBar
  }
}
</script>

<style lang="scss">
.main-container {
  height: 100vh;
  .el-header {
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  // 禁止容器滚动
  .el-container {
    overflow: hidden;
  }
  .el-aside {
    background: #fff;
    border-right: 1px solid #e6e6e6;
  }

  .el-main {
    background: #f5f7fa;
    padding: 30px;
    // overflow-y: hidden; // 禁用垂直滚动
    // overflow-x: hidden; // 禁用水平滚动
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
      padding-right: 15px; // 补偿滚动条宽度
    }
  }
}
</style>
