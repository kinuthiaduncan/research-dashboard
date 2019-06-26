<template>
    <div id="groups-chart" style="height:380px; width:100%"></div>
</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name: "BarChart",
        data: function () {
            return {
                title: '',
                chartData: {
                    xAxis: {
                        name: '',
                    },
                    yAxis: {
                        name: ''
                    },
                    series: []
                },
                yAxisData: []
            }
        },
        props: {
            chartTitle: {
                required: true
            },
            graph: {
                required: true
            },
            yAxisData1: {
                required: true
            }
        },
        watch: {
            chartTitle:function(newVal, oldVal) {
                this.title = newVal;
            },
            graph: function (newVal, oldVal) {
                this.graph = newVal;
            },
            yAxisData1: function (newVal, oldVal) {
                this.yAxisData1 = newVal;
                this.plotGraph();
            }
        },
        methods: {
            plotGraph: function () {
                let focusGroupChart;
                focusGroupChart = echarts.init(document.getElementById('groups-chart'));
                let option = {
                    title: {
                        text: this.title
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: this.graph.legend,
                    yAxis: {
                        type: 'value',
                        name: this.graph.xAxis.name
                    },
                    xAxis: {
                        type: 'category',
                        name: this.chartData.yAxis.name,
                        inverse: true,
                        data: this.yAxisData1,
                        axisLabel: {
                            margin: 20,
                            rich: {
                                value: {
                                    lineHeight: 30,
                                    align: 'center'
                                },
                            }
                        }
                    },
                    series: this.graph.series
                };
                focusGroupChart.setOption(option, true);
            },
        },
        mounted: function () {
          this.plotGraph();
        }
    }
</script>

<style scoped>

</style>