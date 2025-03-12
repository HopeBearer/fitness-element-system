<template>
  <div class="register-container">
    <div class="register-box animate__animated animate__zoomIn">
      <h2 class="register-title">用户注册</h2>
      <el-form
        :model="form"
        :rules="rules"
        ref="registerForm"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select
            v-model="form.role"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-button type="primary" class="register-btn" @click="submitForm">
          立即注册
        </el-button>
      </el-form>
      <div class="footer-links">
        已有账号？<router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterIndex',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        role: ''
      },
      roles: [
        { value: 'admin', label: '管理员' },
        { value: 'user', label: '普通用户' }
      ],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 4,
            max: 16,
            message: '长度在 4 到 16 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: '只能包含字母、数字和下划线',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 8,
            max: 20,
            message: '长度在 8 到 20 个字符',
            trigger: 'blur'
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/,
            message: '必须包含字母和数字',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        role: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 处理注册逻辑
          console.log('注册数据:', this.form)
          this.$message.success('注册成功！')
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #ffd7c4, #ffede6);

  .register-box {
    width: 500px;
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .register-title {
      text-align: center;
      color: #ff6a00;
      margin-bottom: 30px;
    }
  }

  .footer-links {
    margin-top: 20px;
    text-align: center;

    a {
      color: #ff6a00;
      text-decoration: underline;
    }
  }
  ::v-deep .el-form-item {
    display: flex; /* 启用flex布局 */
    align-items: center; /* 垂直居中 */
    margin-bottom: 22px;

    &__label {
      flex: 0 0 80px; /* 固定标签宽度 */
      text-align: right; /* 标签右对齐 */
      padding: 0 10px 0 0 !important;
      font-weight: 500;
      color: #606266;
      line-height: 40px; /* 保持与输入框同高 */
    }

    &__content {
      flex: 1; /* 内容区域自适应 */
      display: flex;
      align-items: center;
    }

    .el-input,
    .el-select {
      flex: 1; /* 输入控件占满剩余空间 */
    }
  }

  ::v-deep .el-form-item {
    margin-bottom: 22px;

    &__label {
      font-weight: 500;
      color: #606266;
      padding-bottom: 8px;
      line-height: 1;
    }

    .el-select {
      width: 100%;
    }
  }

  .register-btn {
    width: 100%;
    margin-top: 20px;
    background: #ff6a00;
    border-color: #ff6a00;
    font-size: 16px;
    transition: all 0.3s;

    &:hover {
      background: #ff8533;
      border-color: #ff8533;
    }
  }
}
</style>
