<!--suppress ALL -->
<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-button size="small" @click="handleAdd">新增</el-button>
            <el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
                <el-table-column
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column prop="userid" label="编号" sortable>
                </el-table-column>
                <el-table-column prop="username" label="用户名" sortable width="100">
                </el-table-column>
                <el-table-column prop="fydw" label="浮游动物数据">
                </el-table-column>
                <el-table-column prop="fyzw" label="浮游植物数据"></el-table-column>
                <el-table-column prop="dq" label="底栖数据"></el-table-column>
                <el-table-column prop="wsw" label="微生物数据"></el-table-column>
                <el-table-column prop="dn" label="底泥数据"></el-table-column>
                <el-table-column prop="other" label="其他类型数据">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="240">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--编辑界面-->
            <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
                <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="editForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="浮游动物数据" prop="fydw">
                        <el-input v-model="editForm.fydw" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="浮游植物数据" prop="fyzw">
                        <el-input v-model="editForm.fyzw" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="底栖数据" prop="dq">
                        <el-input v-model="editForm.dq" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="微生物数据" prop="wsw">
                        <el-input v-model="editForm.wsw" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="底泥数据" prop="dn">
                        <el-input v-model="editForm.dn" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="其他数据" prop="other">
                        <el-input v-model="editForm.other" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="userpd">
                        <el-input v-model="editForm.userpd" :min="0" :max="200"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
                </div>
            </el-dialog>

            <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
                <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="addForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="addForm.userpw"></el-input>
                    </el-form-item>
                    <el-form-item label="浮游动物数据">
                        <el-input v-model="addForm.fydw"></el-input>
                    </el-form-item>
                    <el-form-item label="浮游植物数据">
                        <el-input v-model="addForm.fyzw"></el-input>
                    </el-form-item>
                    <el-form-item label="底栖数据">
                        <el-input v-model="addForm.dq"></el-input>
                    </el-form-item>
                    <el-form-item label="微生物数据">
                        <el-input v-model="addForm.wsw"></el-input>
                    </el-form-item>
                    <el-form-item label="底泥数据">
                        <el-input v-model="addForm.dn"></el-input>
                    </el-form-item>
                    <el-form-item label="其他数据">
                        <el-input v-model="addForm.other"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {listUsers, adduser, deluser, updateuser} from '../api/api'
    export default {
        data: function () {
            return {
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                stores_num: 10000,
                listLoading: false,
                sels: [], // 列表选中列

                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true}
                    ]
                },
                // 编辑界面数据
                editForm: {
                    userid: 0,
                    username: '',
                    userpw: '',
                    fydw: '',
                    fyzw: '',
                    dq: '',
                    wsw: '',
                    dn: '',
                    other: ''
                },

                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: []
                },
                // 新增界面数据
                addForm: {
                    username: '',
                    userpw: '',
                    fydw: '',
                    fyzw: '',
                    dq: '',
                    wsw: '',
                    dn: '',
                    other: ''
                }

            }
        },
        methods: {

            handleCurrentChange (val) {
                this.page = val
                this.getUsers()
            },
            // 获取用户列表
            getUsers () {
                // this.listLoading = true
                if (sessionStorage.getItem("userid")==1) {
                    this.listLoading = true
                    listUsers().then((result) => {
                        console.log(result)
                        let { data } = result
                        console.log(data)
                        this.users = data
                        this.listLoading = false
                        // NProgress.done();
                    })
                }
                // NProgress.start();

            },
            // 删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true
                    let para = { userid: row.userid }
                    deluser(para).then((res) => {
                        this.listLoading = false
                        // NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getUsers()
                    })
                }).catch(() => {

                })
            },
            // 显示编辑界面
            handleEdit: function (index, row) {
                console.log('handleEdit')
                console.log(index)
                this.editFormVisible = true
                this.editForm = Object.assign({}, row)
                console.log(this.editFormVisible)
            },
            // 显示新增界面
            handleAdd: function () {
                this.addFormVisible = true
                this.addForm = {
                    username: '',
                    userpd: '',
                    lb: ''
                }
            },
            // 编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true
                            let para = Object.assign({}, this.editForm)
                            updateuser(para).then((res) => {
                                this.editLoading = false
                                // NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                })
                                this.$refs['editForm'].resetFields()
                                this.editFormVisible = false
                                this.getUsers()
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
                            adduser(para).then((res) => {
                                this.addLoading = false
                                // NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                })
                                this.$refs['addForm'].resetFields()
                                this.addFormVisible = false
                                this.getUsers()
                            })
                        })
                    }
                })
            }
        },
        mounted () {
            this.getUsers()
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
