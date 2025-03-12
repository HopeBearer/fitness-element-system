<template>
  <div class="security-container">
    <div class="security-content">
      <!-- 密码修改 -->
      <el-card class="security-card">
        <div class="card-title">修改密码</div>
        <el-form
          :model="pwdForm"
          :rules="pwdRules"
          ref="pwdForm"
          label-width="120px"
        >
          <el-form-item label="当前密码" prop="oldPassword">
            <el-input
              v-model="pwdForm.oldPassword"
              type="password"
              show-password
              placeholder="请输入当前密码"
            />
          </el-form-item>

          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="pwdForm.newPassword"
              type="password"
              show-password
              placeholder="8-20位字母数字组合"
            />
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="pwdForm.confirmPassword"
              type="password"
              show-password
              placeholder="请再次输入新密码"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="orange-btn"
              :loading="pwdLoading"
              @click="submitPwdForm"
            >
              修改密码
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 手机号修改 -->
      <el-card class="security-card">
        <div class="card-title">修改手机号</div>
        <el-form
          :model="phoneForm"
          :rules="phoneRules"
          ref="phoneForm"
          label-width="120px"
        >
          <el-form-item label="当前手机号">
            <div class="current-phone">138****1234</div>
          </el-form-item>

          <el-form-item label="新手机号" prop="newPhone">
            <el-input
              v-model="phoneForm.newPhone"
              placeholder="请输入新手机号"
            />
          </el-form-item>

          <el-form-item label="短信验证码" prop="smsCode">
            <div class="sms-code-wrapper">
              <el-input
                v-model="phoneForm.smsCode"
                placeholder="6位验证码"
                style="width: 160px"
              />
              <el-button
                class="sms-btn"
                :disabled="smsDisabled"
                @click="sendSMSCode"
              >
                {{ smsBtnText }}
              </el-button>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="orange-btn"
              :loading="phoneLoading"
              @click="submitPhoneForm"
            >
              更换手机号
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecurityPage',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.pwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      activeNav: 'security',
      // 密码修改相关
      pwdForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      pwdLoading: false,
      pwdRules: {
        oldPassword: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
            message: '8-20位字母数字组合'
          }
        ],
        confirmPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      // 手机号修改相关
      phoneForm: {
        newPhone: '',
        smsCode: ''
      },
      phoneLoading: false,
      smsDisabled: false,
      smsBtnText: '获取验证码',
      phoneRules: {
        newPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
        ],
        smsCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    submitPwdForm() {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          this.pwdLoading = true
          // 调用修改密码API
          setTimeout(() => {
            this.pwdLoading = false
            this.$message.success('密码修改成功')
            this.$refs.pwdForm.resetFields()
          }, 1000)
        }
      })
    },
    sendSMSCode() {
      this.$refs.phoneForm.validateField('newPhone', (valid) => {
        if (!valid) {
          this.smsDisabled = true
          let count = 60
          const timer = setInterval(() => {
            if (count <= 0) {
              clearInterval(timer)
              this.smsBtnText = '获取验证码'
              this.smsDisabled = false
            } else {
              this.smsBtnText = `${count}秒后重试`
              count--
            }
          }, 1000)
        }
      })
    },
    submitPhoneForm() {
      this.$refs.phoneForm.validate((valid) => {
        if (valid) {
          this.phoneLoading = true
          // 调用更换手机号API
          setTimeout(() => {
            this.phoneLoading = false
            this.$message.success('手机号修改成功')
            this.$refs.phoneForm.resetFields()
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.security-container {
  background-color: #f5f7fa;
  min-height: 100vh;

  .security-nav {
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

  .security-content {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }

  .security-card {
    margin-bottom: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    .card-title {
      font-size: 18px;
      color: #303133;
      margin-bottom: 24px;
      padding-left: 12px;
      border-left: 4px solid #ff6a00;
    }

    .current-phone {
      color: #606266;
      font-size: 14px;
    }

    .sms-code-wrapper {
      display: flex;
      gap: 12px;

      .sms-btn {
        flex-shrink: 0;
        background: #ff6a00;
        border-color: #ff6a00;
        color: white;

        &:hover {
          background: #ff8533;
          border-color: #ff8533;
        }

        &:disabled {
          background: #ffc299;
          border-color: #ffc299;
        }
      }
    }
  }

  .orange-btn {
    background: #ff6a00;
    border-color: #ff6a00;
    padding: 12px 32px;

    &:hover,
    &:focus {
      background: #ff8533;
      border-color: #ff8533;
    }
  }

  ::v-deep .el-form-item__label {
    color: #606266;
    font-weight: 500;
  }
}
</style>
