<template>
	<div class="manage_page fillcontain">
        <el-row >
            <div class="header">
                <div class="logo">胥口湾水质信息管理系统</div>
                <div class="header-right">
                    <div class="header-user-con">
                        <!-- 用户头像 -->
                        <div class="user-avator"><img src="../assets/img/img.jpg"></div>
                        <!-- 用户名下拉菜单 -->
                        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item divided  command="infomation">个人信息</el-dropdown-item>
                                <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </el-row>
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据显示</template>
						<el-menu-item index="fyzwlist">水生浮游植物密度</el-menu-item>
                        <el-menu-item index="fyzwswllist">水生浮游植物生物量</el-menu-item>
                        <el-menu-item index="fydwlist">水生浮游动物密度</el-menu-item>
                        <el-menu-item index="fydwswllist">水生浮游动物生物量</el-menu-item>
                        <el-menu-item index="dqlist">水生底栖生物密度</el-menu-item>
                        <el-menu-item index="dqswllist">水生底栖生物生物量</el-menu-item>
                        <el-menu-item index="xkwwswlist">胥口湾微生物数据</el-menu-item>
                        <el-menu-item index="xkwdnlist">胥口湾底泥数据</el-menu-item>
                        <el-menu-item index="szsjlist">水质数据</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>数据统计</template>
						<el-menu-item index="statistic">指标数据统计</el-menu-item>
                        <el-menu-item index="exportExcel">月度报表下载</el-menu-item>
                        <el-menu-item index="importExcel">数据报表上传</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>权限设置</template>
						<el-menu-item index="adminSet">管理员设置</el-menu-item>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" ref="editForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.usersname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="userpd">
                    <el-input type="password" v-model="editForm.userpw"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="editForm.phone" :min="0" :max="200"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
  	</div>
</template>

<script>
    import {updateuser} from '../api/api'
    export default {
        data:function(){
            return{
                editFormVisible: false,
                editLoading: false,
                // 编辑界面数据
                editForm: {
                    userid: 0,
                    usersname: '',
                    userpw: '',
                    phone: ''
                },
            }
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			},
            username(){
                let username = sessionStorage.getItem('username');
                console.log(username)
                return username ? username : this.name;
            }
		},
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    sessionStorage.removeItem('userid')
                    this.$router.push('/');
                }else if (command == 'infomation'){
                    this.editForm.usersname = sessionStorage.getItem('username')
                    this.editFormVisible = true;
                }
            },
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true
                            this.editForm.userid = sessionStorage.getItem('userid')
                            let para = Object.assign({}, this.editForm)
                            console.log("info")
                            updateuser(para).then((res) => {
                                this.editLoading = false
                                // NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                })
                                this.$refs['editForm'].resetFields()
                                this.editFormVisible = false
                                // this.getUsers()
                            })
                        })
                    }
                })
            }
        },
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: grey;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: black;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: black;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
