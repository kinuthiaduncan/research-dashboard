<template>
    <vue-scroll class="page-dashboard">
        <resize-observer @notify="__resizeHanlder" />
        <el-row class="mt-0" :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="chart-controls">
                    <form class="el-form demo-form-inline el-form--inline">
                        <input type="text" v-model="form.keyword" placeholder="keyword" class="el-form-item"/>
                        <select v-model="form.geo" placeholder="country" class="el-form-item">
                            <option value="KE">Kenya</option>
                            <option value="UG">Uganda</option>
                            <option value="TZ">Tanzania</option>
                        </select>
                        <button type="button" class="el-button animated fadeInRight el-button--primary" @click="interestOverTime">Search</button>
                    </form>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="card-base card-shadow--medium bg-accent p-20" style="height:400px" v-loading="!asyncChart1">
                    <h1 class="white-text mv-0 animated fadeInDown">Findings</h1>
                    <line-chart :chartTitle="chartTitle" :graph="graph"></line-chart>
                </div>
            </el-col>
        </el-row>
    </vue-scroll>
</template>

<script>
    import moment from 'moment';
    import LineChart from '../pages/LineChart.vue'
    export default {
        name: "censorship",
        components: {
            LineChart
        },
        data: function () {
            return {
                asyncChart1: true,
                resized: false,
                asyncComponent: 'peity',
                form: {
                    geo: '',
                    keyword: ''
                },
                google_trends_url: "censorship/google_trends",
                google_trends_data: {},
                chartTitle: 'defaultValue',
            }
        },
        computed: {
            graph: function () {
                return {
                    xAxis: {
                        type: 'category',
                        data: []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{name: 'users', type: 'line', smooth: true, data: [{name: '', value: []}]}],
                }
            }
        },
        methods: {
            interestOverTime: function() {
                this.google_trends_data = {};
                if(this.form.geo && this.form.keyword){
                    let data = {
                        geo: this.form.geo,
                        keyword: this.form.keyword,
                        startTime: moment().subtract(5, 'years').format('YYYY-MM-DD'),
                        endTime: moment().format('YYYY-MM-DD')
                    };
                    this.$http.post(this.google_trends_url, data).then(response => {
                        this.google_trends_data = JSON.parse(response.data.data.results);
                        if(this.google_trends_data.default)
                            this.plotData();
                    }).catch(error => {
                        console.log(error);
                    })
                }

            },
            plotData: function() {
                let test = [];
                this.graph.series[0].data = [];
                this.chartTitle = this.form.geo+" VPN Google Trends vs Internet Disruptions";
                this.graph.xAxis.name = "Timeline";
                this.graph.yAxis.name = "No. of searches";
                for(let i = 0; i < this.google_trends_data.default.timelineData.length; i++) {
                    let date = moment.unix(this.google_trends_data.default.timelineData[i].time).format("'YYYY-MM-DD'");
                    this.graph.series[0].data.push({
                        name: date,
                        value: [date, this.google_trends_data.default.timelineData[i].formattedValue[0]]
                    }
                    );
                    this.graph.xAxis.data.push(new Date(date).toLocaleDateString());
                }
            },
            __resizeHanlder: _.throttle(function (e) {
                if(this.resized) {
                    this.asyncComponent = null;
                    setTimeout(()=>{this.asyncComponent = 'peity'}, 1000);
                }
                this.resized = true
            }, 700),
        }
    }
</script>

<style scoped>

</style>