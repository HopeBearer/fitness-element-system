<template>
  <div class="user-profile-container">
    <!-- 导航栏 -->
    <el-menu
      mode="horizontal"
      background-color="#2c3e50"
      text-color="#bdc3c7"
      active-text-color="#ff6a00"
      class="profile-nav"
      default-active="/user/list"
      router
    >
      <el-menu-item index="/user/list">用户列表</el-menu-item>
      <el-menu-item index="/user/profile">个人中心</el-menu-item>
      <el-menu-item index="/user/security">安全设置</el-menu-item>
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'PersonalPage',
  data() {
    return {
      activeNav: 'profile',
      form: {
        avatar:
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        username: '器材管理员',
        role: 'manager',
        phone: '13800138000',
        email: 'admin@equipment.com',
        gender: ['male'], // 改为数组格式
        birthdate: '1990-01-01'
      },
      roles: [
        { value: 'admin', label: '系统管理员' },
        { value: 'manager', label: '器材管理员' },
        { value: 'user', label: '普通用户' }
      ],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入有效的手机号码',
            trigger: 'blur'
          }
        ],
        email: [
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ],
        gender: [
          {
            type: 'array',
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.profileForm.validate((valid) => {
        if (valid) {
          this.$message.success('信息更新成功')
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess(res) {
      this.form.avatar = URL.createObjectURL(res.raw)
    },
    beforeAvatarUpload(file) {
      const isImage = ['image/jpeg', 'image/png'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('只能上传 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('头像大小不能超过 2MB!')
      }
      return isImage && isLt2M
    },
    // 新增性别选择处理
    handleGenderChange(selected) {
      if (selected.length > 1) {
        this.form.gender = [selected.pop()]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-profile-container {
  background-color: #f5f7fa;
  min-height: 100vh;

  .profile-nav {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .el-menu-item {
      font-size: 16px;
      transition: all 0.3s;

      &:hover {
        background-color: rgba(255, 106, 0, 0.1) !important;
      }

      &.is-active {
        border-bottom: 3px solid #ff6a00;
      }
    }
  }

  .profile-content {
    padding: 40px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .profile-card {
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    .avatar-section {
      margin-bottom: 30px;
      text-align: center;

      ::v-deep .el-upload {
        border: 2px dashed #ff6a00;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        line-height: 120px;
        transition: all 0.3s;

        &:hover {
          border-color: #ff8533;
        }

        .avatar {
          width: 120px;
          height: 120px;
          object-fit: cover;
        }

        .avatar-uploader-icon {
          font-size: 24px;
          color: #ff6a00;
          line-height: 120px;
        }
      }

      .upload-tip {
        color: #999;
        font-size: 12px;
        margin-top: 10px;
      }
    }

    ::v-deep .el-form {
      .el-form-item {
        margin-bottom: 22px;

        &__label {
          font-weight: 500;
          color: #606266;
          padding-right: 20px;
          line-height: 40px;
        }

        .el-checkbox {
          margin-right: 30px;
        }

        .el-input,
        .el-select {
          width: 100%;
          max-width: 400px;
        }
      }
    }
  }

  .orange-btn {
    background: #ff6a00;
    border-color: #ff6a00;
    padding: 12px 32px;
    font-size: 16px;

    &:hover,
    &:focus {
      background: #ff8533;
      border-color: #ff8533;
    }
  }
}
</style>
