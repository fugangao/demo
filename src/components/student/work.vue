<template>
    <el-table :data="tableData.slice((currentPage - 1) * 10, currentPage * pageSize)" style="width: 100%">
        <el-table-column label="用户ID" prop="id" align="center" style="width: 20%">
        </el-table-column>
        <el-table-column label="班级" prop="userId" align="center" style="width: 20%">
        </el-table-column>
        <el-table-column label="作业名称" prop="title" align="center" style="width: 40%">
        </el-table-column>
        <el-table-column label="完成情况" prop="complete_text" align="center" style="width: 20%">
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block" style="margin: 20px auto;text-align: center;">
        <el-pagination v-model:total="total" v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
            style="justify-content: center;" />
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
        };
    },
    created() {
        getInfo('works').then((res) => {
            this.total = res.data.total
            const { data: tableData } = res;
            this.tableData = tableData.data;
            this.tableData.forEach((item) => {
                item.complete_text = item.completed ? "已完成" : "未完成";
            });
            console.log(this.tableData);
        });
    },
};
</script>

<style lang="scss" scoped>

</style>