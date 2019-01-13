<template>
    <div id="helloworld">
        <h1>采样点位地图标识</h1>
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







