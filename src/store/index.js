import Vue from 'vue';
import Vuex from 'vuex';
import enums from './modules/enums';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        leftTagsactivity:'works',
        leftTags:[
            {
                name:'作品管理',
                id: 'works',
            },
            {
                name:'数据中心',
                id: 'subscribe',
            },
            {
                name:'书籍明细',
                id: 'books',
            }
        ],
        classifyList:[],
        bookInfo:{},
    },
    mutations: {
        change(state,data){
            Object.assign(state,data)
        },
        SET_LEFT_TAGSACTIVITY(state, id) {
            state.leftTagsactivity = id;
        }
    },
    actions: {
        getLeftTagsactivity(context,route){
            // let {name} = this.$route;
            // name = this.$route.name.indexOf('work') != -1?'works':name;
            // this.activity = name;
            context.commit('change',{
                'leftTagsactivity':route.name.toLowerCase().indexOf('work') != -1?'works':route.name
            });
        }
    },
    getters,
    modules: {
        enums, // 公共枚举
    },
});
