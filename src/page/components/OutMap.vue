<template id="child-Outmap">
    <div id="allmap" :style="style"></div>
</template>

<script>
    import {listData2,listSingleData2} from '../../api/api'
    import {MP} from "../../../src/map";

    export default{
        data(){
            return{
                style:{
                    width:'100%',
                    height:this.om.height+'px'
                },
                data_info:[]
            }
        },
        props:['om'],    //通过props属性，将从父级得到的数据传给子级
        mounted(){ this.$nextTick(function() {
            var _this = this;
            MP(_this.ak).then(BMap => {
                this.feathData();
            })
        })
        },
        methods:{
            feathData(){
                    var _this=this;
                    this.para = {"lb":0}
                    listSingleData2(this.para).then((res) => {
                        _this.data_info=eval(res.data);
                        var map = new BMap.Map("allmap");
                        map.centerAndZoom(new BMap.Point(_this.om.longitude,_this.om.latitude), 15);
                        var opts = {
                            width : 250,     // 信息窗口宽度
                            height: 50,     // 信息窗口高度
                            title : "信息窗口" , // 信息窗口标题
                            enableMessage:true//设置允许信息窗发送短息
                        };
                        for(var i=0;i<_this.data_info.length;i++){
                            var marker = new BMap.Marker(new BMap.Point(_this.data_info[i].point1,_this.data_info[i].point2));  // 创建标注
                            var content = _this.data_info[i].address;
                            map.addOverlay(marker);               // 将标注添加到地图中
                            addClickHandler(content,marker);
                        }
                        function addClickHandler(content,marker){
                            marker.addEventListener("mouseover",function(e){
                                openInfo(content,e)}
                            );
                        };
                        function openInfo(content,e){
                            var p = e.target;
                            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                            var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                            map.openInfoWindow(infoWindow,point); //开启信息窗口
                        };
                    }).catch((err)=>{
                        console.log(err);
                    });
                }
            }
        }
</script>
