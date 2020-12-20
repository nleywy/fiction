<template>
    <div class="chapterDraftList">
        
        <Breadcrumb />

        <div class="chapterDraftList__title">
            <template v-for='(item, index) in title'>
                <span :key="index" :class="[ 'chapterDraftList__title__text', item.id == activity? 'activity' : '' ]" @click="changeRouter(item.id)">{{item.name}}</span>
            </template>
            <div class="chapterDraftList__btns">
                <el-button type="primary" @click="addNewVolume" size="small" class="btn">新建分卷</el-button>
                <el-button type="primary" @click="addNewChapter" size="small" class="btn">新建章节</el-button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import Bus from '@/tools/bus.js';
import { mapMutations } from "vuex";
import { getAppBookDetailById } from "@/api/book";
import Breadcrumb from "@/components/breadcrumb"

export default {
    components: {
        Breadcrumb,
    },
    data(){
        return {
            title:[
                {
                    name:'已发章节',
                    id: 'published',
                },
                {
                    name:'草稿箱',
                    id: 'draft',
                },
                {
                    name:'分卷管理',
                    id: 'volume',
                }
            ],
            activity: 'draft',
            bookId: "",
        };
    },
    methods: {
        ...mapMutations("writingIndex", [ "SET_APP_BOOK" ]),
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
                    },
                    params: {
                        bookId: this.bookId,
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
                this.SET_APP_BOOK(res.data.appBook);
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
        // display: inline-block;
        float: right;
        margin-right: 30px;
        margin-top: 17px;

        .btn {
            width: 88px;
            font-size: 14px;
            margin-left: 20px;
        }
    }
    &__title{
        height: 66px;
        background: #FFFFFF;
        margin-bottom: 20px;
        cursor: pointer;

        &__text{
            padding: 0px 20px;
            display: inline-block;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #7B7B7B;
            line-height: 66px;

            &.activity{
                color: #3399FE;
            }
        }
    }
    
}
</style>