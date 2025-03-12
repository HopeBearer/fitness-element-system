<template>
  <div class="management-container">
    <!-- 相同导航结构 -->

    <div class="main-content">
      <div class="filter-bar">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          class="date-picker"
        />

        <el-select
          v-model="storageType"
          placeholder="入库类型"
          clearable
          class="type-select"
        >
          <el-option label="采购入库" value="1" />
          <el-option label="退还入库" value="2" />
          <el-option label="调拨入库" value="3" />
        </el-select>
      </div>

      <el-table :data="storageRecords" class="data-table">
        <el-table-column prop="storageDate" label="入库日期" width="140" />
        <el-table-column prop="equipmentName" label="器材名称" width="180" />
        <el-table-column prop="type" label="类型" width="120">
          <template slot-scope="{ row }">
            <el-tag :type="row.type === '1' ? '' : 'info'">
              {{ row.type | storageTypeFilter }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="100" />
        <el-table-column prop="operator" label="操作人" />
        <el-table-column prop="note" label="备注" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoragePage',
  filters: {
    storageTypeFilter(type) {
      const map = { 1: '采购入库', 2: '退还入库', 3: '调拨入库' }
      return map[type] || '未知类型'
    }
  },
  data() {
    return {
      dateRange: [],
      storageType: '',
      storageRecords: [
        {
          storageDate: '2023-07-20',
          equipmentName: '4K摄像机',
          type: '1',
          quantity: 5,
          operator: '张三',
          note: '年度采购计划'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  .date-picker {
    width: 280px;
  }

  .type-select {
    width: 160px;
  }
}
</style>
