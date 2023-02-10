<template>
    <div class="data-view">
        <el-card>
            <div id="main1"></div>
        </el-card>
        <el-card>
            <div id="main2"></div>
        </el-card>
    </div>
</template>

<script>
import { getInfo } from '../../api/api.js'
export default {
    data() {
        return {
            option: {}
        }
    }
    ,
    created() {
        getInfo('dataview').then(res => {
            if (res.status === 200) {
                const { legend, xAxis, series } = res.data.data
                this.draw(legend, xAxis, series)
                console.log(legend);
            }
        })
    },
    mounted() {
        let echarts = this.$echarts.init(document.getElementById('main1'))
        echarts.setOption({
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {},
            series: [
                {
                    type: 'bar',
                    data: [23, 24, 18, 25, 27, 28, 25]
                }
            ]
        })
    },
    methods: {
        draw(legend, xAxis, series) {
            const echarts2 = this.$echarts.init(document.getElementById('main2'))
            const option = {
                title: {
                    text: '会话量'
                },
                toolTip: {
                    triggle: 'Axis'
                },
                legend: {
                    data: legend
                },
                xAxis: {
                    data: xAxis
                },
                yAxis: {},
                series,
            }
            echarts2.setOption(option)
        }
    }

}
</script>

<style lang="scss" scoped>
.data-view {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-card {
        width: 50%;
        margin: 30px 15px;

        #main1,
        #main2 {
            width: 100%;
            height: 500px;
        }
    }
}
</style>