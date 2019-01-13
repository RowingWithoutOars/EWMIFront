<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
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
                        <el-menu-item index="visitor">月度报表下载</el-menu-item>
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
