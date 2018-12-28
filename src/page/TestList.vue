<template>
    <section>
        工具条
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getFoods">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        列表
        <el-table :data="foods" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="food_name" label="菜名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="food_id" label="编号" width="100" sortable>
            </el-table-column>
            <el-table-column prop="food_price" label="价格" width="100" sortable>
            </el-table-column>
            <el-table-column prop="food_discount" label="折扣" width="120" sortable>
            </el-table-column>
            <el-table-column prop="food_contents" label="评论" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        工具条
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="菜名" prop="food_name">
                    <el-input v-model="editForm.food_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input-number v-model="editForm.food_price" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="折扣" prop="food_discount">
                    <el-input v-model="editForm.food_discount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="店家评论" prop="food_contents">
                    <el-input type="textarea" v-model="editForm.food_contents" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        新增界面
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="菜名" prop="food_name">
                    <el-input v-model="addForm.food_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="单价">
                    <el-input-number v-model="addForm.food_price" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="折扣">
                    <el-input v-model="addForm.food_discount"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        data: function () {
            return {
                filters: {
                    name: ''
                },
                foods: [],
                total: 0,
                page: 1,
                stores_num: 10000,
                listLoading: false,
                sels: [], // 列表选中列

                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入菜名', trigger: 'blur'}
                    ]
                },
                // 编辑界面数据
                editForm: {
                    food_id: 0,
                    food_name: '',
                    food_price: 10,
                    food_discount: 1,
                    food_contents: ''
                },

                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入菜名', trigger: 'blur'}
                    ]
                },
                // 新增界面数据
                addForm: {
                    food_name: '',
                    food_price: 10,
                    food_discount: 1
                }

            }
        },
        methods: {
            handleCurrentChange (val) {
                this.page = val
                this.getStores()
            },
            // 获取食品列表
            getStores () {
                let para = {
                    page: this.page,
                    name: this.filters.name,
                    stores_num: 10000
                }
                this.listLoading = true
                // NProgress.start();
                getFoodListPage(para).then((result) => {
                    let { total, data } = result
                    this.total = total
                this.foods = data
                this.listLoading = false
            })
            },
            // 删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true
                // NProgress.start();
                let para = row
                console.log(para)
                removeFood(para).then((res) => {
                    this.listLoading = false
                // NProgress.done();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.getStores()
            })
            }).catch(() => {

                })
            },
            // 显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true
                this.editForm = Object.assign({}, row)
            },
            // 显示新增界面
            handleAdd: function () {
                this.addFormVisible = true
                this.addForm = {
                    food_name: '',
                    food_price: 10,
                    food_discount: 1
                }
            },
            // 编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true
                        let para = Object.assign({}, this.editForm)
                        console.log(para)
                        editFood(para).then((res) => {
                            this.editLoading = false
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        })
                        this.$refs['editForm'].resetFields()
                        this.editFormVisible = false
                        this.getStores()
                    })
                    })
                    }
                })
            },
            // 新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true
                        // NProgress.start();
                        let para = Object.assign({}, this.addForm)
                        console.log(para)
                        addFood(para).then((res) => {
                            this.addLoading = false
                        // NProgress.done();
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        })
                        this.$refs['addForm'].resetFields()
                        this.addFormVisible = false
                        this.getStores()
                    })
                    })
                    }
                })
            },
            selsChange: function (sels) {
                this.sels = sels
            },
            // 批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString()
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true
                // NProgress.start();
                let para = { ids: ids }
                batchRemoveFood(para).then((res) => {
                    this.listLoading = false
                // NProgress.done();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                })
                this.getStores()
            })
            }).catch(() => {

                })
            }
        },
        mounted () {
            this.getStores()
        }
    }

</script>

<style scoped>

</style>
