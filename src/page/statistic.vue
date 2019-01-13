<template>
    <section class="chart-container">

        <el-row>
            <el-col>
                <el-form :inline="true">
                    <el-form-item>
                        <el-select v-model="jcd" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                <span style="float: left">{{ item.value }}</span>
                                <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
                            </el-option>
                        </el-select>
                        <el-select v-model="sxkey" placeholder="请选择">
                            <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <!--<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>-->
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item>-->
                        <!--<el-button type="primary" @click="handleChaxun()">查询</el-button>-->
                    <!--</el-form-item>-->
                </el-form>
            </el-col>
            <el-col :span="12">
                <div id="chartColumn" style="width:900px; height:600px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartBar" style="width:900px; height:600px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:900px; height:600px;"></div>
            </el-col>

        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import {statisticData} from '../api/api'
    export default {
        data() {
            return {
                options: [{
                    value: 'TH5',
                    label: 'TH5'
                },{
                    value: 'SQC寺前村',
                    label: 'SQC寺前村'
                },{
                    value: 'TH4',
                    label: 'TH4'
                },{
                    value: 'TH1',
                    label: 'TH1'
                },{
                    value: 'YSZ',
                    label: 'YSZ'
                },{
                    value: 'TH7',
                    label: 'TH7'
                },{
                    value: 'TH6',
                    label: 'TH6'
                },{
                    value: 'TH9',
                    label: 'TH9'
                },{
                    value: 'TH8',
                    label: 'TH8'
                },{
                    value: '元山闸内',
                    label: '元山闸内'
                },{
                    value: 'WSC污水池',
                    label: 'WSC污水池'
                },{
                    value: 'XHX胥湖心',
                    label: 'XHX胥湖心'
                },{
                    value: 'YYS渔洋山',
                    label: 'YYS渔洋山'
                },{
                    value: '航龚站',
                    label: '航龚站'
                },{
                    value: '太湖漫山',
                    label: '太湖漫山'
                },{
                    value: 'THZ田岸闸',
                    label: 'THZ田岸闸'
                },{
                    value: '渔洋山',
                    label: '渔洋山'
                },{
                    value: '元山闸外',
                    label: '元山闸外'
                },{
                    value: '太湖泽山',
                    label: '太湖泽山'
                },{
                    value: 'TH10',
                    label: 'TH10'
                },{
                    value: '寺前村',
                    label: '寺前村'
                },{
                    value: 'TH3',
                    label: 'TH3'
                },{
                    value: 'TH2',
                    label: 'TH2'
                }],
                options1: [{
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
                chartColumn: null,
                dataTime: ["2","3","4","5","6"],
                dataData: ["1","2","3","4","5"],
                jcd:'Th1',
                sxkey:'100',
            }
        },

        methods: {
            // handleChaxun(){
            //     this.drawColumnChart()
            // },
            drawColumnChart() {
                let para = {"jcd":this.jcd,'sxkey':this.sxkey,}
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.clear()// 清空数据
                statisticData(para).then((result) => {
                    console.log(result)
                    console.log(para)
                    let {lb,data,time} = result
                    console.log(lb)
                    this.chartColumn.setOption({
                        title : {
                            text: this.jcd+"指标",
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:lb
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true, type: ['line', 'bar']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : time
                                // data : time
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                // axisLabel : {
                                //     formatter: '{value} °C'
                                // }
                            }
                        ],
                        series : data
                    });
                })
            },
            drawCharts() {
                this.drawColumnChart()
            },
            getData() {
                statisticData().then((result) => {
                    let {jcd} = result
                    this.options = jcd
                })
            }
            // getCountData(){
            //     countOrder().then((result) => {
            //         let { dataTime,dataSum } = result
            //         this.dataTime = dataTime;
            //         this.dataData = dataSum;
            //         this.chartColumn.setOption({
            //             xAxis: {
            //                 data: dataTime
            //             },
            //             series: [{
            //                 name: '销量',
            //                 data: dataSum
            //             }]
            //         });
            //     })
            // }
        },

        mounted: function () {
            // this.getCountData()
            this.getData()
            this.drawCharts()
            // this.options = this.jcd

        },
        updated: function () {
            this.drawCharts()
            // this.getCountData()
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
