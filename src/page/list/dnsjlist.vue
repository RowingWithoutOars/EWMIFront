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
                        <el-button type="primary" @click="addData()">新增</el-button>
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
                    :filters=jcd
                    :filter-method="filterHandler"
                ></el-table-column>
                <el-table-column
                    prop="riqi"
                    label="日期"
                    sortable
                    width="180"
                    column-key="riqi"
                    :filters=jcd_time
                    :filter-method="filterHandler"
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
                    label="数量">
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
    import {listData,listSingleData} from '../../api/api'
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
                tableData: [{
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
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                chaxunValue: '',
                listLoading: false,
                para:{"lb":"600","userid":sessionStorage.getItem("userid")}
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
            addData(index, row){
                this.$router.push({ path: 'addData'})
            },
            // 更新事件
            updateData(index, row){
                this.$router.push({ path: 'updateData'})
            },
            // 删除事件
            handleDel(index, row){
                this.$router.push({ path: 'delData'})
            },
            // 查询事件
            handleChaxun(){
                this.currentPage = 1
                this.para = {"chaxun":this.chaxunValue,"lb":600,"userid":sessionStorage.getItem("userid")}
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
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
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
                    }else if (val.indexOf('单项指标') > -1 && !this.options[1].shuxing.length) {
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
