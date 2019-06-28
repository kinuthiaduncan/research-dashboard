<template>
    <vue-scroll class="page-dashboard">
        <resize-observer @notify="__resizeHanlder" />
        <el-row class="mt-0" :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-row class="censorship">
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                            <el-form-item>
                                <el-input v-model="form.keyword" placeholder="keyword"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                            <el-form-item>
                                <el-select v-model="form.geo" placeholder="country">
                                    <el-option label="Kenya" value="KE"></el-option>
                                    <el-option label="Uganda" value="UG"></el-option>
                                    <el-option label="Tanzania" value="TZ"></el-option>
                                    <el-option label="Rwanda" value="RW"></el-option>
                                    <el-option label="DR Congo" value="CD"></el-option>
                                    <el-option label="South Sudan" value="SS"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="text-align: center;">
                            <button type="button" class="el-button animated fadeInRight el-button--primary" @click="interestOverTime">Search</button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="card-base card-shadow--medium p-20" style="height:400px" v-loading="!asyncChart1">
                    <h1 class="white-text mv-0 animated fadeInDown">Findings</h1>
                    <line-chart :chartTitle="chartTitle" :graph="graph"></line-chart>
                </div>
            </el-col>
        </el-row>

        <el-row class="mt-30" :gutter="30">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="padding: 0!important;">
                <div class="card-base card-shadow--medium p-20" style="height:450px" v-loading="!asyncChart1">
                    <div id="geo-map" style="height:450px; width:100%"></div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="padding: 0!important;">
                <div class="card-base card-shadow--medium p-20" style="height:450px" v-loading="!asyncChart1">

                </div>
            </el-col>
        </el-row>

    </vue-scroll>
</template>

<script>
    import moment from 'moment';
    import LineChart from '../pages/LineChart.vue';
    import * as echarts from 'echarts';
    import $ from 'jquery';
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
                all_shutdowns_url: 'censorship/shutdowns/all',
                allShutdowns: []
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
                else {
                    this.$message.error('Enter a valid keyword and select a country');
                }

            },
            plotData: function() {
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
            plotMap: function() {
                this.$http.get(this.all_shutdowns_url).then(response => {
                    this.allShutdowns = response.data.data;
                    let dataHolder = [];
                    for(let item in this.allShutdowns){
                        dataHolder.push({name: item, value: this.allShutdowns[item]});
                    }
                    let myChart;
                    myChart = echarts.init(document.getElementById('geo-map'));
                    myChart.showLoading();
                    $.get('custom.geo.json', eastenAfrica => {
                        myChart.hideLoading();
                        echarts.registerMap('EA', eastenAfrica);
                        let option = {
                            title: {
                                text: 'Internet shutdowns Eastern Africa',
                                subtext: 'Data from www.accessnow.org',
                                left: 'right'
                            },
                            tooltip: {
                                trigger: 'item',
                                showDelay: 0,
                                transitionDuration: 0.2,
                                formatter: function (params) {
                                    var value = (params.value + '').split('.');
                                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                                    return params.seriesName + '<br/>' + params.name + ': ' + value;
                                }
                            },
                            visualMap: {
                                left: 'right',
                                min: 0,
                                max: 15,
                                inRange: {
                                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                                },
                                text:['High','Low'],
                                calculable: true
                            },
                            toolbox: {
                                show: true,
                                left: 'left',
                                top: 'top',
                                feature: {
                                    dataView: {readOnly: false},
                                    restore: {}
                                }
                            },
                            series: [
                                {
                                    name: 'Internet shutdowns',
                                    type: 'map',
                                    roam: true,
                                    map: 'EA',
                                    itemStyle:{
                                        emphasis:{label:{show:true}}
                                    },
                                    data: dataHolder
                                }
                            ]
                        };
                        myChart.setOption(option);
                    });
                }).catch(error => {
                    console.log(error);
                });
            },
            __resizeHanlder: _.throttle(function (e) {
                if(this.resized) {
                    this.asyncComponent = null;
                    setTimeout(()=>{this.asyncComponent = 'peity'}, 1000);
                }
                this.resized = true
            }, 700),
        },
        mounted: function () {
            this.plotMap();
        }
    }
</script>

<style lang="scss" scoped>

</style>