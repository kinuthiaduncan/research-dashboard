<template>
	<vue-scroll class="page-dashboard">
		<resize-observer @notify="__resizeHanlder" />


		<el-row class="mt-0" :gutter="30">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<div class="card-base card-shadow--medium bg-accent p-20" style="height:400px" v-loading="!asyncChart1">
					<h1 class="white-text mv-0 animated fadeInDown">Statistics</h1>
					<h3 class="mt-0 mb-40 white-text o-050 animated slideInUp">revenue</h3>
					<div id="chart1" style="height:300px; width:100%"></div>
				</div>
			</el-col>
		</el-row>

		<el-row class="mt-30" :gutter="30">
			<el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="18">
				<vue-scroll class="card-base card-shadow--medium mb-30" style="height:410px">
					<div class="p-20 flex justify-space-between">
						<div>
							<h2 class="mv-0 animated fadeInDown">Progress</h2>
							<h4 class="mt-5 mb-0 o-050 animated slideInUp">This month</h4>
						</div>
						<div class="radio-switcher">
							<el-radio-group v-model="radio1">
								<el-radio-button label="Day"></el-radio-button>
								<el-radio-button label="Week"></el-radio-button>
								<el-radio-button label="Month"></el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<table class="styled striped">
						<thead>
							<tr>
								<th></th>
								<th style="min-width:85px;">First name</th>
								<th style="min-width:80px;">Last name</th>
								<th style="min-width:130px;">Activity</th>
								<th style="min-width:195px;">Progress</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="item in list" :key="item.id">
								<td class="text-right">
									<status-indicator class="ml-10"
										:active="item.status === 'active'" 
										:positive="item.status === 'positive'" 
										:intermediary="item.status === 'intermediary'" 
										:negative="item.status === 'negative'"
										pulse 
									/>
								</td>
								<td style="min-width:80px;">{{item.first_name}}</td>
								<td style="min-width:80px;">{{item.last_name}}</td>
								<td style="min-width:130px;">
									</td>
								<td style="min-width:195px;">
									<el-progress 
										:percentage="item.progress" 
										:status="item.status === 'positive' ? 'success':''"
										:color="item.status === 'negative' ? '#ff4d4d' : item.status === 'intermediary' ? '#ffaa00' : ''"
									></el-progress>
								</td>
							</tr>
						</tbody>
					</table>
				</vue-scroll>
			</el-col>
			<el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6">
				<div class="card-base card-shadow--medium mb-30 bg-primary p-20" style="height:410px; box-sizing:border-box;" v-loading="!asyncChart2">
					<div id="chart2" style="height:350px; width:80%; margin-left:10%"></div>
				</div>
			</el-col>
		</el-row>
	</vue-scroll>
</template>

<script>
export default {
	name: 'Dashboard',
	data () {
		return {
			asyncComponent: 'peity',
			asyncChart1: true,
			asyncChart2: true,
            useAgeGroupChart: null,
            chart1: null,
			chart2: null,
			resized: false,
			list: [
				{"activity":111, "progress": 70, "status":"active", "id":1,"first_name":"Fidela","last_name":"MacLaverty","email":"fmaclaverty0@scribd.com","gender":"Female","ip_address":"165.9.197.163"},
				{"activity":111, "progress": 55, "status":"intermediary", "id":2,"first_name":"Garrard","last_name":"Inge","email":"ginge1@51.la","gender":"Male","ip_address":"138.87.225.97"},
				{"activity":111, "progress": 100, "status":"positive", "id":3,"first_name":"Clayborn","last_name":"Blencoe","email":"cblencoe2@cbc.ca","gender":"Male","ip_address":"237.146.154.222"},
				{"activity":111, "progress": 12, "status":"negative", "id":6,"first_name":"Elna","last_name":"Deboick","email":"edeboick5@4shared.com","gender":"Female","ip_address":"53.209.210.199"},
				{"activity":111, "progress": 0, "status":"", "id":8,"first_name":"Sheffie","last_name":"Fellgett","email":"sfellgett7@ow.ly","gender":"Male","ip_address":"219.29.191.217"},
            ],
			radio1: 'Month',
			radio2: 'Week',

		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		}
	},
	methods: {

		__resizeHanlder: _.throttle(function (e) {
			if(this.resized) {			

				this.asyncComponent = null
				this.removePeity()
				setTimeout(()=>{this.asyncComponent = 'peity'}, 1000)
		
				this.asyncChart1 = false
				this.asyncChart2 = false
				setTimeout(()=>{this.asyncChart1 = true; this.resizeChart1()}, 1000)
				setTimeout(()=>{this.asyncChart2 = true; this.resizeChart2()}, 2500)
			}
			this.resized = true
		}, 700),
        removePeity: function () {
            const peityEl = document.querySelectorAll('.widget .peity')//.forEach((el)=>{el.remove()})
            //ie fix
            for (let i = 0; i < peityEl.length; i++) {
                peityEl[i].parentNode.removeChild(peityEl[i])
            }
        },
        initChart1: function (data) {
        },
        initChart2: function () {

        },
        destroyChart1: function () {
            if (this.chart1) {
                this.chart1.dispose();
                this.chart1 = null;
            }
        },
		destroyChart2() {
			if(this.chart2) {
				this.chart2.dispose();
				this.chart2 = null;
			}
		},
        resizeChart1: function () {
            if (this.chart1) {
                this.chart1.resize();
            }
        },
        resizeChart2: function () {
            if (this.chart2) {
                this.chart2.resize()
            }
        }
    },
    mounted: function () {
        this.initChart2();
    },
    beforeDestroy: function () {
        this.destroyChart1();
        this.destroyChart2();
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.widget {
	height: 200px;
	position: relative;

	.widget-header {

		.widget-icon-box {
			background: rgba(0, 0, 0, .02);
			border: 1px solid rgba(0, 0, 0, .02);
			border-radius: 4px;
			text-align: center;
			width: 60px;
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
.timeline {
	max-width: 1200px;
	margin: 6px;
}
.timeline, .timeline-title {
	color: $text-color;
	line-height: 1.4;
	cursor: default;
	font-family: inherit;
}


/*@media (min-width: 1200px) and (max-width: 1850px) {
	.widget {
		.widget-header {
			.widget-icon-box {
				display: none;
			}
		}
	}
}*/
@media (min-width: 768px) and (max-width: 1040px) {
	.radio-switcher {
		display: none;
	}

	.widget {
		.widget-header {
			.widget-icon-box {
				display: none;
			}
		}
	}
}
@media (max-width: 420px) {
	.radio-switcher {
		display: none;
	}
}
</style>

<style lang="scss">
.page-dashboard {
	.widget {
		.peity {
			position: absolute;
			bottom: -1px;
			left: 0;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}
	table.styled {
		.peity {
			margin-right: 10px;
		}
	}

	.vb-content {
		padding: 0 20px;
		box-sizing: border-box !important;
		margin-top: -5px;
		margin-left: -20px;
		margin-right: -20px;
		height: calc(100% + 15px) !important;
		width: calc(100% + 40px) !important;
	}
}

@media (max-width: 768px) {
	.page-dashboard {
		.vb-content {
			padding: 0 5px !important;
			margin: -5px;
			width: calc(100% + 10px) !important;
		}
	}
}
	.age-groups{
		text-align: center;
		p{
			line-height: 1;
		}
	}
</style>


