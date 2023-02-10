<template>
  <div class="find-stu">
    <span>用户名</span>
    <el-input v-model="username.name" placeholder="请输入用户名" clearable style="width: 300px;" />
    <el-button type="primary" size="default" @click="findStudent" style="margin-left: 15px;">查询</el-button>
    <el-button type="primary" size="default" @click="reSet">重置</el-button>
  </div>
  <el-table :data="tableData.slice((currentPage - 1) * 10, currentPage * pageSize)" style="width: 100%">
    <el-table-column label="姓名" width="80" prop="name" align="center">
    </el-table-column>
    <el-table-column label="性别" width="80" prop="sex_text" align="center">
    </el-table-column>
    <el-table-column label="年龄" width="80" prop="age" align="center">
    </el-table-column>
    <el-table-column label="学号" width="80" prop="number" align="center">
    </el-table-column>
    <el-table-column label="班级" width="80" prop="class" align="center">
    </el-table-column>
    <el-table-column label="状态" width="80" prop="state_text" align="center">
    </el-table-column>
    <el-table-column label="地址" width="200" prop="address" align="center">
    </el-table-column>
    <el-table-column label="联系方式" width="120" prop="phone" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center" width="140">
      <template #default="scope">
        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    -->
  </el-table>
  <div class="demo-pagination-block">
    <el-pagination v-model:total="total" v-model:current-page="currentPage" v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]" :small="small" :disabled="disabled" :background="background"
      layout="total, sizes, prev, pager, next, jumper" />
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { student, delStu } from "../../api/api";
export default {
  data() {
    return {
      tableData: [],
      username: {
        name: ''
      },
      total: 1,
      currentPage: 1,
      pageSize: 10,
      small: false,
      background: false,
      disabled: false
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData(params) {
      student(params).then((res) => {
        this.total = res.data.total
        const { data: tableData } = res;
        this.tableData = tableData.data;
        this.tableData.forEach((item) => {
          item.sex_text = item.sex == 1 ? "男" : "女";
          item.state_text =
            item.state == 1 ? "已入学" : item.state == 2 ? "未入学" : "休学中";
        });
      });
    },
    handleDelete(row) {
      delStu(row.id).then((res) => {
        console.log(res);
        if (res.status === 200) {
          ElMessage.success({ message: res.data.message })

        }

        this.reSet()

      })
    },
    findStudent() {
      console.log(this.username);
      this.getData(this.username)
      this.currentPage = 1
    },
    reSet() {
      this.username.name = ''
      this.currentPage = 1
      this.getData()
    }
  },
};
</script>

<style lang="scss" scoped>
.find-stu {
  margin: 10px;

  span {
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    vertical-align: middle;
    margin-right: 10px;
  }
}

.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.demo-pagination-block {
  margin-top: 15px;
}
</style>
