<template>
  <!-- 主内容区 -->
  <div class="main-content">
    <!-- 操作栏 -->
    <div class="operation-bar">
      <el-input
        v-model="searchQuery"
        placeholder="请输入器材名称或编号"
        class="search-input"
        clearable
        @clear="loadData"
        @keyup.enter.native="loadData"
      >
        <el-button slot="append" icon="el-icon-search" @click="loadData" />
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="orange-btn"
        @click="openAddDialog"
      >
        新增器材
      </el-button>
    </div>

    <!-- 数据表格 -->
    <el-table
      :data="equipmentData"
      v-loading="loading"
      element-loading-text="数据加载中"
      class="data-table"
      stripe
      border
      height="calc(100vh - 220px)"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="code" label="器材编号" width="200" />
      <el-table-column prop="name" label="器材名称" />
      <el-table-column label="租赁日期" width="160">
        <template slot-scope="{ row }">
          {{ row.rentalDate || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="租赁时长" width="120">
        <template slot-scope="{ row }">
          {{ row.duration ? `${row.duration}天` : '-' }}
        </template>
      </el-table-column>
      <el-table-column label="租赁状态" width="120">
        <template slot-scope="{ row }">
          <el-tag
            :type="statusMap[row.rentalStatus]?.type || 'info'"
            size="medium"
            class="status-tag"
          >
            {{ statusMap[row.rentalStatus]?.label || row.rentalStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="{ row }">
          <div class="action-buttons">
            <el-button type="text" class="orange-text" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button
              type="text"
              class="extend-text"
              @click="handleExtend(row)"
              :disabled="row.rentalStatus !== 'active'"
            >
              延长
            </el-button>
            <el-button
              type="text"
              class="danger-text"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="pagination"
      layout="total, sizes, prev, pager, next"
      :current-page="pagination.current"
      :page-sizes="[10, 20, 50]"
      :page-size="pagination.size"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
export default {
  name: 'OverviewPage',
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
        active: { label: '进行中', type: 'success' },
        overdue: { label: '已逾期', type: 'danger' },
        completed: { label: '已完成', type: 'info' }
      },
      equipmentData: [
        {
          code: 'EQP202307001',
          name: '专业摄像机',
          rentalDate: '2023-07-20',
          duration: 7,
          rentalStatus: 'active'
        },
        {
          code: 'EQP202307002',
          name: '三脚架',
          rentalDate: '2023-07-15',
          duration: 10,
          rentalStatus: 'overdue'
        }
      ]
    }
  },
  methods: {
    loadData() {
      // 加载数据逻辑
    },
    handleEdit(row) {
      console.log('编辑', row)
    },
    handleExtend(row) {
      console.log('延长租赁', row)
    },
    handleDelete(row) {
      console.log('删除', row)
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
  }
}
</script>

<style lang="scss" scoped>
.orange-text {
  color: #ff6a00;
  &:hover {
    color: #ff8533;
  }
}

.extend-text {
  color: #409eff;
  &:hover {
    color: #66b1ff;
  }
}

.danger-text {
  color: #f56c6c;
  &:hover {
    color: #f78989;
  }
}

.data-table {
  ::v-deep {
    .el-table {
      table-layout: fixed;

      &__header {
        th {
          padding: 12px 5px;
        }
      }

      &__body {
        td {
          padding: 8px 5px;
        }
      }

      .status-tag {
        width: 80px;
        margin: 0 auto;
      }

      .action-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;

        .el-button {
          margin-left: 0 !important;
          padding: 0 3px;
        }
      }
    }

    .el-tag {
      &--success {
        background-color: rgba(103, 194, 58, 0.1);
        border-color: rgba(103, 194, 58, 0.2);
        color: #67c23a;
      }
      &--danger {
        background-color: rgba(245, 108, 108, 0.1);
        border-color: rgba(245, 108, 108, 0.2);
        color: #f56c6c;
      }
      &--info {
        background-color: rgba(144, 147, 153, 0.1);
        border-color: rgba(144, 147, 153, 0.2);
        color: #909399;
      }
    }
  }
}
</style>
