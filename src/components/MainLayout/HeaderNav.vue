<template>
  <div class="header-nav">
    <div class="logo">
      <span>健身器材租赁系统</span>
    </div>
    <div class="nav-items">
      <router-link to="/login" class="nav-item">登录</router-link>
      <router-link to="/register" class="nav-item">注册</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .logo {
    display: flex;
    align-items: center;

    img {
      height: 50px;
      margin-right: 15px;
    }

    span {
      font-size: 24px;
      font-weight: bold;
      color: #303133;
    }
  }

  .nav-items {
    .nav-item {
      margin-left: 40px;
      color: #606266;
      font-size: 16px;
      transition: color 0.3s;

      &:hover {
        color: #ff6a00;
      }

      &.router-link-exact-active {
        color: #ff6a00;
        font-weight: bold;
      }
    }
  }
}
</style>
