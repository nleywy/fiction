<template>
    <div class="myworks">
        <div class="myworks__title common-title">
            <span class="myworks__title__left">我的作品</span>
            <el-button type="primary" class="myworks__title__right" v-if='items.length>0' @click='createWorks()'>新建作品</el-button>
        </div>
        <div class="myworks__con common-con">
            <div class="items" v-if='items.length>0'>
                <div class="item" v-for='item in items' :key='item.id'>
                    <img :src="item.blurryImgUrl" alt="">
                    <div class="item__des">
                        <div class="item__des__top">
                            <div class="item__des__name">
                                {{item.bookName}}
                            </div>
                            <div class="item__des__status">
                                <el-button :type="bookStateStatus[item.bookState]" size='small'>{{ item.bookState | filtersBookState(enumsGetMap) }}</el-button>
                                <el-button :type="endStateStatus[item.endState]" size='small' disabled>{{ item.endState | filtersEndState(enumsGetMap) }}</el-button>
                            </div>
                        </div>
                        <div class="item__des__center">
                            <template v-if='!item.chapterId'>
                                无最新章节
                            </template>
                            <template v-else>
                                第{{item.chapterId}}章{{item.chapterName}}
                            </template>
                        </div>
                        <div class="item__des__bottom">
                            <div class="item__des__collect">
                                收藏{{item.collectNum}}
                            </div>
                            <div class="item__des__icons">
                                <el-button style="width:104px;margin-right:20px;" v-if='!item.bookState || item.bookState == 3 || item.bookState == 6' @click='createWorks(item.bookId)'>作品设置</el-button>
                                <el-button style="width:104px;margin-right:20px;" v-if='item.bookState == 6' @click='signUp(item)'>申请上架</el-button>
                                <el-button style="width:104px;margin-right:20px;" v-if='item.bookState == 3' @click='signUp(item)'>申请签约</el-button>
                                <el-button style="width:104px;margin-right:20px;" v-if='!item.bookState || item.bookState == 6'>已发内容</el-button>
                                <el-button type="primary" @click="handleClickWritingBtn(item.bookId)">去写作</el-button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div class="nowork" v-else>
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
            items:[]
        };
    },
    computed: {
        ...mapState("enums", [ "bookStateStatus", "endStateStatus" ]),
        ...mapGetters("enums", [ "enumsGetMap", ]),
    },
    props: {
        
    },
    components: {
        
    },
    watch: {
        
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
                this.$message.success("申请成功")
                return ;
            }

            this.$message.warning("申请失败")
        },

        signUp(item){
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
                this.applyShelfOrSign({ ...item });
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
                let bookList = res.data.bookList;
                this.items = bookList;

                if(this.items === 0){
                    this.recommentShow = false;
                }else{
                    this.recommentList = res.data.data;
                }
            }
        },

        /**
         * 
         * 点击写作按钮
         * @param {number} bookId
         */
        handleClickWritingBtn(bookId) {
            this.$router.push({
                path: "/writing/draft",
                query: {
                    bookId,
                },
            })
        },

        /**
         * 
         * 跳转新建/编辑作品页面
         * @param {number} bookId
         */
        createWorks(id){
            this.$router.push({
                path: "/createWork/start",
                params:{
                    id: id || -100
                },
            });
        },
        
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
            const bookStateEnum = enumsGetMap("endStateEnum");
            const find = bookStateEnum.find(item => item.value == cellValue);

            if(find) {
                return find.text;
            }

            return "- -";
        },
    },
    created(){
        this.getAuthorBookList()
    }
}
</script>
<style lang="scss">
.myworks__title{
    &__left{
        font-weight: 600;
        font-size: 22px;
        color: #030303;
        line-height: 30px;
        float: left;
    }
}
</style>
<style lang="scss" scoped>
.myworks{
    &__title{
        &__right{
            float: right;
        }
    }
    &__con{
        min-height: 866px;
        .item{
            display: flex;
            width: 100%;
            margin-bottom: 50px;
            img{
                width: 140px;
                height: 190px;
                background: #D8D8D8;
                border-radius: 10px;
                margin-right: 20px;
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
                    font-size: 20px;
                    font-weight: 400;
                    color: #7B7B7B;
                    line-height: 28px;
                }
                .item__des__bottom{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }
                &__name{
                    font-size: 24px;
                    font-weight: 400;
                    color: #030303;
                    line-height: 33px;
                }
                &__collect{
                    font-size: 20px;
                    font-weight: 400;
                    color: #7B7B7B;
                    line-height: 28px;
                    vertical-align: bottom;
                }

            }

        }
        .nowork{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 100px auto auto;
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