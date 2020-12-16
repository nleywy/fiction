<template>
    <div class="chapterDraftList">
        <div class="chapterDraftList__title">
            <span :class="['chapterDraftList__title__text',item.id == activity?'activity':'']" v-for='item in title' @click="changeRouter(item.id)">{{item.name}}</span>
            
            <div class="chapterDraftList__btns">
                <el-button type="primary">新建分卷</el-button>
                <el-button type="primary" @click="addNewChapter">新建章节</el-button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import Bus from '@/tools/bus.js'
import commentsVue from '../../../../pro/headline/news-content-ui/src/pages/videoDetail/components/comments.vue';
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
                id:'volume',
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
        addNewChapter(){
            Bus.$emit('add')
        },
        changeRouter(id){
            this.activity = id;
            this.$router.push({
                name:id,
                params:{
                    bookId:this.bookId
                }
            })
        }
    },
    created(){
        this.bookId = this.$route.params.bookId * 1;
        this.$ajax({
            url: "/author/cms/book/getAppBookDetailById",
            method: 'get',
            data: {
                bookId:this.bookId
            }
        }).then(res => {
            this.$store.commit('change',{
                bookInfo: res.data.data.appBook
            })
        })
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
        cursor: pointer;
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