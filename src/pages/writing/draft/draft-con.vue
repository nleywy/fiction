<template>
    <div>
        <div class="draftCon">
            <el-form ref="ruleForm" :model="chapterDraft" :rules="rules">
                <el-form-item prop="volumeId">
                    <div class="draftCon-title">
                        <el-select v-model="chapterDraft.volumeId" placeholder="请选择分卷" style="width: 215px;">
                            <template v-for="item in appVolumeList">
                                <el-option :label="item.title" :value="item.volumeId" :key="item.volumeId"></el-option>
                            </template>
                        </el-select>
                        <div class="draftCon-title__btns">
                            <el-button @click="deleteChapterDraft" plain size="small" class="btn" :disabled="loading" v-if="!(draftListaft.length === 1 && !draftListaft[0].draftId)">删除</el-button>
                            <el-button @click="saveOrPublishChapters(false, true)" plain size="small" class="btn" :loading="loading">保存</el-button>
                            <el-button type="primary" @click="showDialog" size="small" class="btn" :disabled="loading">发布</el-button>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="chapterName">
                    <el-input
                        style="font-size: 20px;"
                        class="draftCon-input"
                        type="text"
                        placeholder="在此输入章节号和章节名。例如：“第十章 我和秋天有个约定”"
                        v-model="chapterDraft.chapterName"
                    ></el-input>
                </el-form-item>

                <el-form-item prop="content">
                    <div class="quillCon">
                        <editor ref="editor" @editorBlur="handleEditorBlur" @updateContent="updateContent"/>
                    </div>
                </el-form-item>

                <el-form-item prop="remark">
                    <div class="remark">
                        <el-input
                            style="font-size: 16px;"
                            class="draftCon-input"
                            type="textarea"
                            :rows="6"
                            resize="none"
                            placeholder="在此输入作者的话"
                            :maxlength="500"
                            show-word-limit
                            v-model="chapterDraft.remark"
                            >
                        </el-input>
                        <!-- <span class="textNum">{{ chapterDraft.remark ? chapterDraft.remark.length : 0 }}/500</span> -->
                    </div>
                </el-form-item>
            </el-form>

            <el-dialog title="确认章节信息" :visible.sync="dialogFormVisible" @open="handleOpen" @close="handleClose">
                <el-form>
                    <div class="dialog-info">
                        <div class="name">书籍名称</div>
                        <div class="value">{{appBook.bookName}}</div>
                    </div>
                    <div class="dialog-info">
                        <div class="name">最新章节</div>
                        <div class="value">{{appBook.latestChapterName || "无"}}</div>
                    </div>
                    <div class="dialog-info">
                        <div class="name">发布章节</div>
                        <div class="value">{{chapterDraft.chapterName || "无"}}</div>
                    </div>
                    <div class="dialog-info">
                        <div class="name">章节字数</div>
                        <div class="value">{{ chapterDraft.content ? chapterDraft.content.length : 0}}字</div>
                    </div>
                    <div class="dialog-info">
                        <div class="name">分卷信息</div>
                        <div class="value">{{findTitle(chapterDraft.volumeId)}}</div>
                    </div>
                    <div class="dialog-info">
                        <div class="name">发布时间</div>
                        <div class="value">
                            <el-radio v-model="publishType" label="1">立即</el-radio>
                            <el-radio v-model="publishType" label="2">定时</el-radio>
                            <el-date-picker
                                style='display:block;margin-top: 12px'
                                v-model="scheduleTime"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                v-show='publishType === "2"'
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveOrPublishChapters(true, true)" :loading="loading">发 布</el-button>
                </div>
            </el-dialog>
        </div>
        <slot>
            <div class="draftCon-footer"><span>本章字数：{{ chapterDraft.wordCount }} </span> <span style="margin-left: 30px;">创建时间：{{ chapterDraft.createTime }}</span></div>
            <!-- <div v-else class="draftCon-footer"></div> -->
        </slot>
    </div>
</template>

<script>
import {
    deleteChapterDraft,
    saveOrPublishChapter,
    getChapterDraftById,
} from "@/api/chapter";
import { getAppVolumeListByBookId } from "@/api/volume";
import editor from "@/components/editor";
import { mapState, mapMutations, mapActions } from "vuex";
import { findUnidimensionalListName } from "@/utils/findList";
import { dateFormat } from "@/utils/formatDate"

export default {
    name: "draftCon",
    components: {
        editor
    },
    data() {
        return {
            appVolumeList: [],
            dialogFormVisible: false,
            scheduleTime:'',
            publishType: null, //1-立即，2-定时
            chapterDraft: {},
            loading: false,
        }
    },
    computed: {
        ...mapState("writingIndex", [ "appBook" ]),
        ...mapState("writingDraft", [ "draftListaft", "draftId", "bookId", "active" ]),
        rules() {
            const that = this;
            
            const contentValidator = (rule, value, callback) => {
                const content = that.$refs.editor.getContent();
                const length = typeof content === "string" ? content.trim().length : 0;

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
                    { required: true, message: "请选择分卷", trigger: 'blur' }
                ],
                chapterName: [ 
                    { required: true, message: "请输入章节号和章节名", trigger: 'blur' }
                ],
                content: [ 
                    // { required: true, message: "请输入正文", trigger: 'blur' },
                    { validator: contentValidator, trigger: 'blur' }
                ],
            }
        },
    },
    watch: {
        draftId(value) {
            if(value){
                this.getChapterDraftById(value)
            }else{
                this.chapterDraft = {
                    volumeId: this.appVolumeList.length ? this.appVolumeList[0].volumeId : "",
                    createTime: dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss"),
                    publishType: null,
                    scheduleTime: null,
                    remark: "",
                    wordCount: 0,
                    content: "",
                    bookName: '',
                    latestChapterId: '',
                    latestChapterName: ''
                }

                this.$nextTick().then(() => {
                    this.$refs.editor.setContent("", 0);
                });
            }
        },
    },
    methods: {
        ...mapMutations("writingDraft", [ "SET_DRAFT_LISTAFT" ]),
        ...mapActions("writingVolume", [ "getAppVolumeListByBookId" ]),
        updateContent(parmas) {
            // const list = [ ...this.draftListaft ];
            // list[this.active].content = parmas.text;
            // list[this.active].chapterContentFormat = parmas.html;
            // this.SET_DRAFT_LISTAFT(list);
            this.chapterDraft.content = parmas.text;
            this.chapterDraft.chapterContentFormat = parmas.html;
        },
        /**
         * 
         * 编辑器失去焦点
         */
        handleEditorBlur() {
            this.saveOrPublishChapters(false, false);
        },
        /**
         * 
         * 是否显示弹框
         */
        showDialog() {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible = true;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        findTitle(volumeId){
            return findUnidimensionalListName(this.appVolumeList, "title", "volumeId", volumeId);
        },

        /**
         * 
         * 删除草稿
         * @param { number } draftId 草稿id
         */
        async apiDeleteChapterDraft() {
            const res = await deleteChapterDraft({ draftId: this.draftId });

            if(res.code === "200") {
                this.$emit("changeDraftList");
                this.$message.success("删除成功");
                return ;
            }

            this.$message.warning("删除失败");
        },

        /**
         * 
         * 删除草稿
         */
        deleteChapterDraft() {
            this.$confirm('章节删除后无法恢复，是否确认删除？', '删除章节', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.draftId) {
                    this.apiDeleteChapterDraft();
                }else {
                    this.$emit("delDraft");
                }
            }).catch(() => {
                this.$message.info("已取消删除");
            });
        },

        /**
         * 
         * 保存编辑发布草稿章节
         * @description 作者保存编辑草稿，或直接发布草稿章节
         * @param { number } draftId 草稿id 有值：编辑草稿， 无值：新增草稿
         * @param { number } volumeId 分卷id
         * @param { string } chapterName 章节名
         * @param { string } content 章节内容
         * @param { string } publishType 1-立即，2-定时 （保存不发布时，可不传）
         * @param { date } scheduleTime 定时发布时需要传
         * @param { string } remark
         */
        async apiSaveOrPublishChapters(isPublish, isTips) {
            let params = {
                ...this.chapterDraft,
                // content: this.$refs.editor.getContent(),
                // chapterContentFormat: this.$refs.editor.getHtmlContent(),
            };

            if(this.draftId) {
                params.draftId = this.draftId;
            }

            if(this.publishType) {
                params.publishType = this.publishType;
                params.scheduleTime = this.scheduleTime;
            }


            // const formData = new FormData();
            // Object.keys(params).forEach(keys => {
            //     formData.append(keys, params[keys])
            // })

            if(this.loading && !isTips) {
                return ;
            }

            this.loading = true;

            try {
                const res = await saveOrPublishChapter({...params, chapterName: this.chapterDraft.chapterName || "无章节名", bookId: this.bookId });
                
                if(res.code === "200") {
                    this.dialogFormVisible = false;
                    if(isPublish){
                        isTips && this.$message.success("发布成功");
                        this.getAppVolumeListByBookId();
                        this.$router.push({
                            name: "published",
                            query: {
                                bookId: this.bookId,
                            },
                            params: {
                                bookId: this.bookId,
                            }
                        })
                    }else{
                        // draftId
                        isTips && this.$message.success("保存成功");
                        this.$emit('changeDraftList', res.data.draftId);
                        this.getChapterDraftById(res.data.draftId);
                    }
                }

                setTimeout(() => {
                    this.loading = false;
                }, 300)

            } catch (error) {

            }
        },

        /**
         * 
         * 保存发布章节
         */
        saveOrPublishChapters(isPublish, isTips) {
            if(!isPublish) {
                delete this.chapterDraft.draftId
                this.apiSaveOrPublishChapters(isPublish, isTips);
                return ;
            }

            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    if(!this.publishType){
                        this.$alert('请选择发布类型！', '错误', {
                            confirmButtonText: '确定'
                        });
                        return
                    }

                    if(this.publishType == 2 && !this.scheduleTime){
                        this.$alert('请选择发布时间！', '错误', {
                            confirmButtonText: '确定'
                        });
                        return
                    }

                    this.apiSaveOrPublishChapters(isPublish, isTips);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        /**
         * 
         * 根据id获取草稿详情
         * @param { number } draftId 草稿id
         */
        async getChapterDraftById(draftId) {
            const res = await getChapterDraftById({ draftId });

            if(res.code === "200") {
                const chapterDraft = res.data.chapterDraft;
                this.chapterDraft = chapterDraft || {};
                setTimeout(() => {
                    this.$refs.editor.setContent(chapterDraft.chapterContentFormat, chapterDraft.wordCount);
                }, 300);
            }
        },

        /**
         * 
         * 根据作品id获取卷宗列表
         * @param { number } bookId 书籍id
         */
        async getAppVolumeListByBookIds(bookId) {
            const res = await getAppVolumeListByBookId({ bookId });
            
            if(res.code === "200") {
                this.appVolumeList = res.data.appVolumeList;
                if(this.draftId){
                    this.getChapterDraftById(this.draftId)
                }

                if(!this.chapterDraft.volumeId) {
                    this.chapterDraft.volumeId = this.appVolumeList.length ? this.appVolumeList[0].volumeId : "";
                }
            }
        },

        handleOpen() {
            this.publishType = "1";
            // this.chapterDraft.content = this.$refs.editor.getContent();
        },
        handleClose() {
            this.publishType = null;
        }
    },
    created() {
        this.getAppVolumeListByBookIds(this.bookId);
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
    .quillCon{
        flex:1;
    }
    .quill-editor {
        width: 100%;
        background: #fff;
        height: 100%;
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