import Vue from 'vue'
import Router from 'vue-router'

//apps
import Dashboard from '../views/apps/Dashboard.vue'
import FocusGroup from '../views/apps/FocusGroup.vue';
import Censorship from '../views/apps/Censorship.vue';
import OTT from '../views/apps/OTT.vue';

//pages
import Login from '../views/pages/authentication/Login.vue'
import Register from '../views/pages/authentication/Register.vue'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import Profile from '../views/pages/Profile.vue'
import NotFound from '../views/pages/NotFound.vue'
import Users from '../components/Admin/Users.vue'

//ui
import layouts from '../layout'
import store from '../stores/store';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		// {
		// 	path: '/',
		// 	alias: '/dashboard',
		// 	name: 'dashboard',
		// 	component: Dashboard,
		// 	meta: {
		// 		auth: true,
		// 		layout: layouts.navLeft,
		// 		searchable: true,
		// 		tags: ['app']
		// 	}
		// },
        {
            path: '/',
            alias: '/focus-groups',
            name: 'focus-groups',
            component: FocusGroup,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['app']
            }
        },
        {
            path: '/censorship',
            name: 'censorship',
            component: Censorship,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['app']
            }
        },
        {
            path: '/ott-tax',
            name: 'ott',
            component: OTT,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['app']
            }
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages']
            }
        },
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{ 
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout();
				next({path:'/login'})
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		}
	]
});

const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
};

//insert here login logic
const auth = {
	loggedIn() {
        store.commit('setLogin');
		return store.getters.isLogged
	},
	logout() {
		store.commit('setLogout')
	}
};

router.beforeEach((to, from, next) => {
	let authrequired = false;
	if(to && to.meta && to.meta.auth)
		authrequired = true;
	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'login') {
				window.location.href = '/'
				return false
			} else { 
				next()
			}
		} else {
			if(to.name !== 'login'){
				window.location.href = '/login'
				return false
			}
			next()
		}
	} else {
		if(auth.loggedIn() && to.name === 'login'){
			window.location.href = '/';
			return false
		} else {
			next()
		}
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
});

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
});

export default router