<!--suppress ALL -->
<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="serach" style="text-align: left;padding: 20px">
            <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
                <el-form :inline="true">
                    <el-form-item>
                        <el-cascader
                            :options="options"
                            @active-item-change="handleItemChange"
                            :show-all-levels="false"
                            :props="props"
                            @change="handleChange"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleChaxun()">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addNewData()">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
        <div class="table_container">
            <el-table :data="datalist" highlight-current-row v-loading="listLoading" style="width: 100%;">
                <el-table-column
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="cydw"
                    label="监测点"
                    sortable
                    width="180"
                    column-key="cydw"
                ></el-table-column>
                <el-table-column
                    prop="riqi"
                    label="日期"
                    sortable
                    width="180"
                    column-key="riqi"
                >
                </el-table-column>
                <el-table-column
                    prop="sxkey"
                    label="生物"
                    sortable
                    width="180"
                    column-key="sxkey"
                    :filters=sxkey
                    :filter-method="filterHandler">
                </el-table-column>
                <el-table-column
                    property="sxvalue"
                    label="值">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button size="small" @click="updateData(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--编辑界面-->
            <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
                <el-form :model="editForm" label-width="80px" ref="editForm">
                    <el-form-item label="采样点编号" prop="username">
                        <el-input :disabled="true" v-model="editForm.cyd_bh" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="采样点位" prop="cydw">
                        <el-input :disabled="true" v-model="editForm.cydw" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="检测时间" prop="jcd_time">
                        <el-input :disabled="true" v-model="editForm.riqi" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="生物" prop="sxkey">
                        <el-input :disabled="true" v-model="editForm.sxkey" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="值" prop="number">
                        <el-input v-model="editForm.number" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
                </div>
            </el-dialog>

            <!--新增界面-->
            <el-dialog title="编辑" v-model="addFormVisible" :close-on-click-modal="false">
                <el-form :model="addForm" ref="addForm" label-width="110px" class="form data _form">
                    <el-form-item label="记录编号" prop="name">
                        <el-input v-model="addForm.cyd_bh"></el-input>
                    </el-form-item>
                    <el-form-item label="采样点" prop="name">
                        <el-input v-model="addForm.cydw"></el-input>
                    </el-form-item>
                    <el-form-item label="采样时间" prop="activity">
                        <el-input v-model="addForm.riqi"></el-input>
                    </el-form-item>
                    <el-form-item label="生物" prop="description">
                        <el-input v-model="addForm.sxkey"></el-input>
                    </el-form-item>
                    <el-form-item label="生物数量">
                        <el-input v-model="addForm.number"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addSumbit('addForm')">确认添加</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import {listSingleData,delData,renewData, addData,listMoreData} from '../../api/api'
    export default {
        data(){
            return {
                options: [{
                    label: '监测点',
                    shuxing:[]
                }, {
                    label: '监测时间',
                    shuxing:[]
                },{
                    label: '单项指标',
                    shuxing:[]
                }],
                props:{
                    value:'label',
                    children:'shuxing'
                },
                optionsedit: [{
                    value: '密度',
                    label: '密度'
                }, {
                    value: '生物量',
                    label: '生物量'
                }],
                tableData: [{
                    cyd_bh:"",
                    cydw:"监测地",
                    riqi:"监测时间",
                    sxkey:"生物",
                    value:0.0
                }],
                datalist: [],
                jcd_time:[
                    {text: '2018-01', value: '2018-01'}],
                jcd:[
                    {text: 'TH1', value: 'TH1'}],
                sxkey:[
                    {text: 'A', value: 'A'}
                ],
                page: {
                    pageNo: 1, // 当前页码
                    pageSize: 10, // 每页显示行数
                    totalRecords: 0, // 总条数
                    totalPages: 0 // 总页数
                },
                // 编辑界面数据
                editForm: {
                    cyd_bh:'',
                    cydw: '',
                    jcd_time: '',
                    sxkey: '',
                    value:'',
                    value1:'密度',
                },
                // 新增界面数据
                addForm: {
                    cyd_bh:'',
                    cydw: '',
                    riqi: '',
                    sxkey: '',
                    number: '',
                    value1:'密度',
                },
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                chaxunValue: '',
                listLoading: false,
                editFormVisible: false, // 编辑界面是否显示
                addFormVisible: false, // 新增界面是否显示
                editLoading: false,
                value1: '密度',
                lb: "0",
                para:{"lb":0 ,"userid":sessionStorage.getItem("userid")}
            }
        },
        components: {
            headTop,
        },
        created(){
            // this.getData();
            //  let user = sessionStorage.getItem("user")
            //  console.log(sessionStorage.getItem("userid"))
            this.listLoading = true
            this.getlistSingleData(this.para)
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //事件
            addNewData(index, row) {
                this.addFormVisible = true;
                this.addForm = Object.assign({}, row)
                // var cydw = this.addForm['cyd']
                // this.addForm['cydw'] = cydw
                // console.log(cydw)
                console.log(this.addForm)
                this.addForm['value1'] = '密度'
                this.addForm['userid'] = sessionStorage.getItem('userid')
                this.addForm['lb'] = 0
            },
            addSumbit(addForm){
                this.$refs[addForm].validate(async (valid) => {
                    if (valid) {
                        const params = {
                            ...this.addForm,
                        }
                        try{
                            const result = await addData(params);
                            this.addFormVisible= false;
                            console.log(result['code'])
                            if (result['code'] == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.addForm = {
                                    cyd_bh: '',
                                    cyd: '',
                                    jcd_time: '',
                                    sxkey: '',
                                    number: '',
                                    value1:'密度',
                                }
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '权限不足'
                                });
                            }
                        }catch(err){
                            console.log(err)
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
            // 更新事件
            updateData(index, row) {
                this.editFormVisible = true
                this.editForm = Object.assign({}, row)
                this.editForm['value1'] = '密度'
                this.editForm['userid'] = sessionStorage.getItem('userid')
                this.editForm['lb'] = this.lb
            },
            editSubmit(editForm) {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true
                            let para = Object.assign({}, this.editForm)
                            // console.log(para)
                            // console.log(this.editForm.value1)
                            renewData(para).then((res) => {
                                // console.log(res)
                                this.editLoading = false
                                // NProgress.done();
                                let code = res['code']
                                console.log(code)
                                if (code==403){
                                    this.$message({
                                        message: '权限不足',
                                        type: 'warning'
                                    })
                                }else{
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    })
                                }
                                this.$refs['editForm'].resetFields()
                                this.editFormVisible = false
                                this.getlistSingleData(this.para)
                            })
                        })
                    }
                })
            },

            // 删除事件
            handleDel(index, row){
                // this.$router.push({ path: 'delData'})
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true
                    let para = { cyd_bh: row.cyd_bh, jcd_time: row.riqi, sxkey: row.sxkey,"lb":this.lb,"userid":sessionStorage.getItem("userid")}
                    console.log(para)
                    delData(para).then((res) => {
                        this.listLoading = false
                        // NProgress.done();
                        let code = res['code']
                        console.log(code)
                        if (code==403){
                            this.$message({
                                message: '权限不足',
                                type: 'warning'
                            })
                        }else{
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            console.log("111111")
                            this.getlistSingleData(this.para)
                        }
                    })
                }).catch(() => {

                })
            },
            // 查询事件
            handleChaxun(){
                this.currentPage = 1
                this.para = {"chaxun":this.chaxunValue,"lb":this.lb,"userid":sessionStorage.getItem("userid"),"value1":this.value1}
                listMoreData(this.para).then((result) => {
                    let {data, jcd, jcd_time, sxkey,code} = result
                    console.log("code:",code)
                    if (code == 404){
                        this.$message({
                            message: '此属性无详细类别划分',
                            type: 'warning'
                        })
                    }
                    console.log("data:",data)
                    this.datalist = data
                    this.count = this.datalist.length
                    // console.log(this.count,this.offset,this.limit,this.currentPage)
                    console.log("页数："+this.currentPage)
                    this.datalist = this.datalist.slice((this.currentPage-1)*this.limit, (this.currentPage)*this.limit)
                    console.log(jcd)
                    this.jcd = jcd
                    console.log(this.jcd)
                    console.log(this.jcd_time)
                    this.jcd_time = jcd_time
                    console.log(this.jcd_time)
                    this.sxkey = sxkey
                    console.log("sxkey: " + this.sxkey)
                    this.listLoading = false
                })

            },
            // 分页设置
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                console.log(this.count,this.offset,this.limit,this.currentPage)
                // this.getData()
                this.getlistSingleData(this.para)
            },
            // 清除所有的筛选器
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            // 数据筛选事件
            filterHandler(value, row) {
                this.para = {"chaxun":value,"lb":this.lb,"userid":sessionStorage.getItem("userid")}
                if (this.datalist!=null){
                    listSingleData(this.para).then((result) => {
                        let {data, jcd, jcd_time, sxkey} = result
                        console.log("data:",data)
                        this.datalist = data
                        this.count = this.datalist.length
                        // console.log(this.count,this.offset,this.limit,this.currentPage)
                        console.log("页数："+this.currentPage)
                        this.datalist = this.datalist.slice((this.currentPage-1)*this.limit, (this.currentPage)*this.limit)
                        console.log("jcd:",jcd)
                        this.jcd = jcd
                        console.log(this.jcd)
                        console.log(this.jcd_time)
                        this.jcd_time = jcd_time
                        console.log(this.jcd_time)
                        this.sxkey = sxkey
                        console.log("sxkey: " + this.sxkey)
                    })
                }else{
                    this.$message.error('权限不足')
                }
                // const property = column['property'];
                // return row[property] === value;
            },
            // 获取数据列表
            getlistSingleData(para){
                // let para = {"sxkey":"200"}
                listSingleData(para).then((result) => {
                    let {data, jcd, jcd_time, sxkey} = result
                    console.log(data)
                    this.datalist = data
                    this.count = this.datalist.length
                    console.log(this.count,this.offset,this.limit,this.currentPage)
                    this.datalist = this.datalist.slice((this.currentPage-1)*this.limit, (this.currentPage)*this.limit)
                    console.log(jcd)
                    this.jcd = jcd
                    console.log(this.jcd)
                    console.log(this.jcd_time)
                    this.jcd_time = jcd_time
                    console.log(this.jcd_time)
                    this.sxkey = sxkey
                    console.log("sxkey: " + this.sxkey)
                    this.listLoading = false
                })
            },
            handleChange(value){
                this.chaxunValue = value[1]
                console.log(this.chaxunValue)
            },
            // 查询树事件
            handleItemChange(val) {
                setTimeout(_ => {
                    if (val.indexOf('监测点') > -1 && !this.options[0].shuxing.length) {
                        this.options[0].shuxing =this.jcd.map((value,i) => {
                            return {
                                label: value.value,
                                value: value.value
                            }
                        });;
                    } else if (val.indexOf('监测时间') > -1 && !this.options[1].shuxing.length) {
                        this.options[1].shuxing = this.jcd_time.map((value,i) => {
                            return {
                                label: value.value,
                                value: value.value
                            }
                        });
                    }else if (val.indexOf('单项指标') > -1 && !this.options[2].shuxing.length) {
                        this.options[2].shuxing = this.sxkey.map((value, i) => {
                            return {
                                label: value.value,
                                value: value.value
                            }
                        });
                    }
                }, 300);
            }
        },
    }
</script>

<style lang="less">
    @import '../../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
