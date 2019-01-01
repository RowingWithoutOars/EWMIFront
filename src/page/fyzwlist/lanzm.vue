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
                    property="microcystis_aeruginosa"
                    label="铜绿微囊藻">
                </el-table-column>
                <el-table-column
                    property="chroococcus_sp"
                    label="色球藻">
                </el-table-column>
                <el-table-column
                property="pseudanabaena_sp"
                label="假鱼腥藻">
            </el-table-column>
                <el-table-column
                    property="anabaena_sp"
                    label="鱼腥藻">
                </el-table-column>
                <el-table-column
                    property="anabaenaflos_aquae"
                    label="水华鱼腥藻">
                </el-table-column>
                <el-table-column
                    property="phormidium_tenue"
                    label="小席藻">
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
                    microcystis_aeruginosa:'',
                    chroococcus_sp:'',
                    pseudanabaena_sp:'',
                    anabaena_sp:'',
                    anabaenaflos_aquae:'',
                    phormidium_tenue:''
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
