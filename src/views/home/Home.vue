<template>
  <div class="dashboard-container" style="height: 100%">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="mb-20">
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        v-for="(item, index) in stats"
        :key="index"
      >
        <el-card
          class="stat-card animate__animated animate__fadeIn"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="stat-content">
            <div class="stat-icon" :style="{ backgroundColor: item.color }">
              <i :class="item.icon"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ item.value }}</div>
              <div class="stat-title">{{ item.title }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区 -->
    <el-row :gutter="20">
      <el-col :md="16" class="mb-20">
        <el-card class="chart-card">
          <h3 class="chart-title">租赁趋势</h3>
          <div ref="rentChartRef" width="100%" style="height: 400px"></div>
        </el-card>
      </el-col>

      <el-col :md="8">
        <el-card class="chart-card">
          <h3 class="chart-title">器材分类占比</h3>
          <div ref="pieChartRef" style="height: 400px; width: 100%"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 租赁记录表格 -->
    <el-card class="mt-20">
      <h3 class="table-title">最近租赁记录</h3>
      <el-table :data="rentals" style="width: 100%">
        <el-table-column prop="equipment" label="器材名称" width="200">
          <template #default="{ row }">
            <div class="equipment-info">
              <img :src="row.image" class="equipment-img" />
              <span>{{ row.equipment }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="user" align="center" label="用户" width="150" />
        <el-table-column
          prop="date"
          label="租赁日期"
          align="center"
          width="300"
        />
        <el-table-column
          prop="duration"
          label="租赁时长"
          align="center"
          width="180"
        />
        <el-table-column label="状态" align="center" width="180">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status].type" effect="dark">
              {{ statusMap[row.status].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default>
            <el-button type="text" class="operate-btn">详情</el-button>
            <el-button type="text" class="operate-btn">延长</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'HomePage',
  data() {
    return {
      rentChartInstance: null,
      pieChartInstance: null,
      stats: [
        {
          icon: 'el-icon-user',
          title: '注册用户',
          value: '2,568',
          color: '#ff6a00'
        },
        {
          icon: 'el-icon-box',
          title: '器材总数',
          value: '358',
          color: '#67c23a'
        },
        {
          icon: 'el-icon-refresh',
          title: '本周租赁',
          value: '184',
          color: '#e6a23c'
        },
        {
          icon: 'el-icon-money',
          title: '总收入',
          value: '¥86,500',
          color: '#f56c6c'
        }
      ],
      rentChartData: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        series: [
          {
            data: [12, 8, 15, 7, 11, 18, 9],
            type: 'bar',
            itemStyle: {
              color: '#ff9f7f'
            },
            barWidth: '30%'
          }
        ]
      },
      pieChart: {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: 335, name: '有氧器械' },
              { value: 310, name: '力量训练' },
              { value: 234, name: '健身配件' },
              { value: 135, name: '其他器材' }
            ],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
              color: function (params) {
                const colors = ['#ff6a00', '#ff9f7f', '#ffd8c9', '#ffece5']
                return colors[params.dataIndex]
              }
            }
          }
        ]
      },
      rentals: [
        {
          equipment: '商用跑步机',
          user: '李晓明',
          date: '2023-08-01',
          duration: '3天',
          status: 0
        },
        {
          equipment: '组合哑铃',
          user: '王芳',
          date: '2023-08-02',
          duration: '7天',
          status: 1
        },
        {
          equipment: '瑜伽垫套装',
          user: '张伟',
          date: '2023-08-03',
          duration: '1天',
          status: 2
        }
      ],
      statusMap: {
        0: { text: '进行中', type: 'warning' },
        1: { text: '已完成', type: 'success' },
        2: { text: '已取消', type: 'info' }
      }
    }
  },
  methods: {
    initEcharts() {
      if (!this.$refs.rentChartRef) return

      this.rentChartInstance = echarts.init(this.$refs.rentChartRef)
      this.rentChartInstance.setOption(this.rentChartData)
      if (!this.$refs.pieChartRef) return
      this.pieChartInstance = echarts.init(this.$refs.pieChartRef)
      this.pieChartInstance.setOption(this.pieChart)
    },
    handleResize() {
      if (this.rentChartInstance) {
        this.rentChartInstance.resize()
      }
      if (this.pieChartInstance) {
        this.pieChartInstance.resize()
      }
    }
  },
  mounted() {
    this.initEcharts()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.rentChartInstance) {
      this.rentChartInstance.dispose()
    }
    if (this.pieChartInstance) {
      this.pieChartInstance.dispose()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;

  .stat-card {
    margin-bottom: 20px;

    .stat-content {
      display: flex;
      align-items: center;
      padding: 20px;

      .stat-icon {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;

        i {
          font-size: 40px;
          color: white;
        }
      }

      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #303133;
      }

      .stat-title {
        color: #909399;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .chart-card {
    margin-bottom: 20px;

    .chart-title {
      margin-bottom: 20px;
      color: #303133;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .table-title {
    margin-bottom: 20px;
    color: #303133;
    font-size: 18px;
    font-weight: bold;
  }

  .equipment-info {
    display: flex;
    align-items: center;
    .equipment-img {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      margin-right: 10px;
      object-fit: cover;
    }
  }

  .operate-btn {
    color: #ff6a00;
    &:hover {
      color: #ff8247;
    }
  }

  .mb-20 {
    margin-bottom: 20px;
  }
  .mt-20 {
    margin-top: 20px;
  }
}
</style>
