import Vue from 'vue';
import Vuex from 'vuex';
import enums from './modules/enums';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        classifyList:[],
        bookInfo:{},
    },
    mutations: {
        change(state,data){
            Object.assign(state,data)
        },
    },
    actions: {},
    getters,
    modules: {
        enums, // 公共枚举
    },
});
