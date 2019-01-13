<template>
    <div>
        <el-select v-model="value5" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>

        <el-select v-model="value11" placeholder="请选择">
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search"@click="handleChaxun()">下载</el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleChaxun() {
                console.log(this.value5)
                console.log(this.value11)
                location.href="http://localhost:8080/data/excel/export?value5="+this.value5+"&value11="+this.value11;
            }
        },
        data() {
            return {
                options: [{
                    value: '100',
                    label: '浮游植物密度'
                }, {
                    value: '200',
                    label: '浮游植物生物量'
                },{
                    value: '700',
                    label: '浮游动物密度'
                }, {
                    value: '800',
                    label: '浮游动物生物量'
                },{
                    value: '301',
                    label: '底栖物密度'
                }, {
                    value: '302',
                    label: '底栖动物生物量'
                }, {
                    value: '400',
                    label: '微生物群落'
                }, {
                    value: '500',
                    label: '底泥数据'
                }, {
                    value: '0',
                    label: '水质数据'
                }],
                options2:[
                    {
                        value: '2018.03',
                        label: '2018.03'
                    },
                    {
                        value: '2018.06',
                        label: '2018.06'
                    }
                ],
                value5: [],
                value11: []
            }
        }
    }
</script>
<style lang="less">
	@import '../style/mixin';

</style>
