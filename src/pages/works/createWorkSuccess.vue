<template>
    <div class="createWorkSuccess">
        <page-book-header title="我的作品"></page-book-header>

        <div class="createWorkSuccess-con">
            <i class="bgc"></i>
            <span class="text1">作品创建成功</span>
            <span class="text2">新建作品后，请尽快新建章节，章节写满1000字后将会进入编辑审核后台，<br/>编辑会尽快进行审核。</span>
            <span class="text3">注意：严禁上传任何情色、低俗、涉政等违法违规内容。一旦查实，视情<br/>节严重程度全书屏蔽整改起步并取消福利，直至报警处理。</span>
            <el-button type="primary" size="small" style="width: 102px;" class="btn" @click='create()'>开始写作</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: "createWorkSuccess",
    components: {
        "page-book-header": () => import('@/components/pageBookHeader/index.vue'),
    },
    data(){
        return {};
    },
    methods: {
        create(){
            this.$router.push({
                name: 'draft',
                query: {
                    bookId: this.$route.query.bookId,
                },
                params: {
                    bookId: this.$route.query.bookId,
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.createWorkSuccess{
    background-color: #ffffff;

    &-con{
        height: 700px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 100px 0px;
        background-color: #ffffff;


        .bgc{
            width: 200px;
            display: inline-block;
            margin-bottom: 20px;
            height: 158px;
            background: #D8D8D8;
        }
        .text1{
            font-size: 18px;
            font-weight: 500;
            color: #030303;
            line-height: 30px;
            margin-bottom: 10px;
        }
        .text2,.text3{
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: #7B7B7B;
            line-height: 25px;
            margin-bottom: 10px;
        }
        .text3{
            color: #FF5656;
            margin-bottom: 60px;
        }
    }
    
}
</style>