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
                    property="lecane_luna"
                    label="月形腔轮虫">
                </el-table-column>
                <el-table-column
                    property="synchaeta_sp"
                    label="疣毛轮虫">
                </el-table-column>
                <el-table-column
                    property="conochilus_sp"
                    label="聚花轮虫">
                </el-table-column>
                <el-table-column
                    property="collotheca_ambigua"
                    label="多态胶鞘轮虫">
                </el-table-column>
                <el-table-column
                    property="asplanchna_priodonta"
                    label="前节晶囊轮虫">
                </el-table-column>
                <el-table-column
                    property="euchlanis_dilatata"
                    label="大肚须足轮虫">
                </el-table-column>
                <el-table-column
                    property="filinia_longiseta"
                    label="长三肢轮虫">
                </el-table-column>
                <el-table-column
                    property="filinia_maior"
                    label="迈氏三肢轮虫">
                </el-table-column>
                <el-table-column
                    property="polyarthra_vulgaris"
                    label="广布多肢轮虫">
                </el-table-column>
                <el-table-column
                    property="brachionus_calyciflorus"
                    label="萼花臂尾轮虫">
                </el-table-column>
                <el-table-column
                    property="brachionus_angularia"
                    label="角突臂尾轮虫">
                </el-table-column>
                <el-table-column
                    property="trichocerca_similis"
                    label="等刺异尾轮虫">
                </el-table-column>
                <el-table-column
                    property="keratella_cochlearis"
                    label="螺形龟甲轮虫">
                </el-table-column>
                <el-table-column
                    property="keratella_valga"
                    label="曲腿龟甲轮虫">
                </el-table-column>
                <el-table-column
                    property="keratella_quadrata"
                    label="矩形龟甲轮虫">
                </el-table-column>
                <el-table-column
                    property="lcwdz"
                    label="轮虫未定种">
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
                    lecane_luna:'',
                    synchaeta_sp:'',
                    conochilus_sp:'',
                    collotheca_ambigua:'',
                    asplanchna_priodonta:'',
                    euchlanis_dilatata:'',
                    filinia_longiseta:'',
                    filinia_maior:'',
                    polyarthra_vulgaris:'',
                    brachionus_calyciflorus:'',
                    brachionus_angularia :'',
                    trichocerca_similis:'',
                    keratella_cochlearis:'',
                    keratella_valga:'',
                    keratella_quadrata:'',
                    lcwdz:''
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
