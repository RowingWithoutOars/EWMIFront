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

        <el-select
            v-model="value11"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
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
    import {getRiqi} from "../api/api";
    export default {
        methods: {
            handleChaxun() {
                // console.log(this.value5)
                // console.log(this.value11)
                // location.href="http://localhost:8080/EWMIS/data/excel/export?value5="+this.value5+"&value11="+this.value11;
                location.href="http://47.101.213.106:8080/EWMIS/data/excel/export?value5="+this.value5+"&value11="+this.value11;

            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    getRiqi(query).then((result) => {
                        setTimeout(() => {
                            this.loading = false;
                            let {data} = result
                            this.states = data
                            this.options2 = this.states.map(item => {
                                return { value: item, label: item };
                            });
                            console.log(this.options2)
                        }, 200);
                    })
                } else {
                    this.options4 = [];
                }
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
                value11: [],
                loading: false,
                states: []
            }
        },
        mounted() {
            this.options2 = this.states.map(item => {
                return { value: item, label: item };
            });
        }
    }
</script>
<style lang="less">
	@import '../style/mixin';

</style>
