<template>
    <div>
        <div id="ott-chart" style="height:400px; width:100%"></div>
        <div v-if="percentageChange" style="text-align: center"><h4>Percentage change</h4><span>{{percentageChange}}%</span></div>
    </div>
</template>
<script>
    import * as echarts from 'echarts';
    export default {
        name: "OttChart",
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
            percentageChange: {
                required: false
            }
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
                let ottChart;
                ottChart = echarts.init(document.getElementById('ott-chart'));
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
                ottChart.setOption(option, true);
            }
        }
    }
</script>

<style scoped>

</style>