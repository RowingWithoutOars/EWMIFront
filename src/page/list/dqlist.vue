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
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleChaxun">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addData()">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="jcd"
                    label="监测点"
                    sortable
                    width="180"
                    column-key="jcd_time"
                    :filters=jcd
                    :filter-method="filterHandler"
                >
                </el-table-column>
                <el-table-column
                    prop="jcd_time"
                    label="日期"
                    sortable
                    width="180"
                    column-key="jcd_time"
                    :filters=jcd_time
                    :filter-method="filterHandler"
                >
                </el-table-column>

                <el-table-column
                    prop="key"
                    label="生物"
                    sortable
                    width="180"
                    column-key="key"
                    :filters=shengwu
                    :filter-method="filterHandler"
                >
                </el-table-column>

                <el-table-column
                    property="value"
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
    import {getUserList, getUserCount} from '@/api/getData'
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
                    jcd:"",
                    jcd_time:"",
                    sxkey:"",
                    value:0.0
                }],
                jcd_time:[
                    {text: '2018-01', value: '2018-01'},
                    {text: '2018-02', value: '2018-02'},
                    {text: '2018-03', value: '2018-03'},
                    {text: '2018-04', value: '2018-04'}],
                jcd:[
                    {text: 'TH1', value: 'TH1'},
                    {text: 'TH2', value: 'TH2'},
                    {text: 'TH3', value: 'TH3'},
                    {text: 'TH4', value: 'TH4'}],
                sxkey:[
                    {text: 'A', value: 'A'},
                    {text: 'B', value: 'B'},
                    {text: 'C', value: 'C'},
                    {text: 'D', value: 'D'}
                ],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                switch_value:true
            }
        },
        components: {
            headTop,
        },
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getUserCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getData();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            updateData(index, row){
                this.$router.push({ path: 'addData'})
            },
            updateData(index, row){
                this.$router.push({ path: 'updateData'})
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getData()
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            async getData(){
                const Users = await getUserList({offset: this.offset, limit: this.limit});
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    tableData.jcd = item.jcd;
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            },
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
