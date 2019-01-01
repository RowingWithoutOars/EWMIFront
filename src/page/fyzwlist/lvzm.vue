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
                    property="chlamydomonas_sp"
                    label="衣藻">
                </el-table-column>
                <el-table-column
                    property="eudorina_elegans"
                    label="空球藻">
                </el-table-column>
                <el-table-column
                    property="pandorina_morum"
                    label="实球藻">
                </el-table-column>
                <el-table-column
                    property="chlorella_vulgaris"
                    label="小球藻">
                </el-table-column>
                <el-table-column
                    property="chlorococcum_infusionum"
                    label="氺溪绿球藻">
                </el-table-column>
                <el-table-column
                    property="chodatella_quadriseta"
                    label="四刺顶棘藻">
                </el-table-column>
                <el-table-column
                    property="ankistrodesmus_falcatus"
                    label="镰形纤维藻">
                </el-table-column>
                <el-table-column
                    property="ankistrodesmus_angustus"
                    label="狭形纤维藻">
                </el-table-column>
                <el-table-column
                    property="treubaria_crassispina"
                    label="粗刺四刺藻">
                </el-table-column>
                <el-table-column
                    property="dictyosphaerium_pulchellum"
                    label="美丽胶网藻">
                </el-table-column>
                <el-table-column
                    property="oocystis_sp"
                    label="卵囊藻">
                </el-table-column>
                <el-table-column
                    property="selenastrum_bibraianum"
                    label="月牙藻">
                </el-table-column>
                <el-table-column
                    property="tetraëdron_trigonum"
                    label="三角四角藻">
                </el-table-column>
                <el-table-column
                    property="crucigenia_apiculata"
                    label="十字藻">
                </el-table-column>
                <el-table-column
                    property="quadrigula_chodatii"
                    label="并联藻">
                </el-table-column>
                <el-table-column
                    property="pediastrum_simplex_var_duodenarium"
                    label="单角盘星藻具孔变种">
                </el-table-column>
                <el-table-column
                    property="pediastrum_duplex_var_gracillimum"
                    label="二角盘星藻纤细变种">
                </el-table-column>
                <el-table-column
                    property="pediastrum_boryanurn"
                    label="短棘盘星藻">
                </el-table-column>
                <el-table-column
                    property="scenedesmus_sp"
                    label="栅藻">
                </el-table-column>
                <el-table-column
                    property="mougeotia_sp"
                    label="转板藻">
                </el-table-column>
                <el-table-column
                    property="spirogyra_sp"
                    label="水绵">
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
                    chlamydomonas_sp:'',
                    eudorina_elegans:'',
                    pandorina_morum:'',
                    chlorella_vulgaris:'',
                    chlorococcum_infusionum:'',
                    chodatella_quadriseta:'',
                    ankistrodesmus_falcatus:'',
                    ankistrodesmus_angustus:'',
                    treubaria_crassispina:'',
                    dictyosphaerium_pulchellum:'',
                    oocystis_sp:'',
                    selenastrum_bibraianum:'',
                    tetraëdron_trigonum :'',
                    crucigenia_apiculata:'',
                    quadrigula_chodatii:'',
                    pediastrum_simplex_var_duodenarium :'',
                    pediastrum_duplex_var_gracillimum:'',
                    pediastrum_boryanurn:'',
                    scenedesmus_sp:'',
                    mougeotia_sp:'',
                    spirogyra_sp:'',
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
