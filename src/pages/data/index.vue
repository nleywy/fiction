<template>
    <div class="data">
        <div class="data__title common-title">
            <div :class="['tag',activity==tag.key?'activity':'']" v-for='tag in dataTitles' :key='tag.key' @click='changeRouter(tag.key)'>
                <span>{{tag.value}}</span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "dataCenter",
    data(){
        return {
            dataTitles:[{
                value:'订阅统计',
                key:'1'
            },{
                value:'投票统计',
                key:'2'
            },{
                value:'更新统计',
                key:'3'
            },],
            activity:'1'
        };
    },
    props: {
        
    },
    components: {
        
    },
    watch: {
        
    },
    methods: {
        changeRouter(){
            
        }
    },
    created(){
        
    }
}
</script>

<style lang="scss" scoped>
.data{
    &__title{
        .tag{
            display: inline-block;
            margin-right: 40px;
            font-size: 22px;
            font-weight: 500;
            color: #7B7B7B;
            line-height: 30px;
            &.activity{
                color: #3399FE;

            }
        }
    }
    
}
</style>