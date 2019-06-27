<template>
    <div id="radar-chart" style="height:400px; width:100%; padding: 5px"></div>
</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name: "Radar",
        data: function () {
            return {
                title: ''
            }
        },
        props: {
            radarTitle: {
                required: true
            },
            radar: {
                required: true
            },
            indicator: {
                required: true
            }
        },
        watch: {
            radarTitle: function (newVal, oldVal) {
                this.title = newVal;
                this.plotGraph();
            },
            indicator: function (newVal, oldVal) {
                this.indicator = newVal;
                this.plotGraph();
            }
        },
        methods: {
            plotGraph: function () {
                let radarChart;
                radarChart = echarts.init(document.getElementById('radar-chart'));
                let option = {
                    shape: 'circle',
                    tooltip: {},
                    legend: this.radar.legend,
                    title: {
                        text: this.title
                    },
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: this.indicator
                    },
                    series: this.radar.series
                };
                radarChart.setOption(option, true);
            }
        },
        mounted: function () {
            this.plotGraph();
        }
    }
</script>

<style scoped>

</style>