<template>
    <div class="personData">
        <page-book-header title="个人资料"></page-book-header>
        
        <section class="form">
            <el-form ref="ruleForm" :model="personData" :rules="rules" label-width="340px" status-icon label-suffix="">
                <el-form-item label="头像" prop="photo">
                    <el-upload
                        v-loading="uploadLoading"
                        class="avatar-uploader"
                        action="/"
                        :http-request="uploadFile"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error="handleUploadError"
                        :before-upload="beforeAvatarUpload">
                        <el-image
                            style="width: 140px;height: 140px;"
                            v-if="personData.photo"
                            class="avatar"
                            :src="personData.photo"
                            :preview-src-list="[ personData.photo ]">
                        </el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                        <span class="tips">
                            <div>1. 文件大小不超过5MB的jpg、png格式图片；</div>
                            <div>2. 头像审核中不得再次上传；</div>
                            <div>3. 头像经审核通过后方可对外展示；</div>
                        </span>
                </el-form-item>

                <el-form-item label="笔名" prop="penName">
                    <el-input type="text" v-model="personData.penName" style='width: 450px' placeholder="请输入笔名，15字内"></el-input>
                </el-form-item>

                <el-form-item label="作家ID" prop="authorId">
                    {{ personData.authorId }}
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="personData.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                        <el-radio label="0">保密</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="作者简介" prop="notes">
                    <el-input type="textarea" :maxlength="100" :rows="5" resize="none" v-model="personData.notes" style='width: 450px' placeholder="请输入作品简介"></el-input>
                </el-form-item>

                <el-form-item label="真实姓名" prop="realName">
                    <el-input type="text" v-model="personData.realName" style='width: 450px' placeholder="请输入真实姓名"></el-input>
                </el-form-item>

                <el-form-item label="证件" prop="certificateNo">
                    <el-select v-model="personData.certificateType" placeholder="请选择" style="width: 200px;">
                        <el-option
                            v-for="item in enumsGetMap('cardTypeEnum')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select>
                    <el-input type="text" v-model="personData.certificateNo" style='width: 230px;margin-left: 20px;' placeholder="请输入证件号码"></el-input>
                </el-form-item>

                <!-- <el-form-item label="常驻地" prop="bookName">
                    <el-select v-model="personData.provinceCode" placeholder="省" style="width: 100px;">
                        <el-option
                            v-for="item in enumsGetMap('cardTypeEnum')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select>

                    <el-select v-model="personData.cityCode" placeholder="市" style="width: 155px;margin-left: 20px;">
                        <el-option
                            v-for="item in enumsGetMap('cardTypeEnum')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select>

                    <el-select v-model="personData.orgCode" placeholder="区" style="width: 155px;margin-left: 20px;">
                        <el-option
                            v-for="item in enumsGetMap('cardTypeEnum')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select>
                </el-form-item> -->

                <el-form-item label="详细地址" prop="address">
                    <el-input type="text" v-model="personData.address" style='width: 450px' placeholder="请输入详细地址"></el-input>
                </el-form-item>

                <el-form-item label="手机号码" prop="phone">
                    <div style='width: 450px'>
                        <span>{{ personData.phone }}</span>
                        <!-- <el-button plain style="width: 102px;float: right;">修改</el-button> -->
                    </div>
                </el-form-item>

                <el-form-item label="电子邮箱" prop="email">
                    <el-input type="text" v-model="personData.email" style='width: 450px' placeholder="请输入电子邮箱"></el-input>
                </el-form-item>

                <el-form-item label="QQ号" prop="qq">
                    <el-input type="text" v-model="personData.qq" style='width: 450px' placeholder="请输入QQ号"></el-input>
                </el-form-item>

                <el-form-item label="微信号" prop="wechat">
                    <el-input type="text" v-model="personData.wechat" style='width: 450px' placeholder="请输入微信号"></el-input>
                </el-form-item>

                <el-form-item>
                    <!-- <template v-if='bookState == 1'>
                        <el-button type="primary" @click='reviewTips'>审核中</el-button>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="onSubmit(true)" v-if='!bookId'>立即创建</el-button>
                        <el-button type="primary" @click="onSubmit"  v-else>提交</el-button>
                        <el-button>取消</el-button>
                    </template> -->
                    <div style="width: 450px;text-align: right;">
                        <el-button type="primary" @click="submitForm" :loading="submitLoading">保存</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBookAuthor, addOrUpdateBookAuthor } from "@/api/authorCms";
import { upload } from "@/api/file";
import {
    emailValidator,
    addressValidator,
    realNameValidator,
    penNameValidator,
    qqValidator,
    wechatValidator,
} from '@/utils/rules';

export default {
    components: {
        "page-book-header": () => import('@/components/pageBookHeader/index.vue'),
    },
    data() {
        return {
            submitLoading: false,
            uploadLoading: false,
            personData: {},
        }
    },
    computed: {
        ...mapGetters("enums", [ "enumsGetMap" ]),
        rules() {
            const certificateNoValidator = (rule, value, callback) => {
                if (!value) {
                    return callback();
                }

                const length = value.length;

                if(value.length && !(this.personData.certificateType > 0)) {
                    callback(new Error('请选择证件类型'));
                }

                if(8 < length && length < 19) {
                    callback();
                }else {
                    callback(new Error('证件号码为8位以上且不能超过18位'));
                }
            };

            return {
                photo: [
                    { required: true, message: "请上传头像", trigger: "blur" },
                ],
                penName: [
                    { required: true, message: "请输入笔名", trigger: "blur" },
                    { validator: penNameValidator, trigger: 'blur' },
                ],
                sex: [
                    { required: true, message: "请选择性别", trigger: "blur" },
                ],
                notes: [
                    { required: false, trigger: "blur" },
                ],
                realName: [
                    { validator: realNameValidator, trigger: 'blur' },
                ],
                certificateNo: [
                    { validator: certificateNoValidator, trigger: 'blur' },
                ],
                address: [
                    { validator: addressValidator, trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: "请填写手机号码", trigger: "blur" },
                ],
                email: [
                    { validator: emailValidator, trigger: 'blur' },
                ],
                qq: [
                    { validator: qqValidator, trigger: 'blur' },
                ],
                wechat: [
                    { validator: wechatValidator, trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
            if (valid) {
                this.addOrUpdateBookAuthor();
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

        /**
         * 
         * 作者更改个人信息
         * @param { string } authorId 作者id
         * @param { string } photo 头像url
         * @param { string } penName 笔名
         * @param { string } sex 性别 0-保密，1-男，2-女
         * @param { string } notes 作者简介
         * @param { string } realName 真实姓名
         * @param { string } certificateType 证件类型	1-身份证，2-护照，3-军官证，4-学生证，5-港澳通行证，6-海外证件
         * @param { string } certificateNo 证件号
         * @param { string } provinceCode 省份编码
         * @param { string } provinceName 省份名称
         * @param { string } cityCode 城市编码
         * @param { string } cityName 城市名称
         * @param { string } orgCode 区域编码
         * @param { string } orgName 区域名称
         * @param { string } email 邮箱
         * @param { string } qq qq号
         * @param { string } wechat 微信号
         * @param { string } phone 手机号
         * @param { string } registerType 1-作者端，2-运营后台
         * @param { string } address 详细地址
         */
        async addOrUpdateBookAuthor() {
            this.submitLoading = true;
            const res = await addOrUpdateBookAuthor({ ...this.personData });

            this.submitLoading = false;
            if(res.code === "200") {
                this.$message.success("保存成功");
                return ;
            }

            this.$message.success(res.msg);

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
            if(response.code === "200") {
                this.personData.photo = response.data.url;
            }

            this.uploadLoading = false;
        },

        /**
         * 
         * 上传头像失败的hook
         */
        handleUploadError(err, file, fileList) {
            this.$message.warning("上传头像失败，请重新上传");
            this.uploadLoading = false
            console.log(err)
        },

        /**
         * 
         * 上传头像之前的hook
         */
        beforeAvatarUpload(file) {
            const fileTypeList = file.name.split(".");
            const fileType = fileTypeList[fileTypeList.length - 1];
            const typeReg = /jpg|png/ig;
            const isFileType = typeReg.test(fileType.toLocaleLowerCase());
            const isLt5M = file.size / 1024 / 1024 < 5;

            if (!isFileType) {
                this.$message.error('上传头像图片只能是 JPG，png 格式');
            }
            if (!isLt5M) {
                this.$message.error('上传头像图片大小不能超过 5MB');
            }

            const bool = isFileType && isLt5M;

            if(bool) {
                this.uploadLoading = true;
            }

            return bool;
        },

        /**
         * 
         * 根据token获取作者个人信息
         */
        async getBookAuthor() {
            const res = await getBookAuthor();

            if(res.code === "200") {
                this.personData = res.data.bookAuthor;
            }
        }
    },
    created() {
        this.getBookAuthor();
    }
}
</script>
<style>

</style>

<style lang="scss" scoped>
    .personData {
        width: 1200px;
        padding-bottom: 30px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 20px;

        .form {
            padding: 30px 0px;

            & /deep/ {
                .avatar-uploader{
                    width: 140px;
                    height: 140px;
                    display: inline-block;
                    vertical-align: middle;
                }
                .avatar-uploader-icon{
                    width: 140px;
                    height: 140px;
                    font-size: 28px;
                    color: #8c939d;
                    line-height: 140px;
                    background: #030303;
                    border-radius: 5px;
                    opacity: 0.6;
                    text-align: center;
                }

                .el-form-item__label {
                    padding-right: 40px;
                }
            }


            .tips{
                display: inline-block;
                margin-left: 20px;
                width: 550px;
                vertical-align: middle;
            }
        }
    }
</style>