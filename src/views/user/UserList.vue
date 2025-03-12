<!-- UserList.vue -->
<template>
  <div class="user-management">
    <div class="main-content">
      <!-- 搜索栏 -->
      <div class="operation-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户"
          class="search-input"
          clearable
          @clear="loadUsers"
        >
          <el-button slot="append" icon="el-icon-search" @click="loadUsers" />
        </el-input>
      </div>

      <!-- 用户表格 -->
      <el-table :data="userData" stripe class="data-table">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="role" label="角色" width="120">
          <template slot-scope="{ row }">
            <el-tag :type="row.role === 'admin' ? 'warning' : ''">
              {{ row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" />
        <el-table-column label="在线状态" width="120">
          <template slot-scope="{ row }">
            <el-tag :type="row.isOnline ? 'success' : 'info'" effect="dark">
              {{ row.isOnline ? '在线' : '离线' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope>
            <el-button type="text" class="orange-text">详情</el-button>
            <el-button type="text" class="orange-text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserListPage',
  data() {
    return {
      activeNav: 'users',
      searchQuery: '',
      userData: [
        {
          id: 1,
          username: 'admin',
          role: 'admin',
          phone: '13800138000',
          isOnline: true // 改为布尔值类型
        },
        {
          id: 2,
          username: 'user01',
          role: 'user',
          phone: '13912345678',
          isOnline: false
        }
      ]
    }
  },
  methods: {
    loadUsers() {
      // 加载用户数据方法
    }
  }
}
</script>

<style lang="scss" scoped>
.user-management {
  .main-content {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .data-table {
    margin-top: 20px;

    ::v-deep .el-table__row {
      transition: background-color 0.3s;

      &:hover {
        background-color: #fffaf5;
      }
    }

    .el-tag {
      &.el-tag--success {
        background-color: #67c23a;
        border-color: #67c23a;
      }
      &.el-tag--info {
        background-color: #909399;
        border-color: #909399;
      }
    }
  }

  .orange-text {
    color: #ff6a00;
    &:hover {
      color: #ff8533;
    }
  }
}
</style>
