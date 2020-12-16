<template>
    <div class="createWorkSuccess">
        <div class="common-title">
            <span class="myworks__title__left">我的作品</span>
        </div>
        <div class="createWorkSuccess-con common-con">
            <i class="bgc"></i>
            <span class="text1">作品创建成功</span>
            <span class="text2">新建作品后，请尽快新建章节，章节写满1000字后将会进入编辑审核后台，<br/>编辑会尽快进行审核。</span>
            <span class="text3">注意：严禁上传任何情色、低俗、涉政等违法违规内容。一旦查实，视情<br/>节严重程度全书屏蔽整改起步并取消福利，直至报警处理。</span>
            <el-button type="primary" class="myworks__title__right" @click='create()'>开始写做</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: "createWorkSuccess",
    data(){
        return {
            
        };
    },
    props: {
        
    },
    components: {
        
    },
    watch: {
        
    },
    methods: {
        create(){
            this.$router.push({
                name:'draft',
                params:{
                    bookId: this.$route.params.id
                }
            })
        }
    },
    created(){
        
    }
}
</script>

<style lang="scss" scoped>
.createWorkSuccess{
    &-con{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 100px 287px;
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
        .text2,.text3{
            text-align: center;
            font-size: 18px;
            font-weight: 400;
            color: #7B7B7B;
            line-height: 25px;
            margin-bottom: 10px;
        }
        .text3{
            color: #FF5656;
            margin-bottom: 100px;
        }
    }
    
}
</style>