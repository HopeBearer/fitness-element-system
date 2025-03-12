<template>
  <div class="login-container">
    <div class="login-box animate__animated animate__zoomIn">
      <h2 class="login-title">用户登录</h2>
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm"
          >立即登录</el-button
        >
      </el-form>
      <div class="footer-links">
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 处理登录逻辑
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #ffd7c4, #ffede6);

  .login-box {
    width: 400px;
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .login-title {
      text-align: center;
      color: #ff6a00;
      margin-bottom: 30px;
    }

    .login-btn {
      width: 100%;
      margin-top: 20px;
      background: #ff6a00;
      border-color: #ff6a00;
      font-size: 16px;
    }

    .footer-links {
      margin-top: 20px;
      text-align: center;

      a {
        color: #ff6a00;
        text-decoration: underline;
      }
    }
  }
  ::v-deep .el-form-item {
    display: flex;
    align-items: center;

    .el-form-item__label {
      flex: 0 0 80px; // 固定label宽度
      text-align: left;
      line-height: 40px;
      padding: 0 10px 0 0 !important;
    }

    .el-form-item__content {
      flex: 1;
      margin-left: 0 !important;
    }
  }

  // 调整按钮样式
  .login-btn {
    width: 100%;
    margin-top: 20px;
    background: #ff6a00;
    border-color: #ff6a00;
    font-size: 16px;
  }

  // 调整底部链接位置
  .footer-links {
    margin-top: 30px;
  }
}
</style>
