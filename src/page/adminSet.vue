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
                <el-table-column prop="userid" width="100" label="编号" sortable>
                </el-table-column>
                <el-table-column prop="username" label="用户名" sortable width="100">
                </el-table-column>
                <el-table-column prop="phone" width="150" label="联系方式"></el-table-column>
                <el-table-column prop="fydw" label="浮游动物数据"></el-table-column>
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
                <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input disabled="false" v-model="editForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>浮游动物数据
                        <el-select v-model="editForm.fydw" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>浮游植物数据
                        <el-select v-model="editForm.fyzw" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>底栖数据
                        <el-select v-model="editForm.dq" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>微生物数据
                        <el-select v-model="editForm.wsw" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>底泥数据
                        <el-select v-model="editForm.dn" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>其他数据
                        <el-select v-model="editForm.other" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        Tips: 0:不可浏览该类属性； 1: 仅可浏览该类属性 2: 可操作该类属性
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
                </div>
            </el-dialog>

            <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
                <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="addForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="addForm.userpw"></el-input>
                    </el-form-item>
                    <el-form-item label="浮游动物数据" prop="fydw">
                        <el-input-number v-model="editForm.fydw" @change="handleChange" :min="0" :max="1" label="0表示无此项权限，1表示有此项权限"></el-input-number>
                    </el-form-item>
                    <el-form-item label="浮游植物数据" prop="fyzw">
                        <el-input-number v-model="editForm.fyzw" @change="handleChange" :min="0" :max="1" label="0表示无此项权限，1表示有此项权限"></el-input-number>
                    </el-form-item>
                    <el-form-item label="底栖数据" prop="dq">
                        <el-input-number v-model="editForm.dq" @change="handleChange" :min="0" :max="1" label="0表示无此项权限，1表示有此项权限"></el-input-number>
                    </el-form-item>
                    <el-form-item label="微生物数据" prop="wsw">
                        <el-input-number v-model="editForm.wsw" @change="handleChange" :min="0" :max="1" label="0表示无此项权限，1表示有此项权限"></el-input-number>
                    </el-form-item>
                    <el-form-item label="底泥数据" prop="dn">
                        <el-input-number v-model="editForm.dn" @change="handleChange" :min="0" :max="1" label="0表示无此项权限，1表示有此项权限"></el-input-number>
                    </el-form-item>
                    <el-form-item label="其他数据" prop="other">
                        <el-input-number v-model="editForm.other" @change="handleChange" :min="0" :max="1" label="0表示无此项权限，1表示有此项权限"></el-input-number>
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
                options: [{
                    value: '0',
                    label: '不可浏览此项数据'
                }, {
                    value: '1',
                    label: '浏览该项数据'
                }, {
                    value: '2',
                    label: '操作该项数据'
                }],
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
                if (sessionStorage.getItem("userid")==2) {
                    this.listLoading = true
                    listUsers().then((result) => {
                        console.log(result)
                        let { data } = result
                        console.log(data)
                        this.users = data
                        this.listLoading = false
                        // NProgress.done();
                    })
                }else{
                    this.$message({
                        message: '权限不足',
                        type: 'warning'
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
                    if (row.userid==2){
                        this.$message({
                            message:'此用户不可被删除',
                            type:'error'
                        })
                    } else {
                        let para = { userid: row.userid }
                        deluser(para).then((res) => {
                            // NProgress.done();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            this.getUsers()
                        })
                    }
                    this.listLoading = false
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
