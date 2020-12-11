<template>
    <div class="create">
        <div class="myworks__title common-title">
            <span class="myworks__title__left">我的作品</span>
        </div>

        <div class="create-con common-con">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="作品封面">

                    <el-upload
                        class="avatar-uploader"
                        action="https://static.mcc.miui.com/test/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.blurryImgUrl" :src="form.blurryImgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                        <span class="tips">
                            <div>1. 上传600X800像素、不超过5M的JPG图片；</div>
                            <div>2. 作者封面应显示作者名和笔名；</div>
                            <div>3. 建议使用原创图片、不得使用真人照片及他人有版权的图片；以免引起纠纷；</div>
                            <div>4. 严禁上传色情、暴力、广告宣传或不适合公众观赏的图片，一经发现即作为禁书处理；</div>
                            <div>5. 封面上传后，将在2个工作日内审核完成；</div>
                        </span>
                </el-form-item>
                <el-form-item label="作品名称">
                    <el-input v-model="form.bookName" style='width: 470px' @blur='checkBookName'></el-input>
                    <i class="el-icon-circle-check" v-if='isExist == 1'></i>
                    <div class='nameTips' v-if='isExist == 2'>该书名已被占用，请尝试其他书名</div>
                </el-form-item>
                <el-form-item label="作品分类">
                    <el-select v-model="form.firstClassify" placeholder="请选择作者分类" style='width: 470px'>
                        <el-option :label="item.classifyName" :value="item.classifyId" v-for='item in classifyList'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首发站">
                    <el-radio-group v-model="form.startStation">
                        <el-radio label="1">次元姬</el-radio>
                        <el-radio label="2">外站</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="作品标签">
                    <div style='margin-bottom:20px;width: 470px' v-if='form.tagList&&form.tagList.length'>
                        <el-tag
                            :key="index"
                            v-for="(tag,index) in form.tagList"
                            closable
                            :disable-transitions="false"
                            @close="deleteTag(form.tagList,index)"
                        >
                            {{tag.name}}
                        </el-tag>
                    </div>
                    <el-input v-model="searchName" style='width: 300px;margin-right:20px;'></el-input>
                    <el-button type="primary" size='medium' @click='getBookTagListByParams(true)'>搜索</el-button>
                    <i class="el-icon-circle-check" v-if='showSearchOK'></i>
                    <div class="tigsTips">
                        <span v-if='showFiveTips' class='fiveTips'>最多添加5个标签</span>
                        <span v-if='searchName && bookTagList.length==0' class='noTags'>搜索不到该标签，请联系编辑添加</span>
                    </div>
                    <div class="bookTagList">
                        <el-tag
                            :key="index"
                            v-for="(tag,index) in bookTagList"
                            :disable-transitions="false"
                            @click="addTag(tag)"
                            style="cursor:pointer"
                        >
                            {{tag.name}}
                        </el-tag>
                    </div>

                </el-form-item>
                <el-form-item label="作品简介">
                    <el-input type="textarea" v-model="form.notes" style='width: 470px' :rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                    <template v-if='bookState == 1'>
                        <el-button type="primary" @click='reviewTips'>审核中</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="onSubmit(true)" v-if='bookId == -100'>立即创建</el-button>
                        <el-button type="primary" @click="onSubmit"  v-else>提交</el-button>
                        <el-button>取消</el-button>
                    </template>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "create",
    data() {
        return {
            bookId:'',
            form: {
                bookName: '',
                startStation:'1',
                blurryImgUrl: '',
                tagList: [],
                firstClassify:1,
                delivery: false,
                type: [],
                resource: '',
                notes: ''
            },
            bookTagList:[],
            isExist: 0, //1 不重复 2 重复
            showFiveTips: false,
            pageNo:1,
            searchName:'',
            showSearchOK: false,
            bookState:0 //1 待审核 不让编辑

        };
    },
    props: {

    },
    computed:{
        weskitEnumObj () {
            return this.$store.state.weskitEnumObj
        },
        classifyList () {
            return this.$store.state.classifyList
        },
    },
    components: {

    },
    watch: {

    },
    methods: {
        checkBookName(){
            this.$ajax({
                url: "/author/cms/book/existBookName",
                method: 'get',
                data: {
                   bookName: this.form.bookName
                }
            }).then(res => {
                let {isExist} = res.data.data;
                this.isExist = isExist?2:1;
            })
        },
        reviewTips(){
            this.$confirm('提交资料后，会在两个工作日内审核完成，审核过过程中无法修改资料。', '提交资料', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
        },
        onSubmit(isCreate){
            if(this.bookId == -100){
                delete this.form.tagId
            }
            if(!this.form.startStation){
                this.$alert('请选择首发站', '错误', {
                    confirmButtonText: '确定'
                });
                return;
            }
            this.form.tagId = this.form.tagList.reduce((all,current)=>{
                return all + current.tagId + ','
            },"")
            this.$ajax({
                url: "/author/cms/book/addOrUpdateAuthorBook",
                method: 'post',
                data: {
                    ...this.form
                }
            }).then(res => {
                if(isCreate){
                    this.$router.push({
                        name:'createWorkSuccess',
                        params:{
                            id:bookId
                        }
                    })
                }
            })
        },
        handleAvatarSuccess(res, file) {
            this.form.blurryImgUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt5M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt5M;
        },
        deleteTag(tagList,index){
            tagList.splice(index,1)
        },
        addTag(tag){
            if(this.form.tagList.length >= 5){
                this.showFiveTips = true;
            }else{
                this.showFiveTips = false;
                this.form.tagList.push(tag);
            }
        },
        getBookTagListByParams(isSearch){
            this.searchName = this.searchName.trim();
            !this.searchName && (this.pageNo = 1);
            this.$ajax({
                url: "/author/cms/tag/getBookTagListByParams",
                method: 'get',
                data: {
                    pageNo: this.pageNo++,
                    pageSize: 40,
                    name: this.searchName
                }
            }).then(res => {
                this.bookTagList = res.data.data.bookTagList;
                if(this.searchName && this.bookTagList.length>0){
                    this.showSearchOK = true;
                }
            })
        }


    },
    created() {
        const route = this.$route;
        this.bookId = route.params.id;
        this.$store.dispatch('getLeftTagsactivity',route);
        if(this.bookId != -100){
            this.$ajax({
                url: "/author/cms/book/getAppBookDetailById",
                method: 'get',
                data: {
                    bookId:this.bookId
                }
            }).then(res => {
                this.form = res.data.data.appBook;
                this.bookState = this.form.bookState;
                if(this.bookState == 1){
                    this.$message({
                        message: '资料审核中，请在审核完成后修改',
                        type: 'warning'
                    });
                }
            })
        }
        this.getBookTagListByParams();

    }
}
</script>
<style>
    .avatar-uploader{
        width: 150px;
        height: 200px;
        display: inline-block;
    }
    .avatar-uploader-icon{
        width: 150px;
        height: 200px;
        font-size: 28px;
        color: #8c939d;
        line-height: 178px;
        background: #030303;
        border-radius: 5px;
        opacity: 0.6;
        text-align: center;
    }
</style>
<style lang="scss" scoped>
.create {
    background: #FFF;
    .el-icon-circle-check{
        font-size:28px;
        margin-left: 20px;
        color: #259B25;
        vertical-align: middle;
    }
    .nameTips{
        font-size: 18px;
        color: #FF5656;
        line-height: 25px;
        margin-top:10px;
    }
    .tigsTips{
        font-size: 18px;
        font-weight: 400;
        color: #FF5656;
        line-height: 25px;
        height: 30px;
        width: 590px;
        .fiveTips{
            margin-top: 10px;
            float: left;
        }
        .noTags{
            margin-top: 10px;
            float: right;
        }
    }
    .tips{
        display: inline-block;
        margin-left: 20px;
        width: 550px;
        vertical-align: middle;
    }
    .bookTagList{
        height: 190px;
        width: 470px;
        overflow: hidden;
    }
}
</style>