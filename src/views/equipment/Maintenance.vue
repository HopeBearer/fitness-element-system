<template>
  <div class="management-container">
    <!-- 相同导航结构 -->

    <div class="main-content">
      <div class="operation-bar">
        <el-button class="orange-btn" @click="openMaintenanceDialog">
          新建维护
        </el-button>
      </div>

      <el-table :data="maintenanceRecords" class="data-table">
        <el-table-column prop="equipmentName" label="器材名称" width="180" />
        <el-table-column prop="maintenanceDate" label="维护日期" width="140" />
        <el-table-column prop="type" label="类型" width="120">
          <template slot-scope="{ row }">
            <el-tag :type="row.type === 'routine' ? 'warning' : 'danger'">
              {{ row.type | maintenanceType }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="维护内容" />
        <el-table-column prop="cost" label="费用" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="{ row }">
            <el-tag :type="row.status === '已完成' ? 'success' : ''">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="">
            <el-button type="text" class="orange-text">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 维护详情对话框 -->
      <el-dialog :visible.sync="detailVisible" title="维护详情">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="维护人员">李四</el-descriptions-item>
          <el-descriptions-item label="开始时间"
            >2023-07-15 10:00</el-descriptions-item
          >
          <el-descriptions-item label="结束时间"
            >2023-07-16 15:30</el-descriptions-item
          >
          <el-descriptions-item label="维护报告">
            <el-link type="primary">查看PDF</el-link>
          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaintenancePage',
  filters: {
    maintenanceType(type) {
      return type === 'routine' ? '常规保养' : '故障维修'
    }
  },
  data() {
    return {
      detailVisible: false,
      maintenanceRecords: [
        {
          equipmentName: '轨道摄影车',
          maintenanceDate: '2023-07-15',
          type: 'routine',
          content: '常规润滑保养',
          cost: 800,
          status: '已完成'
        }
      ]
    }
  },
  methods: {
    openMaintenanceDialog() {}
  }
}
</script>

<style lang="sass" scoped>
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
</style>
