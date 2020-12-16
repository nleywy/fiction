import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
var state = {
    bookStateStatus:{
        0:'warning',
        1:'success',
        2:'warning',
        3:'success',
        4:'success',
        5:'success',
        6:'success',
        7:'success',
        8:'success',
        9:'danger',
    },
    endStateStatus:{
        1:'success',
        2:'warning',
    },
    leftTagsactivity:'works',
    leftTags:[{
        name:'作品管理',
        id:'works',
    },{
        name:'数据中心',
        id:'subscribe',
    },{
        name:'书籍明细',
        id:'books',
    }],
    classifyList:[],
    bookInfo:{},

}

export default new Vuex.Store({
    state: state,
    mutations: {
        change(state,data){
            Object.assign(state,data)
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
        },
        getPower(context){
            return new Promise((resolve)=>{
                Vue.prototype.$ajax({
                    url: '/gaokao/getPower',
                    method: 'post',
                    data:{
                        "ruok": context.state.ruok
                    }
                }).then(res => {
                    var {power,lastExtraPower} = res.data.data;
                    resolve(power)
                    context.commit('change',{
                        'powerNum':power,
                        'lastExtraPower':lastExtraPower,
                    });
                });
            })
        }
    }
})
