<template>
  <div class="main-content">
    <!-- 操作栏 -->
    <div class="operation-bar">
      <el-input
        v-model="searchName"
        placeholder="请输入分类名称"
        class="search-input"
        clearable
        style="width: 240px"
      />
      <el-button type="primary" class="orange-btn" @click="openCategoryDialog">
        新建分类
      </el-button>
    </div>

    <!-- 数据表格 -->
    <el-table :data="categoryData" class="data-table" stripe border>
      <!-- 分类名称 -->
      <el-table-column
        prop="name"
        label="分类名称"
        min-width="180"
        align="center"
      />

      <!-- 分类编码 -->
      <el-table-column
        prop="code"
        label="分类编码"
        width="160"
        align="center"
      />

      <!-- 分类图标 -->
      <el-table-column label="分类图标" width="140" align="center">
        <template slot-scope="{ row }">
          <img :src="row.icon" class="category-icon" alt="分类图标" />
        </template>
      </el-table-column>

      <!-- 关联器材数量 -->
      <el-table-column
        prop="equipmentCount"
        label="关联器材数量"
        width="180"
        align="center"
      />

      <!-- 创建时间 -->
      <el-table-column
        prop="createdAt"
        label="创建时间"
        width="180"
        align="center"
      />

      <!-- 状态 -->
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" effect="dark">
            {{ row.status ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template slot-scope="{ row }">
          <div class="action-buttons">
            <el-button type="text" class="orange-text" @click="handleEdit(row)">
              编辑
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

    <!-- 分类编辑对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="分类管理" width="600px">
      <el-form
        :model="currentCategory"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="分类名称">
          <el-input
            v-model="currentCategory.name"
            placeholder="请输入分类名称"
          />
        </el-form-item>

        <el-form-item label="分类编码">
          <el-input
            v-model="currentCategory.code"
            placeholder="请输入分类编码"
          />
        </el-form-item>

        <el-form-item label="分类图标">
          <el-upload
            class="icon-uploader"
            action="/api/upload"
            :show-file-list="false"
          >
            <img
              v-if="currentCategory.icon"
              :src="currentCategory.icon"
              class="upload-icon"
            />
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="currentCategory.status"
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CategoryPage',
  data() {
    return {
      searchName: '',
      dialogVisible: false,
      currentCategory: {},
      categoryData: [
        {
          id: 1,
          name: '有氧器械',
          code: 'CARDIO-001',
          icon: 'https://example.com/icon1.png',
          equipmentCount: 28,
          createdAt: '2023-07-20 14:30',
          status: 1
        },
        {
          id: 2,
          name: '力量训练',
          code: 'STRENGTH-002',
          icon: 'https://example.com/icon2.png',
          equipmentCount: 35,
          createdAt: '2023-07-22 09:15',
          status: 0
        }
      ]
    }
  },
  methods: {
    openCategoryDialog() {
      this.currentCategory = {
        name: '',
        code: '',
        icon: '',
        status: 1
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.currentCategory = { ...row }
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认删除该分类吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 执行删除操作
        console.log(row)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.data-table {
  ::v-deep {
    .el-table__header th {
      background-color: #f8f9fa;
      text-align: center;
    }

    .el-table__body td {
      text-align: center;
    }
  }

  .category-icon {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    object-fit: cover;
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
}

.orange-text {
  color: #ff6a00;
  &:hover {
    color: #ff8533;
  }
}

.danger-text {
  color: #f56c6c;
  &:hover {
    color: #f78989;
  }
}

.icon-uploader {
  ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #ff6a00;
    }

    .upload-icon {
      width: 80px;
      height: 80px;
      display: block;
    }

    .uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
  }
}
</style>
