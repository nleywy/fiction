import Vue from 'vue';
import Vuex from 'vuex';
import enums from './modules/enums';
import writingIndex from './modules/writing';
import writingDraft from './modules/writing/draft';
import writingVolume from './modules/writing/volume';
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
        writingVolume, // 作者管理 分卷管理
        writingDraft, // 作者管理 草稿箱
        writingIndex, // 作者管理下 已发章节、草稿箱、分卷管理 base页面 store
        enums, // 公共枚举
    },
});
