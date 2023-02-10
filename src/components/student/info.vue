<template>
    <div class="addInfo">
        <el-button type="primary" size="default" @click="addInfo">增加</el-button>
        <el-dialog v-model="dialogVisible" title="添加新信息" width="30%">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                size="large" status-icon>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model.trim="ruleForm.name" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
                    <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="ruleForm.age" />
                </el-form-item>
                <el-form-item label="父亲" prop="father">
                    <el-input v-model="ruleForm.father" />
                </el-form-item>
                <el-form-item label="母亲" prop="mather">
                    <el-input v-model="ruleForm.mather" />
                </el-form-item>
                <el-form-item label="家庭住址" prop="address">
                    <el-input v-model="ruleForm.address" />
                </el-form-item>
                <el-form-item label="入校时间" prop="time">
                    <div class="demo-date-picker">
                        <div class="block">
                            <el-date-picker v-model="ruleForm.time" type="date" placeholder="选择日期" format="YYYY/MM/DD"
                                value-format="YYYY-MM-DD" />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="ruleForm.phone" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancleEdit('ruleFormRef')">取消</el-button>
                    <el-button type="primary" @click="sure">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
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

        <el-table-column label="操作" align="center" width="140">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        -->
    </el-table>
    <div class="demo-pagination-block">
        <el-pagination v-model:total="total" v-model:current-page="currentPage" v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" />
    </div>
</template>

<script>
import { getInfo, delInfo } from "../../api/api";
import { ElMessage, ElMessageBox } from 'element-plus'
export default {

    data() {
        let checkAge = (rule, value, callback) => {
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value > 100 || value < 1) {
                    callback(new Error('必须1-100岁'));
                } else {
                    callback();
                }
            }
        };

        return {
            tableData: [],
            total: 1,
            currentPage: 1,
            pageSize: 10,
            dialogVisible: false,
            ruleForm: {
                name: '',
                age: '',
                sex: '1',
                father: '',
                mather: '',
                time: '',
                address: '',
                phone: '',
            },
            status: true,
            rules: {
                name: [{ type: 'string', required: true, message: '请输入姓名', trigger: 'change' },
                { pattern: /^[\u4e00-\u9fa5]{0,}$/, message: '输入汉字', trigger: 'change' }],
                age: [{ required: true, message: '请输入年龄', trigger: 'change' },
                { type: 'number', message: '请输入数字', trigger: 'change' },
                { validator: checkAge, message: '输入正确数字1-99', trigger: 'change' }
                ],
                sex: [],
                father: [],
                mather: [],
                time: [{ required: true, message: '请输入时间', trigger: 'blur' },],
                address: [{ required: true, message: '请输入地址', trigger: 'blur' },],
                phone: [{ required: true, message: '请输入电话', trigger: 'change' },
                { pattern: /^1[345678]\d{9}$/, message: '请输入合法的手机号', trigger: 'blur' },],
            }
        };
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            getInfo('info').then((res) => {
                const { data: tableData } = res;
                this.total = res.data.total
                this.tableData = tableData.data;
                this.tableData.forEach((item) => {
                    item.sex_text = item.sex == 1 ? "男" : "女";
                });
                console.log(this.tableData);
            });
        },

        sure() {
            this.$refs.ruleFormRef.validate(valid => {
                if (valid) {
                    let method = ''
                    // method = this.status ? 'post' : 'put'
                    this.status ? method = 'post' : method = 'put'
                    getInfo('info', method, this.ruleForm).then(res => {
                        if (res.status === 200) {
                            console.log(res);
                            this.dialogVisible = false
                            ElMessage({ message: '数据添加成功', type: 'success' })
                            this.$refs.ruleFormRef.resetFields()
                            this.getData()
                        }
                    })
                } else {
                    ElMessage({ message: '表单提交失败', type: 'error' })
                }

            })

        },
        handleEdit(row) {

            this.status = false
            this.ruleForm = { ...row, age: Number(row.age) }
            this.dialogVisible = true
            console.log(this.ruleForm);
        },
        cancleEdit(form) {
            console.log(this.$refs);
            this.dialogVisible = false
            this.ruleForm = {
                name: '',
                age: '',
                sex: '1',
                father: '',
                mather: '',
                time: '',
                address: '',
                phone: '',
            }
            this.$refs[form].resetFields()

        },
        addInfo() {
            this.dialogVisible = true
            this.status = true
            console.log(111);

        },
        handleDelete(row) {
            console.log(typeof row.id);
            console.log(Number(row.id));
            delInfo(Number(row.id)).then(res => {
                if (res.status === 200) {
                    ElMessage({ message: '数据删除成功', type: 'success' })
                    this.getData()
                } else {
                    ElMessage({ message: '数据删除失败', type: 'error' })
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.addInfo {
    margin: 20px 0 5px 15px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.demo-pagination-block {
    margin-top: 15px;
}
</style>