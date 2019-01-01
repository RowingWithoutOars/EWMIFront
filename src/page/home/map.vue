<template>
    <div id="helloword">
        <div id="map2"></div>
    </div>
</template>
<script>
    import china from '../../../static/china.js'
    export default {
        data() {
            return {
                charts: ''
            }
        },
        methods:{
            initEchart(){
                // 绘制地图2
                var myChartMap2 = this.$echarts.init(document.getElementById('map2'));
                // 地图上数据
                var myData = [
                    {cyd: 'TH1', value: [120.443205, 31.178405, 90]},
                    {cyd: 'TH2', value: [120.446923333333, 31.183655, 120]},
                    {cyd: 'TH3', value: [120.38, 37.35, 142]},
                    {cyd: 'TH4', value: [122.207216, 29.985295, 123]},
                    {cyd: 'TH5', value:[110.245672,30.7787677,566]}
                ]

                myChartMap2.setOption({

                    // 新建一个地理坐标系 geo ，
                    geo: {
                        map: 'china',//地图类型为中国地图
                        itemStyle:{ // 定义样式
                            normal:{       // 普通状态下的样式
                                areaColor:'#6699CC',
                                borderColor: '#fff',
                            },
                            emphasis: {         // 高亮状态下的样式
                                areaColor: '#e9fbf1'
                            }
                        },
                        scaleLimit:{
                            min:1,
                            max:1,
                        }

                    },
                    // hover显示目标数据
                    tooltip : {
                        trigger: 'item',
                        // tooltip的trigger的值可以有'item'、'axis'。
                        //'item':数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
                        //'axis':坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
                        textStyle:{
                            align:'left'
                        },
                    },
                    // 图表背景色
                    backgroundColor: '#404a59',
                    // 标志颜色
                    color:'red',
                    // 新建散点图series
                    series:[{
                        cyd:'',//series名称
                        type:'scatter',//为散点类型
                        coordinateSystem: 'geo',// series坐标系类型
                        data:myData,
                        symbol:'pin',
                        symbolSize:[20,20]
                    }],

                    // 添加视觉映射组件
                    visualMap: {
                        type: 'continuous', // 连续型
                        min: 0,           // 值域最小值，必须参数
                        max: 600,     // 值域最大值，必须参数
                        calculable: true, // 是否启用值域漫游
                        inRange: {
                            color: ['red']
                            // 指定数值从低到高时的颜色变化
                        },
                        textStyle: {
                            color: '#fff' // 值域控件的文本颜色
                        }
                    }
                })
            },
        },
        mounted(){
            this.initEchart()
        },
    }
</script>
<style scoped>
    #helloworld{
        width: 100%;
    }
    .wrapper{
        width: 76.05%;
        margin:0 auto;
        /*background: #000;*/
    }
    #zhuxingtu{
        width: 800px;
        height:400px;
        float:left;
    }
    #zhuxingtu2{
        width: 800px;
        height:400px;
        margin-left: 10px;
        float:left;
    }
    #shanxingtu{
        width: 800px;
        height:400px;
        margin-top:10px;
        float: left;
    }
    #huanxingtu{
        width: 800px;
        height:400px;
        margin-top:10px;
        float: left;
        margin-left: 10px;
    }
    #map{
        width: 800px;
        height:400px;
        margin-top:10px;
        float: left;
    }
    #map2{
        width: 100%;
        height:800px;
        margin-top:10px;
        float: left;
    }
</style>








