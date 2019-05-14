const state = {
    layout: {
        navPos: 'left',
            toolbar: 'top',
            footer: true,
            boxed: false,
            roundedCorners: false,
            viewAnimation: 'fade-top'
    },
    splashScreen: true,
    login_url: "user/authenticate",
    logged: false,
    token: null
};

const mutations = {
    setLayout(state, payload) {
        if(payload && payload.navPos !== undefined)
            state.layout.navPos = payload.navPos

        if(payload && payload.toolbar !== undefined)
            state.layout.toolbar = payload.toolbar

        if(payload && payload.footer !== undefined)
            state.layout.footer = payload.footer

        if(payload && payload.boxed !== undefined)
            state.layout.boxed = payload.boxed

        if(payload && payload.roundedCorners !== undefined)
            state.layout.roundedCorners = payload.roundedCorners

        if(payload && payload.viewAnimation !== undefined)
            state.layout.viewAnimation = payload.viewAnimation
    },
    setSplashScreen(state, payload) {
        state.splashScreen = payload
    },
    logInUser (state, payload) {
        let user = {
            "first_name": payload.user.first_name,
            "last_name": payload.user.last_name
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', payload.token);
    },
    setLogin(state, payload) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        state.logged = !!(user && token);
    },
    setLogout(state, payload) {
        state.layout.navPos = null;
        state.layout.toolbar = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        state.logged = false;
    },
};

const getters = {
    layout(state, getters) {
        return state.layout
    },
    navPos(state, getters) {
        return state.layout.navPos
    },
    toolbar(state, getters) {
        return state.layout.toolbar
    },
    footer(state, getters) {
        return state.layout.footer
    },
    boxed(state, getters) {
        return state.layout.boxed
    },
    roundedCorners(state, getters) {
        return state.layout.roundedCorners
    },
    viewAnimation(state, getters) {
        return state.layout.viewAnimation
    },
    splashScreen(state, getters) {
        return state.splashScreen
    },
    isLogged(state, getters) {
        return state.logged
    },
    loginUrl(state){
        return state.login_url;
    }
};

export default {
    state,
    mutations,
    getters
}