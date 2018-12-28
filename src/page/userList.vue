<template>
    <div class="fillcontain">
        <head-top></head-top>

        <div class="table_container">
            工具条
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
                  label="沙蚕目"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="limnodrilus_hoffmeisteri"
                  label="霍甫水丝蚓"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="branchiura_sowerbyi"
                  label="苏氏尾鳃蚓">
                </el-table-column>
                <el-table-column
                    property="branchiura_sowerbyi"
                    label="苏氏尾鳃蚓">
                </el-table-column>
                <el-table-column
                    property="branchiura_sowerbyi"
                    label="苏氏尾鳃蚓">
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
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [{
                    nereidida: '',
                    limnodrilus_hoffmeisteri: '',
                    branchiura_sowerbyi: '',
                    Helobdella_sp: '',
                    Glossiphonia_lata: '',
                    Rheopelopia_sp: '',
                    Tanypus_chinensis: '',
                    Tanypus_sp: '',
                    Cryptochironomus_sp: '',
                    Polypodilum_sp: '',
                    Einfeldia_kieffer: '',
                    Chironomus_sp: '',
                    Culicoides_sp: '',
                    Grandidierella_sp: '',
                    Bellamya_sp: '',
                    Parafossarulus_striatulus: '',
                    Semisulcospira_libertina: '',
                    Unio_douglasiae:'',
                    Corbicula_fluminea:''
                }, {
                  registe_time: '2016-05-04',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1517 弄'
                }, {
                  registe_time: '2016-05-01',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1519 弄'
                }, {
                  registe_time: '2016-05-03',
                  username: '王小虎',
                  city: '上海市普陀区金沙江路 1516 弄'
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
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
