<template>
    <vue-scroll class="page-dashboard">
        <resize-observer @notify="__resizeHanlder" />
        <el-row class="mt-0" :gutter="30">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="padding-right: 0!important;">
                <div class="card-base card-shadow--medium p-20" style="height:450px" v-loading="!asyncChart1">
                    <div id="geo-map" style="height:450px; width:100%"></div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" style="padding-left: 0!important;">
                <div class="card-base card-shadow--medium p-20" style="height:450px; overflow: auto" v-loading="!asyncChart1">
                    <div v-if="!selectedCountry">Click on a country to view more</div>
                    <div v-else class="country-info">
                        <div v-if="countryShutdowns.length">
                            <table>
                                <thead>
                                    <tr class="main-th">
                                        <th colspan="5">Selected country: {{selectedCountry}}</th>
                                    </tr>
                                    <tr class="sub-th">
                                        <th colspan="5">Total shutdowns reported: {{countryShutdowns.length}}</th>
                                    </tr>
                                    <tr class="table-headers">
                                        <th>Date</th><th>Target</th><th>Type</th><th>Cause</th><th>Source</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="shutdown in countryShutdowns">
                                        <td class="data">{{shutdown.start_date}}</td>
                                        <td class="data">{{shutdown.target}}</td>
                                        <td class="data">{{shutdown.blackout_type}}</td>
                                        <td class="data">{{shutdown.cause}}</td>
                                        <td class="action"><a :href="shutdown.source_url" target="_blank"><i class="mdi mdi-eye"></i></a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="mt-30" :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-row class="censorship">
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                            <el-form-item>
                                <el-input v-model="form.keyword" placeholder="keyword"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" style="text-align: center;">
                            <button type="button" class="el-button animated fadeInRight el-button--primary" @click="interestOverTime">Search</button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="card-base card-shadow--medium p-20" style="height:500px" v-loading="!asyncChart1">
                    <h1 class="white-text mv-0 animated fadeInDown">Findings</h1>
                    <line-chart :chartTitle="chartTitle" :graph="graph"></line-chart>
                </div>
            </el-col>
        </el-row>
    </vue-scroll>
</template>

<script>
    import Moment from 'moment';
    import { extendMoment } from 'moment-range';
    const moment = extendMoment(Moment);
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
                    keyword: 'VPN'
                },
                google_trends_url: "censorship/google_trends",
                google_trends_data: {},
                chartTitle: 'defaultValue',
                all_shutdowns_url: 'censorship/shutdowns/all',
                allShutdowns: [],
                selectedCountry: null,
                country_code_url: 'censorship/country/code',
                countryCode: null,
                country_shutdowns_url: "censorship/shutdown",
                countryShutdowns: []
            }
        },
        computed: {
            graph: function () {
                return {
                    colors: ['#5793f3', '#d14a61', '#675bba'],
                    xAxis: [{
                        type: 'category',
                        data: []
                    }],
                    yAxis: [],
                    series: [
                        {name: 'searches', type: 'line', data: []},
                        {name: 'disruptions', type: 'line', data: []}
                    ],
                }
            }
        },
        methods: {
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
                    $.get('custom.geo.json', easternAfrica => {
                        myChart.hideLoading();
                        echarts.registerMap('EA', easternAfrica);
                        let option = {
                            title: {
                                text: 'Internet shutdowns Eastern Africa',
                                subtext: 'Data from www.accessnow.org/keepiton/',
                                left: 'right'
                            },
                            tooltip: {
                                trigger: 'item',
                                showDelay: 0,
                                transitionDuration: 0.2,
                                formatter: function (params) {
                                    let value = (params.value + '').split('.');
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
                    myChart.on('click', params => {
                        this.selectedCountry = params.name;
                        this.getCountryCode();
                    })
                }).catch(error => {
                    console.log(error);
                });
            },
            getCountryCode: function() {
                this.$http.get(this.country_code_url+ '/' +this.selectedCountry).then(response => {
                    this.countryCode = response.data.data;
                    this.getCountryShutdowns();
                }).catch(error =>{
                    console.log(error);
                })
            },
            getCountryShutdowns: function() {
                this.graph.series[1].data = [];
                this.$http.get(this.country_shutdowns_url+ '/' + this.countryCode).then(response => {
                    this.countryShutdowns = response.data.data;
                    this.graph.yAxis.push({
                        type: 'value',
                        name: 'disruptions',
                        min: 0,
                        max: 100,
                        interval: 5,
                        position: 'right',
                        axisLine: {
                            lineStyle: {
                                color: this.graph.colors[1]
                            }
                        },
                    });

                    this.interestOverTime();
                }).catch(error => {
                    console.log(error);
                })
            },
            interestOverTime: function() {
                this.google_trends_data = {};

                if(this.countryCode && this.form.keyword){
                    let data = {
                        geo: this.countryCode,
                        keyword: this.form.keyword,
                        startTime: moment().subtract(40, 'months').format('YYYY-MM-DD'),
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
                this.graph.series[1].data = [];
                this.graph.xAxis[0].data = [];
                this.chartTitle = this.selectedCountry+" VPN Google Trends vs Internet Disruptions";
                let startTime = moment().subtract(40, 'months').format('YYYY-MM-DD');
                let endTime = moment().format('YYYY-MM-DD');
                const range = moment.range(startTime, endTime);
                for (let day of range.by('day')) {
                    this.graph.xAxis[0].data.push(day.format("'YYYY-MM-DD'"));
                }
                let disruptionDates = [];
                let searchDates = [];
                this.graph.yAxis.push({
                    type: 'value',
                    name: 'searches',
                    min: 0,
                    max: 100,
                    interval: 5,
                    position: 'left',
                    axisLine: {
                        lineStyle: {
                            color: this.graph.colors[0]
                        }
                    }
                });

                for(let i = 0; i < this.google_trends_data.default.timelineData.length; i++) {
                    let date = moment.unix(this.google_trends_data.default.timelineData[i].time).format("'YYYY-MM-DD'");
                    searchDates.push(date);
                }
                for(let a = 0; a < this.countryShutdowns.length; a++)
                {
                    disruptionDates.push(moment(this.countryShutdowns[a].start_date).format("'YYYY-MM-DD'"));
                    if (this.countryShutdowns[a].end_date) {
                        let diff = moment(this.countryShutdowns[a].end_date).diff(moment(this.countryShutdowns[a].start_date), 'days');
                        for(let i = 0; i < diff; i++) {
                            disruptionDates.push(moment(this.countryShutdowns[a].start_date).add(i, 'day').format("'YYYY-MM-DD'"))
                        }
                    }
                }
                for(let k = 0; k < this.graph.xAxis[0].data.length; k++) {
                    if(searchDates.includes(this.graph.xAxis[0].data[k])) {
                        this.google_trends_data.default.timelineData.filter(item => {
                            if (moment.unix(item.time).format("'YYYY-MM-DD'") === this.graph.xAxis[0].data[k]) {
                                if(item.formattedValue[0] === "<1") {
                                    this.graph.series[0].data.push(0);
                                }
                                this.graph.series[0].data.push(Number(item.formattedValue[0]));
                            }
                        })
                    } else {
                        this.graph.series[0].data.push(0);
                    }
                    if(disruptionDates.includes(this.graph.xAxis[0].data[k])) {
                        this.graph.series[1].data.push(100);
                    }
                    else {
                        this.graph.series[1].data.push(0);
                    }
                }
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
