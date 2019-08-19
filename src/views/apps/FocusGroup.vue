<template>
    <vue-scroll class="page-dashboard">
        <resize-observer @notify="__resizeHanlder" />

        <el-row class="mt-0" :gutter="30">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">
                    <div class="widget-header ph-20 pt-20">
                        <div class="flex justify-center align-center">
                            <div class="widget-icon-box mr-20 animated fadeInRight">
                                <i class="widget-icon mdi mdi-account-multiple accent-text fs-20"></i>
                            </div>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-050 widget-title text-truncate pt-5 pb-10">Participants</div>
                            </div>
                        </div>
                    </div>
                    <div class="p-20">
                        <h1 class="mt-0 mb-0">{{participantCount}}</h1>
                        <p>Total participants</p>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

                    <div class="widget-header ph-20 pt-20">
                        <div class="flex justify-center align-center">
                            <div class="widget-icon-box mr-20 animated fadeInRight">
                                <i class="widget-icon mdi mdi-account-multiple accent-text fs-20"></i>
                            </div>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-050 widget-title text-truncate pt-5 pb-10">Age groups</div>
                            </div>
                        </div>
                    </div>
                    <div class="p-10">
                        <table>
                            <tr><td><b>Age group</b></td><td><b>Total</b></td></tr>
                            <tr v-for="key, value in ageGroups">
                                <td>{{value}}</td><td>{{key}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

                    <div class="widget-header ph-20 pt-20">
                        <div class="flex justify-center align-center">
                            <div class="widget-icon-box mr-10 animated fadeInRight">
                                <i class="widget-icon mdi mdi-account-multiple accent-text fs-20"></i>
                            </div>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-050 widget-title text-truncate pt-5 pb-10 gender-age-title">Gender age groups</div>
                                <h2 class="m-0 text-truncate"></h2>
                            </div>
                        </div>
                    </div>
                    <div class="p-5 gender-age">
                        <table>
                            <tr><td><b>Age group</b></td><td><b>Gender</b></td><td><b>Count</b></td></tr>
                            <tr v-for="value in genderAgeGroup">
                                <td>{{value[0][0]}}</td><td>{{value[0][1]}}</td><td>{{value[1]}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

                    <div class="widget-header ph-20 pt-20">
                        <div class="flex justify-center align-center">
                            <div class="widget-icon-box mr-20 animated fadeInRight">
                                <i class="widget-icon mdi mdi-account-multiple accent-text fs-20"></i>
                            </div>
                            <div class="widget-info box grow text-truncate animated fadeInLeft">
                                <div class="o-050 widget-title text-truncate pt-5 pb-10">Tech level</div>
                                <h2 class="m-0 text-truncate"></h2>
                            </div>
                        </div>
                    </div>
                    <div class="p-5 gender-age">
                        <table>
                            <tr><td><b>Age group</b></td><td><b>Level</b></td><td><b>Count</b></td></tr>
                            <tr v-for="value in techAgeGroup">
                                <td>{{value[0][0]}}</td><td>{{value[0][1]}}</td><td>{{value[1]}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row class="mt-0" :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="card-base card-shadow--medium p-20" style="height:420px" v-loading="!asyncChart1">
                    <h1 class="mv-0 animated fadeInDown">Findings</h1>
                    <div class="chart-controls">
<!--                        <button class="btn-sm btn-success" @click="internetUsageAgeGroups()">Internet use</button>-->
                        <button class="btn-sm btn-success" @click="vpnAge()">VPN use</button>
                        <button class="btn-sm btn-success" @click="smartDNSAge()">Smart DNS use</button>
                    </div>
                    <bar-chart :chartTitle="chartTitle" :graph="graph" :yAxisData1="yAxisData1"></bar-chart>
                    <br />
                </div>
            </el-col>
        </el-row>

        <el-row class="mt-0" :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="card-base card-shadow--medium mb-30 mt-30 " v-loading="!asyncComponent">
                    <radar :radar="radar" :indicator="indicator" :radarTitle="radarTitle"></radar>
                </div>
            </el-col>
        </el-row>

    </vue-scroll>
</template>

<script>
    import BarChart from '../pages/BarChart.vue';
    import Radar from '../pages/Radar.vue';
    export default {
        name: "FocusGroup",
        components: {
           BarChart,
            Radar
        },
        data: function () {
            return {
                vpn_age_url: "focus_groups/vpn_age",
                vpnYesAgeUsers: [],
                vpnNoAgeUsers: [],
                vpnNoIdeaAgeUsers: [],
                graphData: [],
                all_participants: "focus_groups/all_participants",
                participantCount: null,
                age_group_url: "focus_groups/group_by_age",
                ageGroups: [],
                gender_age_group_url: "focus_groups/gender_age_group",
                genderAgeGroup: [],
                tech_age_url: "focus_groups/tech_age_group",
                techAgeGroup: [],
                internet_use_age_url: "focus_groups/use_age_group",
                internetUseAgeGroup: [],
                resized: false,
                asyncComponent: 'peity',
                asyncChart1: true,
                chartTitle: 'defaultValue',
                yHolder: [],
                graph: {
                    legend: {
                      data: [],
                        right: 0
                    },
                    xAxis: {
                        name: '',
                    },
                    yAxis: {
                        name: ''
                    },
                    series: []
                },
                dns_age_url: "focus_groups/smart_dns_age",
                dnsYesAgeUsers: [],
                dnsNoAgeUsers: [],
                dnsNoIdeaAgeUsers:[],
                vpn_reason_url: 'focus_groups/vpn_reason',
                dns_reason_url: 'focus_groups/dns_reason',
                dnsReason: [],
                vpnReason: [],
                radar: {
                    series: [{type: 'radar', data: []}],
                    legend: {
                        data: [],
                        right: 0
                    },
                },
                radarTitle: '',
                indicatorHolder: []
            }
        },
        computed: {
            yAxisData1: function() {
                let tempHolder = [];
                for (let i = 0; i < this.yHolder.length; i++) {
                    tempHolder = tempHolder.concat(this.yHolder[i])
                }
                return [...new Set(tempHolder.map(p => p))];
            },
            indicator: function () {
                let tempHolder = [];
                for (let i = 0; i < this.indicatorHolder.length; i++) {
                    tempHolder = tempHolder.concat(this.indicatorHolder[i])
                }
                return [...new Set(tempHolder.map(p => p))];
            }
        },
        methods: {
            getAllParticipants: function () {
                this.$http.get(this.all_participants).then(response => {
                    this.participantCount = response.data.participantCount;
                }).catch(error => {
                    console.log(error);
                })
            },
            getAgeGroups: function () {
                this.$http.get(this.age_group_url).then(response => {
                    this.ageGroups = response.data.ageGroups;
                }).catch(error => {
                    console.log(error);
                });
            },
            genderAgeGroups: function () {
                this.$http.get(this.gender_age_group_url).then(response => {
                    this.genderAgeGroup = response.data.genderAgeGroup;
                }).catch(error => {
                    console.log(error);
                })
            },
            getTechAgeGroups: function () {
                this.$http.get(this.tech_age_url).then(response => {
                    this.techAgeGroup = response.data.techAgeGroups;
                }).catch(error => {
                    console.log(error);
                })
            },
            internetUsageAgeGroups: function () {
                this.chartTitle = "Internet usage vs Age Groups";
                this.graph.xAxis.name = "Usage (out of 10)";
                this.graph.yAxis.name = "Age Groups";
                this.graph.series = [];
                this.graph.legend.data = [];
                this.yHolder = [];
                this.$http.get(this.internet_use_age_url).then(response => {
                    this.internetUseAgeGroup = response.data.data;
                    let shoppingHolder = [];
                    let educationHolder = [];
                    let entertainmentHolder = [];
                    let socialHolder = [];
                    let newsHolder = [];
                    let workingHolder = [];
                    if(Object.keys(this.internetUseAgeGroup).length) {
                        for(let items in this.internetUseAgeGroup) {
                            this.yHolder.push(items);
                            shoppingHolder.push(this.internetUseAgeGroup[items].shopping);
                            educationHolder.push(this.internetUseAgeGroup[items].education);
                            entertainmentHolder.push(this.internetUseAgeGroup[items].entertainment);
                            socialHolder.push(this.internetUseAgeGroup[items].social);
                            newsHolder.push(this.internetUseAgeGroup[items].news);
                            workingHolder.push(this.internetUseAgeGroup[items].working);
                           }
                        this.graph.legend.data.push('shopping', 'education', 'entertainment', 'social', 'news', 'working');
                        this.graph.series.push({name: 'shopping', type: 'bar', barGap: 0, data: shoppingHolder});
                        this.graph.series.push({name: 'education', type: 'bar', barGap: 0, data: educationHolder});
                        this.graph.series.push({name: 'entertainment', type: 'bar', barGap: 0, data: entertainmentHolder});
                        this.graph.series.push({name: 'social', type: 'bar', barGap: 0, data: socialHolder});
                        this.graph.series.push({name: 'news', type: 'bar', barGap: 0, data: newsHolder});
                        this.graph.series.push({name: 'working', type: 'bar', barGap: 0, data: workingHolder});
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            vpnAge: function () {
                this.chartTitle = "VPN usage vs Age Groups";
                this.graph.xAxis.name = "Participants";
                this.graph.yAxis.name = "Age Groups";
                this.graph.series = [];
                this.graph.legend.data = [];
                this.yHolder = [];
                this.$http.get(this.vpn_age_url + '/' + "Yes").then(response => {
                    this.vpnYesAgeUsers = response.data.data;
                    let vpnYesHolder = [];
                    if(Object.keys(this.vpnYesAgeUsers).length) {
                        Object.keys(this.vpnYesAgeUsers).forEach(key => {
                            this.yHolder.push(Object.keys(this.vpnYesAgeUsers[key]));
                        });
                        for (let item in this.yAxisData1) {
                            if(this.vpnYesAgeUsers["Yes"][this.yAxisData1[item]])
                                vpnYesHolder.push(this.vpnYesAgeUsers["Yes"][this.yAxisData1[item]]);
                            else
                                vpnYesHolder.push(0)
                        }
                        this.graph.legend.data.push('Yes');
                        this.graph.series.push({name: 'Yes', type: 'bar', barGap: 0, data: vpnYesHolder});
                    }
                    this.$http.get(this.vpn_age_url + '/' + "I have no idea what this is").then(response => {
                        this.vpnNoIdeaAgeUsers = response.data.data;
                        let vpnNoIdeaHolder = [];
                        if(Object.keys(this.vpnNoIdeaAgeUsers).length) {
                            Object.keys(this.vpnNoIdeaAgeUsers).forEach(key => {
                                this.yHolder.push(Object.keys(this.vpnNoIdeaAgeUsers[key]))
                            });
                            for (let item in this.yAxisData1) {
                                if(this.vpnNoIdeaAgeUsers["I have no idea what this is"][this.yAxisData1[item]])
                                    vpnNoIdeaHolder.push(this.vpnNoIdeaAgeUsers["I have no idea what this is"][this.yAxisData1[item]]);
                                else
                                    vpnNoIdeaHolder.push(0)
                            }
                            this.graph.legend.data.push('No Idea');
                            this.graph.series.push({name: 'No Idea', type: 'bar', barGap: 0, data: vpnNoIdeaHolder });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                    this.$http.get(this.vpn_age_url + '/' + "No").then(response => {
                        this.vpnNoAgeUsers = response.data.data;
                        let vpnNoHolder = [];
                        if(Object.keys(this.vpnNoAgeUsers).length) {
                            Object.keys(this.vpnNoAgeUsers).forEach(key => {
                                this.yHolder.push(Object.keys(this.vpnNoAgeUsers[key]))
                            });
                            for (let item in this.yAxisData1) {
                                if(this.vpnNoAgeUsers["No"][this.yAxisData1[item]])
                                    vpnNoHolder.push(this.vpnNoAgeUsers["No"][this.yAxisData1[item]]);
                                else
                                    vpnNoHolder.push(0)
                            }
                            this.graph.legend.data.push('No');
                            this.graph.series.push({name: 'No', type: 'bar', barGap: 0, data: vpnNoHolder });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }).catch(error => {
                    console.log(error);
                })
            },
            smartDNSAge: function() {
                this.chartTitle = "Smart DNS usage vs Age Groups";
                this.graph.xAxis.name = "Participants";
                this.graph.yAxis.name = "Age Groups";
                this.graph.series = [];
                this.graph.legend.data = [];
                this.yHolder = [];
                this.$http.get(this.dns_age_url + '/' + "Yes").then(response => {
                    this.dnsYesAgeUsers = response.data.data;
                    let dnsYesHolder = [];
                    if(Object.keys(this.dnsYesAgeUsers).length) {
                        Object.keys(this.dnsYesAgeUsers).forEach(key => {
                            this.yHolder.push(Object.keys(this.dnsYesAgeUsers[key]));
                        });
                        for (let item in this.dnsYesAgeUsers["Yes"]) {
                            dnsYesHolder.push(this.dnsYesAgeUsers["Yes"][item])
                        }
                        this.graph.legend.data.push('Yes');
                        this.graph.series.push({name: 'Yes', type: 'bar', barGap: 0, data: dnsYesHolder});
                    }
                    this.$http.get(this.dns_age_url + '/' + "I have no idea what this is").then(response => {
                        this.dnsNoIdeaAgeUsers = response.data.data;
                        let dnsNoIdeaHolder = [];
                        if(Object.keys(this.dnsNoIdeaAgeUsers).length) {
                            Object.keys(this.dnsNoIdeaAgeUsers).forEach(key => {
                                this.yHolder.push(Object.keys(this.dnsNoIdeaAgeUsers[key]))
                            });
                            for (let item in this.dnsNoIdeaAgeUsers["I have no idea what this is"]) {
                                dnsNoIdeaHolder.push(this.dnsNoIdeaAgeUsers["I have no idea what this is"][item]);
                            }
                            this.graph.legend.data.push('No Idea');
                            this.graph.series.push({name: 'No Idea', type: 'bar', barGap: 0, data: dnsNoIdeaHolder });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                    this.$http.get(this.dns_age_url + '/' + "No").then(response => {
                        this.dnsNoAgeUsers = response.data.data;
                        let dnsNoHolder = [];
                        if(Object.keys(this.dnsNoAgeUsers).length) {
                            Object.keys(this.dnsNoAgeUsers).forEach(key => {
                                this.yHolder.push(Object.keys(this.dnsNoAgeUsers[key]))
                            });
                            for (let item in this.dnsNoAgeUsers["No"]) {
                                dnsNoHolder.push(this.dnsNoAgeUsers["No"][item]);
                            }
                            this.graph.legend.data.push('No');
                            this.graph.series.push({name: 'No', type: 'bar', barGap: 0, data: dnsNoHolder });
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }).catch(error => {
                    console.log(error);
                })
            },
            usageReasons: function() {
                this.radarTitle = "VPN usage";
               this.radar.legend.data = [];
                this.$http.get(this.vpn_reason_url).then(response => {
                    this.vpnReason = response.data;
                    let dataHolder = [];
                    for(let item in this.vpnReason){
                        this.indicatorHolder.push({name: item, max: this.vpnReason[item] + 5});
                        dataHolder.push(this.vpnReason[item]);
                    }
                    this.radar.legend.data.push('VPN usage');
                    this.radar.series[0].data.push({value: dataHolder, name: 'VPN usage'});
                        this.$http.get(this.dns_reason_url).then(response => {
                            this.dnsReason = response.data;
                            this.radarTitle += " vs Smart DNS Usage";
                            let dataHolder = [];
                            for(let item in this.dnsReason){
                                dataHolder.push(this.dnsReason[item]);
                            }
                            this.radar.legend.data.push('Smart DNS usage');
                            this.radar.series[0].data.push({value: dataHolder, name: 'Smart DNS usage'});
                        }).catch(error => {
                            console.log(error);
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
            this.genderAgeGroups();
            this.getAgeGroups();
            this.getAllParticipants();
            this.getTechAgeGroups();
            this.vpnAge();
            this.usageReasons();
        }

    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/_variables';
    .widget {
        height: 200px;
        position: relative;
        overflow: auto;
        .widget-header {

            .widget-icon-box {
                background: rgba(0, 0, 0, .02);
                border: 1px solid rgba(0, 0, 0, .02);
                border-radius: 4px;
                text-align: center;
                width: 20px;
                padding: 5px;
            }

            .widget-title {
                font-weight: bold;
            }
        }
        .badge-box {
            .badge {
                display: inline-block;
                border-radius: 4px;
                font-size: 80%;
            }
        }
    }
    .p-20{
        h1{
            text-align: center;
        }
        p{
            text-align: center;
            line-height: 1;
        }
    }
    .p-10{
        text-align: center;
        table{
            width: 100%;
        }
    }
    .gender-age{
        table{
            width: 100%;
            font-size: 13px;
        }
    }
    .gender-age-title{
        font-size: 14px;
    }
</style>