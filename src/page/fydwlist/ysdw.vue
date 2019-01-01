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
                    property="tintinnopsis_wangi"
                    label="王氏似铃壳虫">
                </el-table-column>
                <el-table-column
                    property="tintinnopsis_kiangsuensis"
                    label="江苏似铃壳虫">
                </el-table-column>
                <el-table-column
                    property="didinium_balbianii_nanum"
                    label="小单环栉毛虫">
                </el-table-column>
                <el-table-column
                    property="coleps_hirtus"
                    label="毛板壳虫">
                </el-table-column>
                <el-table-column
                    property="centropyxis_sp"
                    label="匣壳虫">
                </el-table-column>
                <el-table-column
                    property="strobilidium_sp"
                    label="侠盗虫">
                </el-table-column>
                <el-table-column
                    property="epistylis_sp"
                    label="累枝虫">
                </el-table-column>
                <el-table-column
                    property="stentor_sp"
                    label="喇叭虫">
                </el-table-column>
                <el-table-column
                    property="strombidium_sp"
                    label="急游虫">
                </el-table-column>
                <el-table-column
                    property="ciliophora_sp"
                    label="纤毛虫">
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
                    tintinnopsis_wangi:'',
                    tintinnopsis_kiangsuensis:'',
                    didinium_balbianii_nanum:'',
                    coleps_hirtus:'',
                    centropyxis_sp:'',
                    strobilidium_sp:'',
                    epistylis_sp:'',
                    stentor_sp:'',
                    strombidium_sp:'',
                    ciliophora_sp:''
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
                    this.getData();
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
                this.getData()
            },
            async getData(){
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
