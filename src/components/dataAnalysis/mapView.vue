<template>
    <div class="box">
        <div id="main"></div>
    </div>
</template>

<script>
import geoJson from '../../assets/data.json'
export default {
    mounted() {
        let echarts = this.$echarts.init(document.getElementById('main'))
        this.$echarts.registerMap('china', geoJson)
        console.log(geoJson);
        const option = {
            backgroundColor: 'rgb(121, 145, 209)',
            geo: {
                map: 'china',
                aspectScale: 0.75,
                zoom: 1.1,
                itemStyle: {
                    color: 'blue',
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        x2: 0.8,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'green' // 100% 处的颜色
                        }],
                        globalCoord: true // 缺省为 false
                    },
                },
                regions: [{
                    name: '南海诸岛'
                }]
            },
            series: [
                {
                    type: 'map',
                    label: {
                        show: true,
                        color: '#1DE9B6'
                    },
                    zoom: 1.1,
                    map: 'china',
                    itemStyle: {
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgb(31, 54, 150)' // 0%处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(89, 128, 142)' // 100%处的颜色
                                }
                            ],
                            globalCoord: true
                        }, shadowColor: 'rgb(58, 115, 192)',
                        shadowOffsetX: 10,
                        shadowOffsetY: 11
                    },

                },
            ]
        }
        echarts.setOption(option)
        echarts.on('click', (e) => {
            console.log(e);
        })
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;

    #main {
        width: 80%;
        height: 90%;
        margin-top: 30px;
    }
}
</style>