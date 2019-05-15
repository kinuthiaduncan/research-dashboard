<template>
    
</template>

<script>
    export default {
        name: "FocusGroup",
        data: function () {
            return {
                test_url: "focus_groups/vpn_age",
                vpnYesAgeUsers: [],
                vpnNoAgeUsers: [],
                graphData: []
            }
        },
        methods: {
            vpnYesAge: function (condition) {
                this.$http.get(this.test_url+'/'+condition).then(response => {
                    this.vpnYesAgeUsers = response.data.data;
                    console.log(this.vpnYesAgeUsers);
                    if(this.vpnYesAgeUsers.length) {
                        for (let i = 0; i < this.vpnYesAgeUsers.length; i++) {
                            this.vpnYesAgeUsers[i].unshift("VPN", "Yes")
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            vpnNoAge: function (condition) {
                this.$http.get(this.test_url+'/'+condition).then(response => {
                    this.vpnNoAgeUsers = response.data.data;
                    console.log(this.vpnNoAgeUsers);
                    if(this.vpnNoAgeUsers.length) {
                        for (let i = 0; i < this.vpnNoAgeUsers.length; i++) {
                            this.vpnNoAgeUsers[i].unshift("VPN", "No")
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            plotGraph: function () {

            },
            mainYesApi: function (condition) {
                this.$http.get(this.test_url+'/'+condition).then(response => {
                    console.log(response.data)
                }).catch(error => {
                    console.log(error);
                })
            },
        },
        mounted: function () {
           //  this.vpnYesAge("Yes");
           //  this.vpnNoAge("No");
           // this.plotGraph();
            this.mainYesApi("Yes");
        }
    }
</script>

<style scoped>

</style>