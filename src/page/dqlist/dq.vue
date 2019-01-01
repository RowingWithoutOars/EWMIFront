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
                        <el-button type="primary" >查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
        <div class="table_container">
            <el-table
                ref="filterTable"
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    property="jcd"
                    label="监测点">
                </el-table-column>
                    <el-table-column
                        prop="date"
                        label="日期"
                        sortable
                        width="180"
                        column-key="jcd_time"
                        :filters="[{text: '2018-01', value: '2018-01'}, {text: '2018-02', value: '2018-02'}, {text: '2018-03', value: '2018-03'}, {text: '2018-04', value: '2018-04'}]"
                        :filter-method="filterHandler"
                    >
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
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    import headTop from '@/components/headTop'
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
                console.log('active item:', val);
                setTimeout(_ => {
                    if (val.indexOf('监测点') > -1 && !this.options[0].shuxing.length) {
                        this.options[0].shuxing = [{
                            label: 'TH1'
                        }];
                    } else if (val.indexOf('监测时间') > -1 && !this.options[1].shuxing.length) {
                        this.options[1].shuxing = [{
                            label: '2018.1'
                        }];
                    }else if (val.indexOf('单项指标') > -1 && !this.options[1].shuxing.length) {
                        console.log("tableData: "+this.tableData)
                        this.options[2].shuxing = [
                            {
                                label: 'test'
                            }
                        ]
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
