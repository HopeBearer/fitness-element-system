<template>
  <el-menu
    default-active="/home"
    router
    class="side-menu"
    @select="handleSelect"
  >
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span>仪表盘</span>
    </el-menu-item>
    <el-menu-item index="/equipments">
      <i class="el-icon-bicycle"></i>
      <span>器材管理</span>
    </el-menu-item>
    <el-menu-item index="/user/list">
      <i class="el-icon-user-solid"></i>
      <span>用户管理</span>
    </el-menu-item>
    <!-- <el-menu-item index="/user/personal">
      <i class="el-icon-user"></i>
      <span>个人中心</span> -->
    <!-- </el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleSelect(index) {
      console.log('Selected:', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  border-right: none;

  .el-menu-item {
    height: 60px;
    line-height: 60px;
    font-size: 16px;

    &:hover {
      background-color: #fff3eb;
    }

    &.is-active {
      background-color: #ffefe6;
      color: #ff6a00;
    }
  }
}
</style>
