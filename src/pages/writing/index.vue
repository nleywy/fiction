<template>
    <div class="chapterDraftList">
        <div class="chapterDraftList__title">
            <span :class="['chapterDraftList__title__text',item.id == activity?'activity':'']" v-for='item in title'>{{item.name}}</span>
            
            <div class="chapterDraftList__btns">
                <el-button type="primary">新建分卷</el-button>
                <el-button type="primary">新建章节</el-button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: "chapterDraftList",
    data(){
        return {
            title:[{
                name:'已发章节',
                id:'works',
            },{
                name:'草稿箱',
                id:'draft',
            },{
                name:'分卷管理',
                id:'books',
            }],
            activity: 'draft'
        };
    },
    props: {
        
    },
    components: {
        
    },
    watch: {
        
    },
    methods: {
        
    },
    created(){
        this.activity = this.$route.name;
    }
}
</script>

<style lang="scss" scoped>
.chapterDraftList{
    &__btns{
        display: inline-block;
        float: right;
        margin-top: 29px;
    }
    &__title{
        background: #FFFFFF;
        margin-bottom: 20px;
        &__text{
            padding: 25px 20px;
            display: inline-block;
            font-size: 22px;
            font-weight: 400;
            color: #7B7B7B;
            line-height: 30px;
            &.activity{
                color: #3399FE;
            }
        }
    }
    
}
</style>