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
                    <!--<component :is="asyncComponent" :type="'line'" :options='{ width: "100%", height: 80 }' :data="[1, 3, 2, 4, 4, 9, 3, 4, 6, 5, 4, 6, 9, 8, 11, 12, 13, 12, 12, 14].toString()"/>-->
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
                    <!--<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#c6d9fd"] }' :data="[1, 3, 2, 4, 4, 9, 3, 4, 6, 5, 4, 6, 9, 8, 7, 6, 5, 12, 10, 9].toString()"/>-->
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
                    <!--<component :is="asyncComponent" :type="'line'" :options='{ width: "100%", height: 80, fill: "#56f19a", stroke: "#67C23A" }' :data="[10, 7, 8, 5, 4, 9, 3, 4, 6, 5, 4, 4, 2, 4, 5, 9, 13, 12, 12, 14].toString()"/>-->
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <div class="card-base card-shadow--medium mb-30 widget small-widget" v-loading="!asyncComponent">

                    <div class="widget-header ph-20 pt-20">
                        <div class="flex justify-center align-center">
                            <div class="widget-icon-box mr-20 animated fadeInRight">
                                <i class="widget-icon mdi mdi-cash-multiple success-text fs-30"></i>
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

                    <!--<component :is="asyncComponent" :type="'bar'" :options='{ width: "100%", height: 80, fill: ["#56f19a"] }' :data="[6, 5, 4, 3, 5, 3, 4, 5, 6, 5, 4, 2, 3, 8, 7, 6, 5, 2, 1, 5].toString()"/>-->
                </div>
            </el-col>
        </el-row>

        <el-row class="mt-0" :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="card-base card-shadow--medium bg-accent p-20" style="height:400px" v-loading="!asyncChart1">
                    <h1 class="white-text mv-0 animated fadeInDown">Findings</h1>
                    <div class="chart-controls">
                        
                    </div>
                    <div id="groups-chart" style="height:300px; width:100%"></div>
                </div>
            </el-col>
        </el-row>

    </vue-scroll>
</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name: "FocusGroup",
        data: function () {
            return {
                test_url: "focus_groups/vpn_age",
                vpnYesAgeUsers: [],
                vpnNoAgeUsers: [],
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
                focusGroupChart: null,
                chartTitle: '',
                yHolder: [],
                graph: {
                    xAxis: {
                        name: '',
                    },
                    yAxis: {
                        name: ''
                    },
                    series: []
                }
            }
        },
        computed: {
            yAxisData1: function() {
                let tempHolder = [];
                if(this.yHolder.length > 1) {
                    for (let i = 0; i < this.yHolder.length; i++) {
                        tempHolder = tempHolder.concat(this.yHolder[i])
                    }
                }
                else {
                    tempHolder = this.yHolder;
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
                this.$http.get(this.internet_use_age_url).then(response => {
                    this.internetUseAgeGroup = response.data.data;
                }).catch(error => {
                    console.log(error);
                })
            },
            vpnAge: function () {
                this.chartTitle = "VPN usage vs Age Groups";
                this.graph.xAxis.name = "Participants";
                this.graph.yAxis.name = "Age Groups";
                this.graph.series = [];
                this.$http.get(this.test_url + '/' + "Yes").then(response => {
                    this.vpnYesAgeUsers = response.data.data;
                    let vpnYesHolder = [];
                    if(Object.keys(this.vpnYesAgeUsers).length) {
                        Object.keys(this.vpnYesAgeUsers).forEach(key => {
                            this.yHolder.push(Object.keys(this.vpnYesAgeUsers[key]));
                        });
                        for (let item in this.vpnYesAgeUsers["Yes"]) {
                            vpnYesHolder.push(this.vpnYesAgeUsers["Yes"][item])
                        }
                        this.graph.series.push({name: 'Yes', type: 'bar', data: vpnYesHolder});
                    }
                    this.$http.get(this.test_url + '/' + "No").then(response => {
                        this.vpnNoAgeUsers = response.data.data;
                        let vpnNoHolder = [];
                        if(Object.keys(this.vpnNoAgeUsers).length) {
                            Object.keys(this.vpnNoAgeUsers).forEach(key => {
                                this.yHolder.push(Object.keys(this.vpnNoAgeUsers[key]))
                            });
                            for (let item in this.vpnNoAgeUsers["No"]) {
                                vpnNoHolder.push(this.vpnNoAgeUsers["No"][item]);
                            }
                            this.graph.series.push({name: 'No', type: 'bar', data: vpnNoHolder });
                        }
                        this.plotGraph();
                    }).catch(error => {
                        console.log(error);
                    });
                }).catch(error => {
                    console.log(error);
                })
            },

            plotGraph: function () {
                this.focusGroupChart = echarts.init(document.getElementById('groups-chart'));
                console.log(this.graph.series);
                this.focusGroupChart.setOption({
                    title: {
                        text: this.chartTitle
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'value',
                        name: this.graph.xAxis.name
                    },
                    yAxis: {
                        type: 'category',
                        name: this.graph.yAxis.name,
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
            this.vpnAge();
            this.genderAgeGroups();
            this.getAgeGroups();
            this.getAllParticipants();
            this.getTechAgeGroups();
            this.internetUsageAgeGroups();
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