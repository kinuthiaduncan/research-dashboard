const state = {
    login_url: "user/authenticate",
    logged: false,
    token: null
};

const mutations = {
    logInUser (state, payload) {
        localStorage.setItem('user', JSON.stringify(payload.user));
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
        state.logged = false;
    },
};

const getters = {
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