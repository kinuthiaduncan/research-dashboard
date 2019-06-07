<template>
    <vue-scroll class="page-dashboard">
        <resize-observer @notify="__resizeHanlder" />
        <el-row class="mt-0" :gutter="30">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            </el-col>
        </el-row>
    </vue-scroll>
</template>

<script>
    export default {
        name: "OTT",
        data: function () {
            return {
                asyncChart1: true,
                resized: false,
                asyncComponent: 'peity'
            }
        }
    }
</script>

<style scoped>

</style>