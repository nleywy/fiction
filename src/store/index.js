import Vue from 'vue';
import Vuex from 'vuex';
import enums from './modules/enums';
import writingIndex from './modules/writing';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        classifyList:[],
    },
    mutations: {
    },
    actions: {},
    getters,
    modules: {
        writingIndex, // 作者管理下 已发章节、草稿箱、分卷管理 base页面 store
        enums, // 公共枚举
    },
});
