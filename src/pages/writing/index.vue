<template>
    <div class="chapterDraftList">
        <div class="chapterDraftList__title">
            <template v-for='(item, index) in title'>
                <span :key="index" :class="[ 'chapterDraftList__title__text', item.id == activity? 'activity' : '' ]" @click="changeRouter(item.id)">{{item.name}}</span>
            </template>
            <div class="chapterDraftList__btns">
                <el-button type="primary" @click="addNewVolume">新建分卷</el-button>
                <el-button type="primary" @click="addNewChapter">新建章节</el-button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import Bus from '@/tools/bus.js';
import { getAppBookDetailById } from "@/api/book";

export default {
    name: "chapterDraftList",
    data(){
        return {
            title:[
                {
                    name:'已发章节',
                    id: 'published',
                },
                {
                    name:'草稿箱',
                    id:'draft',
                },
                {
                    name:'分卷管理',
                    id:'volume',
                }
            ],
            activity: 'draft',
            bookId: "",
        };
    },
    methods: {
        addNewVolume() {
            Bus.$emit('addVolume');
            
            this.changeRouter("volume");
        },
        addNewChapter(){
            this.changeRouter("draft");
            Bus.$emit('add');
        },

        changeRouter(id){
            this.activity = id;

            if(this.$route.name !== id) {
                this.$router.push({
                    name: id,
                    query: {
                        bookId: this.bookId
                    }
                });
            }
    
        },

        /**
         * 
         * 根据书籍id获取作品信息
         * @param { number } bookId
         */
        async getAppBookDetailById() {
            const res = await getAppBookDetailById({ bookId: this.bookId });

            if(res.code === "200") {
                this.$store.commit('change',{
                    bookInfo: res.data.appBook
                })
            }
        }
    },
    created(){
        this.bookId = this.$route.query.bookId;
        this.activity = this.$route.name;

        this.$nextTick().then(() => {
            this.getAppBookDetailById();
        });
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