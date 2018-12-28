<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据显示</template>
						<el-menu-item index="userList">水生生物底栖密度</el-menu-item>
                        <el-menu-item index="userList">水生生物底栖生物量</el-menu-item>
						<el-menu-item index="shopList">水生生物浮游动物密度</el-menu-item>
						<el-menu-item index="adminList">水生浮游植物</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>数据管理</template>
                        <el-menu-item index="addGoods">新增数据</el-menu-item>
						<el-menu-item index="addShop">修改数据</el-menu-item>
						<el-menu-item index="addGoods">删除数据</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>数据统计</template>
						<el-menu-item index="visitor">指标数据统计</el-menu-item>
                        <el-menu-item index="visitor">采用点数据统计</el-menu-item>
                        <el-menu-item index="visitor">月度报表</el-menu-item>
                        <el-menu-item index="visitor">统计表下载</el-menu-item>
						<!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>权限设置</template>
						<el-menu-item index="adminSet">管理员设置</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
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
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
