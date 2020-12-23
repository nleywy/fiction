<template>
    <div class="myworks">
        <div class="myworks__title common-title">
            <span class="myworks__title__left">我的作品</span>
            <el-button type="primary" class="myworks__title__right" v-if='Array.isArray(bookList) && bookList.length > 0' @click='createWorks()' size="small">新建作品</el-button>
        </div>
        <div class="myworks__con">
            <div class="items" v-if='Array.isArray(bookList) && bookList.length > 0'>
                <el-scrollbar style="width: 100%;height: 100%;" class="pageScrollbar">
                    <div class="item" v-for='item in bookList' :key='item.id'>
                        <el-image :src="item.blurryImgUrl || require('@/assets/cover.png')" class="blurryImg" @error="handleImageError"></el-image>
                        <div class="item__des">
                            <div class="item__des__top">
                                <div class="item__des__name">
                                    {{item.bookName}}
                                </div>
                                <div class="item__des__status">
                                    <el-tag class="tag" :class="[ `tag-${bookStateStatus[item.bookState]}` ]" size='small'>{{ item.bookState | filtersBookState(enumsGetMap) }}</el-tag>
                                    <el-tag class="tag" :class="[ `tag-${endStateStatus[item.endState]}` ]" size='small' disabled>{{ item.endState | filtersEndState(enumsGetMap) }}</el-tag>
                                </div>
                            </div>
                            <div class="item__des__center">
                                <template v-if='!item.chapterId'>
                                    无最新章节
                                </template>
                                <template v-else>
                                    <!-- 第{{item.chapterId}}章 {{item.chapterName}} -->
                                    {{item.chapterName}}
                                </template>
                            </div>
                            <div class="item__des__bottom">
                                <div class="item__des__collect">
                                    <span>收藏：{{item.collectNum}}</span>
                                    <span style="margin-left: 10px;">字数：{{item.wordCount}}字</span>
                                    
                                </div>
                                
                                <div class="item__des__icons">
                                    <el-button class="btn" size="small" @click='createWorks(item.bookId)'>作品设置</el-button>
                                    <el-button class="btn" size="small" v-if='item.bookState == 6' @click='signUp(item, 7)'>申请上架</el-button>
                                    <el-button class="btn" size="small" v-if='item.bookState == 3' @click='signUp(item, 4)'>申请签约</el-button>
                                    <el-button class="btn" size="small" @click="handleClickPublishedBtn(item.bookId)">已发章节</el-button>
                                    <el-button class="btn" type="primary" size="small" @click="handleClickWritingBtn(item.bookId)">新建章节</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>

            <div class="nowork" v-if="Array.isArray(bookList) && !bookList.length">
                <i class="bgc"></i>
                <span class="text1">您目前还没有作品</span>
                <span class="text2">快去创作您的第一部作品吧</span>
                <el-button type="primary" class="myworks__title__right" @click='createWorks()'>新建作品</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { applyShelfOrSign, getAuthorBookList } from "@/api/book";

export default {
    name: "myworks",
    data(){
        return {
            bookList: null,
        };
    },
    computed: {
        ...mapState("enums", [ "bookStateStatus", "endStateStatus" ]),
        ...mapGetters("enums", [ "enumsGetMap", ]),
    },
    methods: {
        /**
         * 
         * 申请上架或申请签约
         * @param { number } bookId
         * @param { number } bookState
         */
        async applyShelfOrSign(params) {
            const res = await applyShelfOrSign({
                bookId: params.bookId,
                bookState: params.bookState
            });

            if(res.code === "200") {
                this.$message.success("申请成功");
                return ;
            }
        },

        signUp(item, bookState){
            let title = '签约申请';
            let con = '是否确认申请签约本书？';

            if(item.bookState == 6){
                title = '上架申请';
                con = '是否确认申请上架本书？';
            }

            this.$confirm(con, title, {
                confimButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.applyShelfOrSign({ ...item, bookState });
            }).catch(() => {
                // catch
                this.$message.info("已取消申请")
            })
        },

        /**
         * 
         * 作品列表接口
         * @param { number } pageNo
         * @param { number } pageSize
         */
        async getAuthorBookList() {
            const res = await getAuthorBookList({
                pageNo: 1,
                pageSize: 100,
            });

            if(res.code === "200") {
                this.bookList = res.data.bookList;
            }
        },

        /**
         * 
         * 点击写作按钮
         * @param {number} bookId
         */
        handleClickWritingBtn(bookId) {
            this.$router.push({
                name: "draft",
                query: {
                    bookId,
                },
                params: {
                    bookId,
                }
            });
        },
        
        /**
         * 
         * 点击写作按钮
         * @param {number} bookId
         */
        handleClickPublishedBtn(bookId) {
            this.$router.push({
                name: "published",
                query: {
                    bookId,
                },
                params: {
                    bookId,
                }
            });
        },

        /**
         * 
         * 跳转新建/编辑作品页面
         * @param {number} bookId
         */
        createWorks(bookId){
            this.$router.push({
                name: "createWorkStart",
                query: {
                    bookId,
                },
                params:{
                    bookId,
                },
            });
        },
        
        handleImageError(e) {
            console.log(e)
        }
    },
    filters: {
        /**
         * 
         * 格式化发布状态
         */
        filtersBookState(cellValue, enumsGetMap) {
            const bookStateEnum = enumsGetMap("bookStateEnum");
            const find = bookStateEnum.find(item => item.value == cellValue);

            if(find) {
                return find.text;
            }

            return "- -";
        },

        filtersEndState(cellValue, enumsGetMap) {
            const endStateEnum = enumsGetMap("endStateEnum");
            const find = endStateEnum.find(item => item.value == cellValue);

            if(find) {
                return find.text;
            }

            return "- -";
        },
    },
    created(){
        this.getAuthorBookList();
    }
}
</script>

<style lang="scss">
.myworks__title{
    &__left {
        font-weight: 600;
        font-size: 18px;
        color: #030303;
        line-height: 70px;
        float: left;
    }
}
</style>

<style lang="scss" scoped>
.myworks{

    &__title{
        height: 70px !important;
        padding: 0px 30px;

        &__right{
            width: 102px;
            margin-top: 18px;
            font-size: 14px;
            float: right;
        }
    }

    &__con{
        height: 740px;
        // padding: 0px !important;
        background-color: #ffffff;

        .items {
            height: 740px;
            // padding: 0px 30px !important;
            // padding: 30px 0px;

            .item:first-of-type {
                padding-top: 30px;
            }

            .item:last-of-type {
                padding-bottom: 30px;
            }
        }

        .item {
            display: flex;
            width: 100%;
            padding: 15px 30px;
            background-color: #ffffff;
            // margin-bottom: 50px;
            
            .blurryImg {
                width: 108px;
                height: 144px;
                margin-right: 20px;
                border-radius: 5px;
            }

            .item__des{
                flex:1;
                display: flex;
                flex-direction: column;
                .item__des__top{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }
                .item__des__center{
                    flex:1;
                    padding-top:10px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #7B7B7B;
                    line-height: 20px;
                }
                .item__des__bottom{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                &__status {
                    .tag {
                        width: 72px;
                        height: 30px;
                        margin-left: 20px;
                        line-height: 30px;
                        font-size: 14px;
                        border-radius: 4px;
                        text-align: center;
                    }
                }

                &__name{
                    height: 28px;
                    font-size: 20px;
                    font-weight: 400;
                    color: #030303;
                    line-height: 28px;
                }
                &__collect{
                    height: 20px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #7B7B7B;
                    line-height: 20px;
                }

                &__icons {
                    .btn {
                        width:102px;
                        margin-left:20px;
                        font-size: 14px;
                    }
                }

            }

        }
        .nowork{
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            // margin: 100px auto auto;

            .bgc{
                width: 200px;
                display: inline-block;
                margin-bottom: 20px;
                height: 158px;
                background: #D8D8D8;
            }
            .text1{
                font-size: 22px;
                font-weight: 500;
                color: #030303;
                line-height: 30px;
                margin-bottom: 10px;
            }
            .text2{
                font-size: 18px;
                font-weight: 400;
                color: #7B7B7B;
                line-height: 25px;
                margin-bottom: 40px;
            }
        }
    }
}
</style>