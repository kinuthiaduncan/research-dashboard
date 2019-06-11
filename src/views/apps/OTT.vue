<template>
    <vue-scroll class="page-dashboard">
        <resize-observer @notify="__resizeHanlder" />
        <el-row class="mt-0" :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="card-base card-shadow--medium bg-accent p-20" style="height:400px" v-loading="!asyncChart1">
                    <div class="chart-controls">
                        <button class="btn-sm btn-success" @click="socialMediaUseEffect()">Social media</button>
                        <button class="btn-sm btn-success" @click="ottMitigation()">Mitigation use</button>
                        <button class="btn-sm btn-success" @click="ottInconvenience()">OTT inconvenience</button>
                        <button class="btn-sm btn-success" @click="mobileTaxInconvenience()">Mobile tax inconvenience</button>
                    </div>
                    <ott-chart :graph="graph" :chartTitle="chartTitle" :percentageChange="percentageChange"></ott-chart>
                </div>
            </el-col>
        </el-row>
    </vue-scroll>
</template>

<script>
    import OttChart from '../pages/OttChart.vue'
    export default {
        name: "OTT",
        components: {
            OttChart
        },
        data: function () {
            return {
                asyncChart1: true,
                resized: false,
                asyncComponent: 'peity',
                social_use_effect_url: "ott_tax/social_use_effect",
                socialUsageEffect: {},
                chartTitle: 'defaultValue',
                percentageChange: '',
                mitigation_url: "ott_tax/mitigation",
                mitigationData: {},
                ott_inconvenience_url: "ott_tax/inconvenience",
                ottInconvenienceData: {},
                mobile_inconvenience_url: "mobile_tax/inconvenience",
                mobileInconvenience: {}
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
                    series: [{name: 'usage', type: 'bar', barWidth: '', data: [{name: '', value: []}]}],
                }
            }
        },
        methods: {
            socialMediaUseEffect: function () {
                this.graph.series[0].data = [];
                this.$http.get(this.social_use_effect_url).then(response => {
                    this.socialUsageEffect = response.data;
                    if(Object.keys(this.socialUsageEffect).length) {
                        this.chartTitle = "Effect of OTT tax on Social Media Usage";
                        this.graph.xAxis.name = "Timeline";
                        this.graph.yAxis.name = "Social media use";
                        this.percentageChange = this.socialUsageEffect['percentageChange'];
                        this.graph.series[0].barWidth = '20%';
                        this.graph.series[0].data.push({
                                name: "Before OTT",
                                value: ["Before OTT", this.socialUsageEffect['beforeOtt']]
                            }
                        );
                        this.graph.xAxis.data.push("Before OTT");
                        this.graph.series[0].data.push({
                                name: "After OTT",
                                value: ["After OTT", this.socialUsageEffect['afterOtt']]
                            }
                        );
                        this.graph.xAxis.data.push("After OTT");
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            ottMitigation: function() {
                this.graph.series[0].data = [];
                this.$http.get(this.mitigation_url).then(response => {
                    this.mitigationData = response.data;
                    if(Object.keys(this.mitigationData).length) {
                        this.chartTitle = "OTT Mitigation Techniques";
                        this.graph.xAxis.name = "Tools";
                        this.graph.yAxis.name = "Usage";
                        this.graph.series[0].barWidth = '20%';
                        this.percentageChange = null;
                        this.graph.series[0].data.push({
                                name: "Paid OTT",
                                value: ["Paid OTT", this.mitigationData['paidOtt']]
                            }
                        );
                        this.graph.xAxis.data.push("Paid OTT");
                        this.graph.series[0].data.push({
                                name: "Used VPN",
                                value: ["Used VPN", this.mitigationData['usedVpn']]
                            }
                        );
                        this.graph.xAxis.data.push("Used WiFi Hot spots");
                        this.graph.series[0].data.push({
                                name: "Used WiFi Hot spots",
                                value: ["Used WiFi Hot spots", this.mitigationData['usedHotspots']]
                            }
                        );
                        this.graph.xAxis.data.push("Used WiFi Hot spots");
                    }
                }).then(error => {
                    console.log(error);
                })
            },
            ottInconvenience: function() {
                this.graph.series[0].data = [];
                this.$http.get(this.ott_inconvenience_url).then(response => {
                    this.ottInconvenienceData = response.data.data;
                    if (Object.keys(this.ottInconvenienceData).length) {
                        this.chartTitle = "OTT Inconvenience Views";
                        this.graph.xAxis.name = "Measure";
                        this.graph.yAxis.name = "Respondents";
                        this.graph.series[0].barWidth = '20%';
                        this.percentageChange = null;
                        for (let item in this.ottInconvenienceData) {
                            this.graph.series[0].data.push({
                                    name: item,
                                    value: [item, this.ottInconvenienceData[item]]
                                }
                            );
                            this.graph.xAxis.data.push(item);
                        }
                    }
                }).then(error => {
                    console.log(error);
                })
            },
            mobileTaxInconvenience: function() {
                this.graph.series[0].data = [];
                this.$http.get(this.mobile_inconvenience_url).then(response => {
                    this.mobileInconvenience = response.data.data;
                    if(Object.keys(this.mobileInconvenience).length) {
                        this.chartTitle = "Mobile Tax Inconvenience Views";
                        this.graph.xAxis.name = "Measure";
                        this.graph.yAxis.name = "Respondents";
                        this.graph.series[0].barWidth = '20%';
                        this.percentageChange = null;
                        for (let item in this.mobileInconvenience) {
                            this.graph.series[0].data.push({
                                    name: item,
                                    value: [item, this.mobileInconvenience[item]]
                                }
                            );
                            this.graph.xAxis.data.push(item);
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
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
            this.socialMediaUseEffect();
        }
    }
</script>

<style scoped>

</style>