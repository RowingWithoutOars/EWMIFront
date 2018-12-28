<template>
    <div class="fillcontain">
        <head-top></head-top>
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
                    property="cyclops_strenuus"
                    label="英勇剑水蚤">
                </el-table-column>
                <el-table-column
                    property="thermocyclops_hyalinus"
                    label="透明温剑水蚤">
                </el-table-column>
                <el-table-column
                    property="sinodiaptomus_sarsi"
                    label="大型中镖水蚤">
                </el-table-column>
                <el-table-column
                    property="limnoithona_sinensis"
                    label="中华窄腹水蚤">
                </el-table-column>
                <el-table-column
                    property="sinocalanus_dorrii"
                    label="汤匙华哲水蚤">
                </el-table-column>
                <el-table-column
                    property="jssrzyt"
                    label="剑水蚤桡足幼体">
                </el-table-column>
                <el-table-column
                    property="zssrzyt"
                    label="哲水蚤桡足幼体">
                </el-table-column>
                <el-table-column
                    property="wjyt"
                    label="无节幼体">
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
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [{
                    cyclops_strenuus:'',
                    thermocyclops_hyalinus:'',
                    sinodiaptomus_sarsi:'',
                    limnoithona_sinensis:'',
                    sinocalanus_dorrii:'',
                    jssrzyt:'',
                    zssrzyt:'',
                    wjyt:''
                }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
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
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            async getUsers(){
                const Users = await getUserList({offset: this.offset, limit: this.limit});
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    tableData.username = item.username;
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
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
