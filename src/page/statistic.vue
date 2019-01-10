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
                                <span style="float: left">{{ item.label }}</span>
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
                    <el-form-item>
                        <el-button type="primary" @click="handleChaxun">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartBar" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
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
                    value: '选项1',
                    label: 'Test1'
                }],
                options1: [{
                    value: '10',
                    label: '浮游植物'
                }, {
                    value: '30',
                    label: '底栖生物'
                }, {
                    value: '70',
                    label: '浮游动物'
                }, {
                    value: '80',
                    label: '微生物群落'
                }, {
                    value: '90',
                    label: '底泥数据'
                }],
                chartColumn: null,
                dataTime: ["2","3","4","5","6"],
                dataData: ["1","2","3","4","5"],
                jcd:[],
                sxkey:[]
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                statisticData().then((result) => {
                    let {jcd,sxkey,sxvalue,sx,time,jcdw} = result
                    // this.jcd = jcd
                    // this.options = jcd
                    // console.log(sxkey)
                    // this.sxkey = sxkey
                    // console.log(this.jcd,this.jctime,this.sxkey)
                    this.chartColumn.setOption({
                        title : {
                            text: jcdw+"生物量",
                            // subtext: '纯属虚构'
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:[].push(sx)
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
                        series : [
                            {
                                name:sx,
                                type:'line',
                                // data:[11, 11, 15, 13, 12, 13, 10],
                                data: sxvalue,
                                markPoint : {
                                    data : [
                                        {type : 'max', name: '最大值'},
                                        {type : 'min', name: '最小值'}
                                    ]
                                },
                                markLine : {
                                    data : [
                                        {type : 'average', name: '平均值'}
                                    ]
                                }
                            }
                            // ,
                            // {
                            //     name:'最低气温',
                            //     type:'line',
                            //     data:[1, -2, 2, 5, 3, 2, 0],
                            //     markPoint : {
                            //         data : [
                            //             {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                            //         ]
                            //     },
                            //     markLine : {
                            //         data : [
                            //             {type : 'average', name : '平均值'}
                            //         ]
                            //     }
                            // }
                        ]
                    });
                })
            },
            drawCharts() {
                this.drawColumnChart()
            },
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
            this.drawCharts()
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
