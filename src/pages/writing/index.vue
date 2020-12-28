<template>
    <div class="chapterDraftList">
        
        <Breadcrumb />

        <div class="chapterDraftList__title">
            <template v-for='(item, index) in title'>
                <span :key="index" :class="[ 'chapterDraftList__title__text', item.id == activity? 'activity' : '' ]" @click="changeRouter(item)">{{item.name}}</span>
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
import { mapMutations, mapActions, mapState } from "vuex";
import { getAppBookDetailById, } from "@/api/book";
import { getAppVolumeListByBookId, } from "@/api/volume";

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
                    path: '/writing/published',
                    id: "published",
                },
                {
                    name:'草稿箱',
                    path: '/writing/draft',
                    id: "draft",
                },
                {
                    name:'分卷管理',
                    path: '/writing/volume',
                    id: "volume",
                }
            ],
            activity: 'draft',
        };
    },
    watch: {
        $route(newVal) {
            this.activity = newVal.name;
        }
    },
    computed: {
        ...mapState("writingIndex", [ "bookId" ]),
    },
    methods: {
        ...mapMutations("writingIndex", [ "SET_APP_BOOK", "SET_BOOKID" ]),
        ...mapMutations("writingDraft", [ "ADD_DRAFT" ]),
        ...mapMutations("writingVolume", [ "ADD_VOLUME", "SET_APP_VOLUME_LIST" ]),
        ...mapActions("writingVolume", [ "getAppVolumeListByBookId" ]),
        ...mapActions("writingDraft", [ "getChapterDraftListByBookId" ]),
        addNewVolume() {
            this.ADD_VOLUME();
            this.changeRouter(this.title[2]);
        },
        /**
         * 
         * 添加章节
         */
        addNewChapter() {
            this.ADD_DRAFT();
            this.changeRouter(this.title[1]);
        },
        changeRouter(item){
            this.activity = item.id;

            if(this.$route.path !== item.path) {
                this.$router.push({
                    // name: id,
                    path: item.path,
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
        },
    },
    created(){
        this.SET_BOOKID(this.$route.query.bookId);
        this.activity = this.$route.name;

        this.$nextTick().then(() => {
            this.getAppBookDetailById();
            this.getAppVolumeListByBookId();
            this.getChapterDraftListByBookId();
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