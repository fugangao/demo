<template>

    <el-table :data="tableData.slice((currentPage - 1) * 10, currentPage * pageSize)" style="width: 100%">
        <el-table-column label="姓名" width="80" prop="name" align="center">
        </el-table-column>
        <el-table-column label="性别" width="80" prop="sex_text" align="center">
        </el-table-column>
        <el-table-column label="年龄" width="80" prop="age" align="center">
        </el-table-column>
        <el-table-column label="父亲" width="80" prop="father" align="center">
        </el-table-column>
        <el-table-column label="母亲" width="80" prop="mather" align="center">
        </el-table-column>
        <el-table-column label="家庭住址" width="80" prop="address" align="center">
        </el-table-column>
        <el-table-column label="入校时间" width="200" prop="time" align="center">
        </el-table-column>
        <el-table-column label="联系方式" width="120" prop="phone" align="center">
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
        <el-pagination v-model:total="total" v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]" :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" />
    </div>
</template>

<script>
import { getInfo } from "../../api/api";
export default {
    data() {
        return {
            tableData: [],
            total: 1,
            currentPage: 1,
            pageSize: 10,
            small: false,
            background: false,
            disabled: false
        };
    },
    created() {
        getInfo().then((res) => {
            this.total = res.data.total
            const { data: tableData } = res;
            this.tableData = tableData.data;
            this.tableData.forEach((item) => {
                item.sex_text = item.sex == 1 ? "男" : "女";
            });
        });
    },
};
</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 15px;
}

.demo-pagination-block {
    margin-top: 15px;
}
</style>