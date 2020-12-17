<template>
    <div class="create">
        <div class="myworks__title common-title">
            <span class="myworks__title__left">我的作品</span>
        </div>

        <div class="create-con common-con">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
                <el-form-item label="作品封面" prop="blurryImgUrl">
                    <el-upload
                        class="avatar-uploader"
                        action="https://www.zybuluo.com/lichen0310/note/1760702/"
                        :http-request="uploadFile"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error="handleUploadError"
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

                <el-form-item label="作品名称" prop="bookName">
                    <el-input v-model="form.bookName" style='width: 470px' @blur='checkBookName' placeholder="请输入作品名称"></el-input>
                    <i class="el-icon-circle-check" v-if='isExist == 1'></i>
                    <div class='nameTips' v-if='isExist == 2'>该书名已被占用，请尝试其他书名</div>
                </el-form-item>

                <el-form-item label="作品分类" prop="firstClassify">
                    <el-select v-model="form.firstClassify" placeholder="请选择作品分类" style='width: 470px'>
                        <template v-for='item in classifyList'>
                            <el-option :label="item.classifyName" :value="item.classifyId" :key="item.classifyId"></el-option>
                        </template>
                    </el-select>
                </el-form-item>

                <el-form-item label="首发站" prop="startStation">
                    <el-radio-group v-model="form.startStation">
                        <el-radio label="1">次元姬</el-radio>
                        <el-radio label="2">外站</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="作品标签" prop="tagList">
                    <el-row>
                        <el-col :span="24">
                            <div style='margin-bottom:20px;width: 470px' v-if='form.tagList&&form.tagList.length'>
                                <el-tag
                                    :key="index"
                                    v-for="(tag,index) in form.tagList"
                                    closable
                                    :disable-transitions="false" 
                                    @close="deleteTag(form.tagList,index)"
                                    style="margin-right: 10px;"
                                >
                                    {{tag.name}}
                                </el-tag>
                            </div>
                        </el-col>

                        <el-col :span="24">
                            <el-input v-model="searchName" style='width: 300px;margin-right:20px;' placeholder="请添加作品标签"></el-input>
                            <el-button type="primary" size='medium' @click='getBookTagListByParams(true)'>搜索</el-button>
                            <i class="el-icon-circle-check" v-if='showSearchOK'></i>
                        </el-col>

                        <el-col :span="24">
                            <div class="tigsTips">
                                <span v-if='(showFiveTips) || (searchName && bookTagList.length == 0)' class='fiveTips'>
                                    {{ showFiveTips ? "最多添加5个标签" : "" }}
                                    <br>
                                    {{ (searchName && bookTagList.length == 0) ? "搜索不到该标签，请联系编辑添加" : "" }}
                                </span>
                                <!-- <span v-if='searchName && bookTagList.length == 0' class='noTags'>搜索不到该标签，请联系编辑添加</span> -->
                            </div>
                        </el-col>

                        <el-col :span="24">
                            <div class="bookTagList">
                                <el-scrollbar style="height: 100%;" class="pageScrollbar">
                                    <el-tag
                                        :key="tag.tagId"
                                        v-for="tag in bookTagList"
                                        :disable-transitions="false"
                                        @click="addTag(tag)"
                                        style="cursor: pointer;margin-right: 10px;"
                                    >
                                        {{tag.name}}
                                    </el-tag>
                                </el-scrollbar>
                            </div>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="作品简介" prop="notes">
                    <el-input type="textarea" :rows="5" resize="none" v-model="form.notes" style='width: 470px' placeholder="请输入作品简介"></el-input>
                </el-form-item>

                <el-form-item>
                    <template v-if='bookState == 1'>
                        <el-button type="primary" @click='reviewTips'>审核中</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="onSubmit(true)" v-if='!bookId'>立即创建</el-button>
                        <el-button type="primary" @click="onSubmit"  v-else>提交</el-button>
                        <el-button>取消</el-button>
                    </template>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getAppBookDetailById, addOrUpdateAuthorBook, existBookName } from "@/api/book";
import { getBookTagListByParams } from "@/api/tag";
import { getBookClassifyListByParams } from "@/api/classify"
import { upload } from "@/api/file"

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
                firstClassify: "",
                delivery: false,
                type: [],
                resource: '',
                notes: ''
            },
            bookTagList:[],
            isExist: 0, //1 不重复 2 重复
            showFiveTips: false,
            pageNo: 1,
            searchName:'',
            showSearchOK: false,
            bookState: 0, //1 待审核 不让编辑
            classifyList: [],
        };
    },
    props: {

    },
    computed:{
        ...mapGetters("enums", [ "enumsGetMap" ]),
        rules() {
            const that = this;

            return {
                blurryImgUrl: [
                    { required: true, message: "请上传作品封面", trigger: 'blur' }
                ],
                bookName: [
                    { required: true, message: "请输入作品名称", trigger: 'blur' },
                    { max: 15, message: "请输入最大长度15字符的作品名称", trigger: 'blur' },
                ],
                firstClassify: [
                    { required: true, message: "请选择作品分类", trigger: 'blur' }
                ],
                startStation: [
                    { required: true, message: "请选择首发站", trigger: 'blur' }
                ],
                tagList: [
                    { required: true, message: "请添加作品标签", trigger: 'blur' }
                ],
                notes: [
                    { required: true, message: "请输入作品简介", trigger: 'blur' },
                    { min: 20, max: 500, message: "请输入20-500长度的作品简介", trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        checkBookName(){
            this.existBookName();
        },

        reviewTips(){
            this.$confirm('提交资料后，会在两个工作日内审核完成，审核过过程中无法修改资料。', '提交资料', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
        },

        /**
         * 
         * 判断书名是否存在
         * @param { string } bookName
         */
        async existBookName() {
            const res = await existBookName({ bookName: this.form.bookName });
            
            if(res.code === "200") {
                const isExist = res.data.isExist;
                this.isExist = isExist ? 2 : 1;
            }
        },

        /**
         * 
         * 新增编辑作品
         * @param { number } bookId 书籍id 无值：新增， 有值：编辑
         * @param { string } imgUrl 书籍封面url
         * @param { string } blurryImgUrl 缩略图
         * @param { number } authorId 作者id
         * @param { string } authorName 作者名称
         * @param { string } bookName 书籍名称
         * @param { number } firstClassify 一级分类id	
         * @param { string } startStation 首发站 1-次元姬，2-外站
         * @param { string } tagId 书签id 英文,拼接
         * @param { string } notes 作品简介
         */
        async addOrUpdateAuthorBook(isCreate ) {
            const res = await addOrUpdateAuthorBook({ ...this.form });

            if(res.code === "200") {
                if(isCreate){
                    this.$store.commit('change', {
                        bookInfo: res.data.appBook
                    });

                    const params = this.bookId ? { id: this.bookId } : {}

                    this.$router.push({
                        path: "/createWork/success",
                        params,
                    });
                }
            }
        },

        /**
         * 
         * 提交
         */
        onSubmit(isCreate){
            this.form.tagId = this.form.tagList.reduce((all, current)=>{
                return all + current.tagId + ',';
            }, "");


            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    if(this.isExist == 2) {
                        return ;
                    }

                    this.addOrUpdateAuthorBook(isCreate);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        /**
         * 
         * 上传文件
         */
        uploadFile({ file }) {
            const formData = new FormData()
            formData.append('file', file);
            return upload(formData);
        },

        /**
         * 
         * 上传头像成功的hook
         */
        handleAvatarSuccess(response, file, fileList) {
            if(response.code == 200) {
                this.form.blurryImgUrl = response.data.url;
                this.form.imgUrl = response.data.url;
            }

            this.uoloadLoading = false;
        },

        /**
         * 
         * 上传头像失败的hook
         */
        handleUploadError(err, file, fileList) {
            // this.uoloadLoading = false
            console.log(err)
        },

        /**
         * 
         * 上传头像之前的hook
         */
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt5M) {
                this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isJPG && isLt5M;
        },

        /**
         * 
         * 删除标签
         */
        deleteTag(tagList,index){
            tagList.splice(index,1)
        },

        /**
         * 
         * 添加标签
         */
        addTag(tag){
            const findIndex = this.form.tagList.findIndex(item => item.tagId === tag.tagId);

            if(findIndex !== -1) {
                this.$message.warning("请勿添加重复标签");
                return ;
            }

            if(this.form.tagList.length >= 5){
                this.showFiveTips = true;
            }else{
                this.showFiveTips = false;
                this.form.tagList.push(tag);
            }
        },

        /**
         * 获取分类列表
         * @param { number } pageNo
         * @param { number } pageSize
         */
        async getBookClassifyListByParams() {
            const res = await getBookClassifyListByParams({ pageNo: 1, pageSize: 10000 })

            if(res.code === "200") {
                this.classifyList = res.data.classifyList
            }
        },

        /**
         * 
         * 获取标签列表
         * @description 获取小说一级分类列表
         * @param { string } name
         * @param { number } pageNo
         * @param { number } pageSize
         */
        async getBookTagListByParams(isSearch){
            this.searchName = this.searchName.trim();
            !this.searchName && (this.pageNo = 1);

            const res = await getBookTagListByParams({
                pageNo: this.pageNo++,
                pageSize: 40,
                name: this.searchName
            });
            
            if(res.code === "200") {
                this.bookTagList = res.data.bookTagList;
                if(this.searchName && this.bookTagList.length>0){
                    this.showSearchOK = true;
                }
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
                this.form = res.data.appBook;
                this.bookState = this.form.bookState;
                this.$store.commit('change', {
                    bookInfo: res.data.data.appBook
                })

                if(this.bookState == 1){
                    this.$message({
                        message: '资料审核中，请在审核完成后修改',
                        type: 'warning'
                    });
                }
            }
        }
    },
    created() {
        this.getBookTagListByParams();
        this.getBookClassifyListByParams();

        const route = this.$route;
        this.bookId = route.params.id;

        if(this.bookId){
            this.getAppBookDetailById();
        }
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
                float: left;
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