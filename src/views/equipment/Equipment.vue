<template>
  <div class="equipment-container">
    <!-- 橙色主题导航栏 -->
    <el-menu
      mode="horizontal"
      default-active="/equipments/overview"
      background-color="#394049"
      text-color="#e6e6e6"
      active-text-color="#ff6a00"
      class="custom-nav"
      @select="handleNavSelect"
      router
    >
      <el-menu-item index="/equipments/overview">器材总览</el-menu-item>
      <el-menu-item index="/equipments/category">分类管理</el-menu-item>
      <el-menu-item index="/equipments/storage">入库记录</el-menu-item>
      <el-menu-item index="/equipments/maintenance">维护记录</el-menu-item>
    </el-menu>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EquipmentPage',
  data() {
    return {
      activeNav: 'overview',
      searchQuery: '',
      loading: false,
      pagination: {
        current: 1,
        size: 20,
        total: 0
      },
      statusMap: {
        available: { label: '可租借', type: 'success' },
        rented: { label: '已租出', type: 'warning' },
        maintaining: { label: '维护中', type: 'danger' }
      },
      equipmentData: [
        // 模拟数据
        {
          code: 'EQP202307001',
          name: '专业摄像机',
          category: '摄影器材',
          status: 'available',
          location: 'A区3号柜',
          lastCheck: '2023-07-15'
        }
      ]
    }
  },
  methods: {
    loadData() {
      // 加载数据逻辑
    },
    handleNavSelect(index) {
      this.activeNav = index
      this.loadData()
    },
    handleSizeChange(size) {
      this.pagination.size = size
      this.loadData()
    },
    handlePageChange(page) {
      this.pagination.current = page
      this.loadData()
    },
    openAddDialog() {
      // 打开新增对话框
    }
    // handleEdit(row) {
    //   // 编辑逻辑
    // },
    // handleMaintenance(row) {
    //   // 维护逻辑
    // },
    // handleDelete(row) {
    //   // 删除逻辑
    // }
  }
}
</script>

<style lang="scss" scoped>
.equipment-container {
  height: 100vh;
  background: #f0f2f5;
  overflow: hidden;

  .custom-nav {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

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

  .main-content {
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .operation-bar {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;

    .search-input {
      flex: 1;
      max-width: 400px;

      ::v-deep .el-input-group__append {
        background-color: #ff6a00;
        border-color: #ff6a00;

        .el-button {
          color: white;

          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  }

  .orange-btn {
    background: #ff6a00;
    border-color: #ff6a00;
    padding: 12px 24px;

    &:hover,
    &:focus {
      background: #ff8533;
      border-color: #ff8533;
    }
  }

  .data-table {
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    ::v-deep th {
      background-color: #f8f9fa;
      font-weight: 600;
    }

    .orange-text {
      color: #ff6a00;

      &:hover {
        color: #ff8533;
      }
    }

    .danger-text {
      color: #f56c6c;
    }
  }

  .pagination {
    margin-top: 24px;
    text-align: right;

    ::v-deep .btn-prev,
    ::v-deep .btn-next,
    ::v-deep .number {
      &:hover {
        color: #ff6a00;
      }
    }

    ::v-deep .active {
      background-color: #ff6a00 !important;
      border-color: #ff6a00 !important;
    }
  }
}
</style>
