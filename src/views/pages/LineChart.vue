<template>
    <div id="trends-chart" style="height:300px; width:100%"></div>
</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name: "LineChart",
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
        },
        watch: {
            chartTitle:function(newVal, oldVal) {
                this.title = newVal;
                this.plot();
            },
            graph: function (newVal, oldVal) {
                this.graph = newVal;
            },
        },
        methods: {
            plot: function () {
                let trendsChart;
                trendsChart = echarts.init(document.getElementById('trends-chart'));
                let option = {
                    title: {
                        text: this.title
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: function (params) {
                            params = params[0];
                            var date = new Date(params.name);
                            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                        },
                    },
                    xAxis: {
                        type: this.graph.xAxis.type,
                        name: this.graph.xAxis.name,
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: this.graph.yAxis.type
                    },
                    series: this.graph.series
                };
                trendsChart.setOption(option, true);
            }
        },
        mounted: function () {
            // this.plot();
        }
    }
</script>

<style scoped>

</style>