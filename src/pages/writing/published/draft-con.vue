<template>
    <div>
        <div class="draftCon">
            <el-form ref="ruleForm" :model="chapterDraft" :rules="rules">
                <el-form-item prop="volumeId">
                    <div class="draftCon-title">
                        <el-select v-model="chapterDraft.volumeId" placeholder="请选择分卷" style="width: 215px;" :disabled="true">
                            <template v-for="item in appVolumeList">
                                <el-option :label="item.title" :value="item.volumeId" :key="item.volumeId"></el-option>
                            </template>
                        </el-select>
                        <div class="draftCon-title__btns" v-if="chapterDraft.chapterId">
                            <template v-if="!isUpdate">
                                <el-button type="primary" size="small" class="btn" @click="handleUpdate(true)" >修改</el-button>
                            </template>
                            <template v-else>
                                <el-button plain size="small" class="btn" @click="handleUpdate(false)" v-show="false">取消</el-button>
                                <el-button plain size="small" class="btn" @click="handleUpdate(false)">取消</el-button>
                                <el-button size="small" class="btn" type="primary" @click="handleSubmit" :loading="loading">保存</el-button>
                            </template>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="chapterName">
                    <el-input
                        :disabled="!isUpdate"
                        style="font-size: 20px;"
                        class="draftCon-input"
                        type="text"
                        placeholder="在此输入章节号和章节名。例如：“第十章 我和秋天有个约定”"
                        v-model="chapterDraft.chapterName"
                    ></el-input>
                </el-form-item>

                <el-form-item prop="chapterName" v-if="chapterDraft.reviewState == 2">
                    <div class="tips">{{ chapterDraft.refuseReason }}</div>
                </el-form-item>

                <el-form-item prop="content">
                    <div class="quillCon">
                        <editor :disabled="!isUpdate" ref="editor" />
                    </div>
                </el-form-item>

                <el-form-item prop="remark" style="margin-bottom: 0px;">
                    <div class="remark">
                        <el-input
                            :disabled="!isUpdate"
                            style="font-size: 16px;"
                            class="draftCon-input"
                            type="textarea"
                            :rows="6"
                            resize="none"
                            placeholder="在此输入作者的话"
                            v-model="chapterDraft.remark"
                            :maxlength="500"
                            show-word-limit
                            >
                        </el-input>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <slot>
            <div class="draftCon-footer" v-if="chapterDraft.wordCount || chapterDraft.createTime"><span>本章字数：{{ chapterDraft.wordCount }} </span> <span style="margin-left: 30px;">发布时间：{{ chapterDraft.createTime }}</span></div>
            <div class="draftCon-footer" v-else></div>
        </slot>
    </div>
</template>

<script>
import { updateAuthorChapter, } from "@/api/chapter";
import { getAppVolumeListByBookId } from "@/api/volume";
import editor from "@/components/editor";
import { mapGetters } from "vuex";

export default {
    name: "draftCon",
    components: {
        editor
    },
    props: {
        chapterData: Object,
        bookId: [ String, Number ],
    },
    data() {
        return {
            appVolumeList: [],
            dialogFormVisible: false,
            scheduleTime:'',
            publishType: null, //1-立即，2-定时
            chapterDraft: {},
            loading: false,
            isUpdate: false,
        }
    },
    watch: {
        chapterData: {
            deep: true,
            handler(newVal) {
                this.chapterDraft = JSON.parse(JSON.stringify(newVal));
                this.$refs.editor.setContent(newVal.chapterContentFormat, newVal.wordCount);
                this.isUpdate = false;
            },
        },
    },
    computed: {
        ...mapGetters("enums", [ "enumsGetMap" ]),
        rules() {
            const that = this;
            
            const contentValidator = (rule, value, callback) => {
                const content = that.$refs.editor.getContent();
                const length = typeof content === "string" ? content.trim().replace(/↵/g, "").replace(/\n/g, "").replace(/<([^>]*)>|&nbsp;/g, "").replace(/ /g, "").length : 0;

                if(!length) {
                    callback(Error("请输入正文"));
                }

                if(20 <= length && length <= 20000) {
                    callback();
                }else {
                    callback(Error("正文内容不少于20个汉字，不超过20000个字"));
                }
            }

            return {
                volumeId: [ 
                    { required: true, message: "请选择分卷", trigger: 'blur' },
                ],
                chapterName: [ 
                    { required: true, message: "请输入章节号和章节名", trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if(value.length > 35) {
                                callback(Error("标题不能超过35个字"));
                            }else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                content: [ 
                    // { required: true, message: "请输入正文", trigger: 'blur' },
                    { validator: contentValidator, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        handleSubmit() {
            const content = this.$refs.editor.getContent();

            if(this.chapterDraft.reviewState == 2) {
                if(this.chapterDraft.content === content) {
                    this.$message.warning("请修改后再发布");
                    return ;
                }
            }

            this.updateAuthorChapter({ ...this.chapterDraft, content, chapterContentFormat: this.$refs.editor.getHtmlContent(), });
        },

        async updateAuthorChapter(chapterDraft) {
            this.loading = true;
            const res = await updateAuthorChapter({ ...chapterDraft });

            if(res.code === "200") {
                this.$emit("updateTree", chapterDraft)
                this.$message.success("保存成功");
            }

            this.loading = false;
        },

        /**
         * 
         * @param { boolean } bool
         */
        handleUpdate(bool) {
            this.isUpdate = bool;
        },

        /**
         * 
         * 根据作品id获取卷宗列表
         * @param { number } bookId 书籍id
         */
        async getAppVolumeListByBookId(bookId) {
            const res = await getAppVolumeListByBookId({ bookId });
            
            if(res.code === "200") {
                this.appVolumeList = res.data.appVolumeList;
                if(this.draftId && this.draftId != 100){
                    this.getChapterDraftById(this.draftId)
                }
            }
        },

        handleOpen() {
            this.publishType = "1";
        },

        handleClose() {
            this.publishType = null;
        }
    },
    created() {
        this.getAppVolumeListByBookId(this.bookId);
    },
}
</script>

<style lang="scss" scoped>
.draftCon {
    display: flex;
    height: 100%;
    padding: 30px;
    padding-bottom: 15px;
    flex-direction: column;
    background: #ffffff;

    .tips {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FF2A28;
        line-height: 30px;
    }

    &-input {
        & /deep/ .el-textarea__inner,
        & /deep/ .el-input__inner {
            border: 0px;
            padding: 0px;
        }

        & /deep/ .el-input__inner {
            color: #030303;
        }

        & /deep/ .el-textarea__inner {
            color: #7B7B7B;
        }
    }

    & /deep/ .el-textarea.is-disabled,
    & /deep/ .el-input.is-disabled {
        .el-textarea__inner,
        .el-input__inner {
            background-color: transparent !important;
        }
    }

    &-title {
        display: flex;
        // margin-bottom: 20px;
        justify-content: space-between;

        &__btns {
            display: inline-block;

            .btn {
                width: 88px;
                font-size: 14px;
                margin-left: 20px;
            }
        }
    }
    .remark {
        position: relative;
        // margin-bottom: 20px;

        .textNum {
            position: absolute;
            bottom: 10px;
            right: 40px;
            font-size: 18px;
            font-weight: 400;
            color: #d8d8d0;
            line-height: 25px;
        }
    }

    .dialog-info{
        margin-bottom: 14px;
        .name,.value{
            display: inline-block;
            font-size: 14px;
            font-weight: 400;
            color: #7B7B7B;
            line-height: 20px;
            vertical-align: top;
        }
        .name{
            margin-right: 20px;
        }
    }
}

.draftCon-footer {
    margin: 10px 0px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #7B7B7B;
    line-height: 17px;
}
</style>