<template>
    <section class="chart-container">

        <el-row>
            <el-col>
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
    export default {
        data() {
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
                chartColumn: null,
                dataTime: ["2","3","4","5","6"],
                dataData: ["1","2","3","4","5"]
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                    // title: { text: '最近七日销量' },
                    // tooltip: {},
                    // xAxis: {
                    //     data: this.dataTime
                    // },
                    // yAxis: {},
                    // series: [{
                    //     name: '销量',
                    //     type: 'bar',
                    //     data: this.dataData
                    // }]
                    title : {
                        text: '走势图',
                        subtext: '纯属虚构'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高气温','最低气温']
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
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'最高气温',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
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
                        },
                        {
                            name:'最低气温',
                            type:'line',
                            data:[1, -2, 2, 5, 3, 2, 0],
                            markPoint : {
                                data : [
                                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                });
            },
            handleItemChange(val) {
                setTimeout(_ => {
                    if (val.indexOf('监测点') > -1 && !this.options[0].shuxing.length) {
                        this.options[0].shuxing =this.jcd.map((value,i) => {
                            return {
                                label: value.value,
                                value: value.value
                            }
                        });;
                    } else if (val.indexOf('监测时间') > -1 && !this.options[1].shuxing.length) {
                        this.options[1].shuxing = this.jcd_time.map((value,i) => {
                            return {
                                label: value.value,
                                value: value.value
                            }
                        });
                    }else if (val.indexOf('单项指标') > -1 && !this.options[1].shuxing.length) {
                        this.options[2].shuxing = this.sxkey.map((value, i) => {
                            return {
                                label: value.value,
                                value: value.value
                            }
                        });
                    }
                }, 300);
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
