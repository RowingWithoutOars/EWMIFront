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
                    property="aulacoseira_granulata"
                    label="颗粒沟链藻">
                </el-table-column>
                <el-table-column
                    property="aulacoseira_granulata_var_angustissima"
                    label="颗粒沟链藻最窄变种">
                </el-table-column>
                <el-table-column
                    property="aulacoseira_granulata_var_ngustissima_f_piralis"
                    label="螺旋颗粒沟链藻">
                </el-table-column>
                <el-table-column
                    property="aulacoseira_ambigua"
                    label="模糊沟链藻">
                </el-table-column>
                <el-table-column
                    property="melosira_varians"
                    label="变异直链藻">
                </el-table-column>
                <el-table-column
                    property="pleurosira_sp"
                    label="侧链藻">
                </el-table-column>
                <el-table-column
                    property="cyclotella_sp"
                    label="小环藻">
                </el-table-column>
                <el-table-column
                    property="bacillaria_paradoxa"
                    label="奇异杆状藻">
                </el-table-column>
                <el-table-column
                    property="asterionella_formosa"
                    label="美丽星杆藻">
                </el-table-column>
                <el-table-column
                    property="fragilaria_sp"
                    label="脆杆藻">
                </el-table-column>
                <el-table-column
                    property="fragilaria_construens"
                    label="连结脆杆藻">
                </el-table-column>
                <el-table-column
                    property="synedra_sp"
                    label="针杆藻">
                </el-table-column>
                <el-table-column
                    property="synedra_acus"
                    label="尖针杆藻">
                </el-table-column>
                <el-table-column
                    property="synedra_ulna"
                    label="肘状针杆藻">
                </el-table-column>
                <el-table-column
                    property="navicula_sp"
                    label="舟形藻">
                </el-table-column>
                <el-table-column
                    property="navicula_cryptocephala"
                    label="隐头舟形藻">
                </el-table-column>
                <el-table-column
                    property="navicula_pupula"
                    label="瞳孔舟形藻">
                </el-table-column>
                <el-table-column
                    property="navicula_anglica"
                    label="英吉利舟形藻">
                </el-table-column>
                <el-table-column
                    property="gyrosigma_kiitzingii"
                    label="细布纹藻">
                </el-table-column>
                <el-table-column
                    property="gomphonema_sp"
                    label="异极藻">
                </el-table-column>
                <el-table-column
                    property="gomphonema_angutatum"
                    label="窄异极藻">
                </el-table-column>
                <el-table-column
                    property="gomphonema_intricatum"
                    label="中间异极藻">
                </el-table-column>
                <el-table-column
                    property="gomphonema_olivaceum"
                    label="橄榄形异极藻">
                </el-table-column>
                <el-table-column
                    property="cocconeis_placentula"
                    label="扁圆卵形藻">
                </el-table-column>
                <el-table-column
                    property="cocconeis_pediculus"
                    label="柄卵形藻">
                </el-table-column>
                <el-table-column
                    property="achnanthes_sp"
                    label="曲壳藻">
                </el-table-column>
                <el-table-column
                    property="cymbella_sp"
                    label="桥弯藻">
                </el-table-column>
                <el-table-column
                    property="cymbella_cistula"
                    label="箱型桥弯藻">
                </el-table-column>
                <el-table-column
                    property="cymbella_affinis"
                    label="近缘桥弯藻">
                </el-table-column>
                <el-table-column
                    property="cymbella_delicatula"
                    label="披针桥弯藻">
                </el-table-column>
                <el-table-column
                    property="cymatopleura_solea"
                    label="草鞋形波缘藻">
                </el-table-column>
                <el-table-column
                    property="nitzschia_sp"
                    label="菱形藻">
                </el-table-column>
                <el-table-column
                    property="nitzschia_palea"
                    label="谷皮菱形藻">
                </el-table-column>
                <el-table-column
                    property="nitzschia_intermedia"
                    label="中型菱形藻">
                </el-table-column>
                <el-table-column
                    property="surirella_robusta"
                    label="粗壮双菱藻">
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
                    aulacoseira_granulata:'',
                    aulacoseira_granulata_var_angustissima:'',
                    aulacoseira_granulata_var_ngustissima_f_piralis:'',
                    aulacoseira_ambigua:'',
                    melosira_varians:'',
                    pleurosira_sp:'',
                    cyclotella_sp:'',
                    bacillaria_paradoxa:'',
                    asterionella_formosa:'',
                    fragilaria_sp:'',
                    fragilaria_construens:'',
                    synedra_sp:'',
                    synedra_acus:'',
                    synedra_ulna:'',
                    navicula_sp:'',
                    navicula_cryptocephala:'',
                    navicula_pupula:'',
                    navicula_anglica:'',
                    gyrosigma_kiitzingii:'',
                    gomphonema_sp:'',
                    gomphonema_angutatum:'',
                    gomphonema_intricatum:'',
                    gomphonema_olivaceum:'',
                    cocconeis_placentula:'',
                    cocconeis_pediculus:'',
                    achnanthes_sp:'',
                    cymbella_sp:'',
                    cymbella_cistula:'',
                    cymbella_affinis:'',
                    cymbella_delicatula:'',
                    cymatopleura_solea:'',
                    nitzschia_sp:'',
                    nitzschia_palea:'',
                    nitzschia_intermedia:'',
                    surirella_robusta:''
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
