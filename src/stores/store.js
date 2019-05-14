import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

import * as actions from './actions';
import interfaces from './modules/interfaces';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    modules: {
        interfaces
    },
    plugins: [createPersistedState({paths: ['layout']})],
    strict: debug
})