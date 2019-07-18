<template>
	<vue-scroll class="login-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				
				<float-label class="styled">
					<input type="email" placeholder="E-mail" v-model="email_address">
				</float-label>
				<float-label class="styled">
					<input type="password" placeholder="Password" v-model="password">
				</float-label>
				
				<div class="flex">
					<div class="box grow"><el-checkbox>Remember Me </el-checkbox></div>
					<div class="box grow text-right"><router-link to="/dashboard">Forgot Password?</router-link></div>
				</div>

				<div class="flex text-center center pt-30 pb-10">			
					<el-button plain size="small" @click="login" class="login-btn tada animated">
						LOGIN
					</el-button>
				</div>

				<div class="text-divider mv-10">or</div>

				<div class="text-center signin-box pt-20">
					Don't have an account? <a>Sign Up</a>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
            email_address: 'kinuthiaduncan@gmail.com',
            password: 'iamnumberfour2',
        }
	},
	methods: {
		login() {
		    let data = {
		      email_address : this.email_address,
				password: this.password
			};
            this.$http.post(this.$store.getters.loginUrl, data).then(response => {
                let payload = {
                    "user": response.data.user,
                    "token": response.data.token
                };
                this.$store.commit('logInUser', payload);
                this.$store.commit('setLogin');
                this.$router.push('dashboard');
            }).catch(error => {
                console.log(error)
            });
		}
	},
	mounted() {
	    this.login();
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.login-page {
	background: $text-color;
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;

		a {
			font-size: 14px;
			color: $text-color-accent;
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 80px;
			margin: 0px auto;
			margin-bottom: 30px;
			display: block;
		}

		.login-btn ,
		.social-btn {
			width: 160px;
		}

		.signin-box {
			font-size: 14px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.login-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
