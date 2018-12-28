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
                    property="nereidida"
                    label="沙蚕目">
                </el-table-column>
                <el-table-column
                    property="limnodrilus_hoffmeisteri"
                    label="霍甫水丝蚓">
                </el-table-column>
                <el-table-column
                    property="branchiura_sowerbyi"
                    label="苏氏尾鳃蚓">
                </el-table-column>
                <el-table-column
                    property="helobdella_sp"
                    label="泽蛭">
                </el-table-column>
                <el-table-column
                    property="glossiphonia_lata"
                    label="宽身舌蛭">
                </el-table-column>
                <el-table-column
                    property="rheopelopia_sp"
                    label="流粗腹摇蚊属">
                </el-table-column>
                <el-table-column
                    property="tanypus_chinensis"
                    label="中国长足摇蚊">
                </el-table-column>
                <el-table-column
                    property="tanypus_sp"
                    label="长足摇蚊">
                </el-table-column>
                <el-table-column
                    property="cryptochironomus_sp"
                    label="隐摇蚊">
                </el-table-column>
                <el-table-column
                    property="polypodilum_sp"
                    label="多足摇蚊">
                </el-table-column>
                <el-table-column
                    property="einfeldia_kieffer"
                    label="恩非摇蚊">
                </el-table-column>
                <el-table-column
                    property="chironomus_sp"
                    label="摇蚊属">
                </el-table-column>
                <el-table-column
                    property="culicoides_sp"
                    label="库蠓">
                </el-table-column>
                <el-table-column
                    property="grandidierella_sp"
                    label="大鳌蜚">
                </el-table-column>
                <el-table-column
                    property="bellamya_sp"
                    label="环棱螺属">
                </el-table-column>
                <el-table-column
                    property="parafossarulus_striatulus"
                    label="纹沼螺">
                </el-table-column>
                <el-table-column
                    property="semisulcospira_libertina"
                    label="放逸短沟蜷">
                </el-table-column>
                <el-table-column
                    property="unio_douglasiae"
                    label="圆顶珠蚌">
                </el-table-column>
                <el-table-column
                    property="corbicula_fluminea"
                    label="河蚬">
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
                    nereidida: '',
                    limnodrilus_hoffmeisteri: '',
                    branchiura_sowerbyi: '',
                    helobdella_sp: '',
                    glossiphonia_lata: '',
                    rheopelopia_sp: '',
                    tanypus_chinensis: '',
                    tanypus_sp: '',
                    cryptochironomus_sp: '',
                    polypodilum_sp: '',
                    einfeldia_kieffer: '',
                    chironomus_sp: '',
                    culicoides_sp: '',
                    grandidierella_sp: '',
                    bellamya_sp: '',
                    parafossarulus_striatulus: '',
                    semisulcospira_libertina: '',
                    unio_douglasiae:'',
                    corbicula_fluminea:''
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
