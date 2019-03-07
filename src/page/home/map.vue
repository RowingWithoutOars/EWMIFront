<template>
    <div id="helloworld">
        <el-alert>Tips:地图需加载的资源过多，刷新后为您加载</el-alert>
        <div id="map2"></div>
        <OutMap :om="giveOutData"></OutMap>
    </div>


</template>

<script>
    import OutMap from '../components/OutMap.vue'
    export default {
        data () {
            return {

                giveOutData:{
                    height:800,
                    longitude:120.40,
                    latitude:31.06
                },
            }
        },
        components:{
            OutMap
        }
    }
</script>
<style>

</style>







