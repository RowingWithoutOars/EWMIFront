<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p class="explain_text">水质数据展示系统</p>
        <p class="explain_text">苏州科技大学嵌入式1511寒假实训演练项目</p>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
    	},
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
