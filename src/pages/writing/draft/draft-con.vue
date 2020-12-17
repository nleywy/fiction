<template>
    <div class="draftCon">
        <div class="draftCon-title">
            <el-select v-model="chapterDraft.volumeId" placeholder="请选择分卷" style="width: 215px;">
                <template v-for="item in appVolumeList">
                    <el-option :label="item.title" :value="item.volumeId" :key="item.volumeId"></el-option>
                </template>
            </el-select>
            <div class="draftCon-title__btns">
                <el-button @click="deleteChapterDraft">删除</el-button>
                <el-button @click="saveOrPublishChapter(false)">保存</el-button>
                <el-button type="primary" @click="dialogFormVisible = true">发布</el-button>
            </div>
        </div>
        <el-input
            style="margin-bottom: 20px;"
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="在此输入章节号和章节名。例如：“第十章 我和秋天有个约定”"
            v-model="chapterDraft.chapterName"
        ></el-input>

        <div class="quillCon">
            <quill-editor
                v-model="chapterDraft.content"
                :options="editorOption"
                @change="onEditorChange($event)"
                ref="myQuillEditor"
            ></quill-editor>
            <span class="textNum">{{TiLength}}/2000</span>
        </div>

        <div class="remark">
            <el-input
                type="textarea"
                :rows="4"
                resize="none"
                placeholder="在此输入作者的话"
                v-model="chapterDraft.remark"
                style="margin-bottom: 20px;"
                >
            </el-input>
            <span class="textNum">{{chapterDraft.remark.length}}/500</span>
        </div>

        <el-dialog title="确认章节信息" :visible.sync="dialogFormVisible">
            <el-form>
                <div class="dialog-info">
                    <div class="name">书籍名称</div>
                    <div class="value">{{chapterDraft.bookName}}</div>
                </div>
                <div class="dialog-info">
                    <div class="name">最新章节</div>
                    <div class="value">{{chapterDraft.latestChapterName}}</div>
                </div>
                <div class="dialog-info">
                    <div class="name">发布章节</div>
                    <div class="value">{{chapterDraft.chapterName}}</div>
                </div>
                <div class="dialog-info">
                    <div class="name">章节字数</div>
                    <div class="value">{{TiLength}}字</div>
                </div>
                <div class="dialog-info">
                    <div class="name">分卷信息</div>
                    <div class="value">{{findTitle(chapterDraft.volumeId)}}</div>
                </div>
                <div class="dialog-info">
                    <div class="name">发布时间</div>
                    <div class="value">
                        <el-radio v-model="publishType" label="1">及时</el-radio>
                        <el-radio v-model="publishType" label="2">定时</el-radio>
                        <el-date-picker
                            style='display:block;margin-top: 12px'
                            v-model="scheduleTime"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-show='publishType == 2'
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveOrPublishChapter(true)">发 布</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    deleteChapterDraft,
    saveOrPublishChapter,
    getChapterDraftById,
} from "@/api/chapter";
import { getAppVolumeListByBookId } from "@/api/volume";

export default {
    name: "draftCon",
    props: {
        draftId: [ Number, String ],
        bookId: [ Number, String ]
    },
    data() {
        return {
            appVolumeList: [],
            dialogFormVisible: false,
            scheduleTime:'',
            publishType: null,//1-及时，2-定时
            TiLength: 0,
            editorOption: {
                modules: {
                    toolbar: [
                        // ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                        // [{ header: 1 }, { header: 2 }], // 1、2 级标题
                        // [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                        // // [{ script: "sub" }, { script: "super" }], // 上标/下标
                        // [{ indent: "-1" }, { indent: "+1" }], // 缩进
                        // // [{ size: ["small", false, "large", "huge"] }], // 字体大小
                        // // [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                        // // [{ align: [] }], // 对齐方式
                        // // ["link", "image", "video"] // 链接、图片、视频
                    ], //工具菜单栏配置
                },
                placeholder: '在此输入正文，不满1000字时，设定该章节为免费章节', //提示
                readyOnly: false, //是否只读
                theme: 'snow', //主题 snow/bubble
                syntax: true, //语法检测
            },
            chapterDraft: {},
        }
    },
    watch: {
        draftId(value) {
            if(value != -100){
                this.getChapterDraftById(value)
            }else{
                this.chapterDraft = {
                    volumeId:'',
                    ...this.$store.state.bookInfo,
                    publishType: null,
                    scheduleTime: null,
                    remark: "",
                    wordCount: null,
                    content: "",
                    bookName:'',
                    latestChapterId:'',
                    latestChapterName:''
                }
            }
        },
        'chapterDraft.remark'(value, oldValue) {
            if(value&&value.length>=20){
                this.chapterDraft.remark = value.substr(0,20);
            }
        }
    },
    methods: {
        findTitle(volumeId){
            let l = this.appVolumeList.length;
            for(let i=0;i<l;i++){
                let item = this.appVolumeList[i];
                if(item.volumeId == volumeId){
                    return item.title
                }
            }
        },
        onEditorChange(event) {
            event.quill.deleteText(2000, 1);
            if (this.chapterDraft.content === 0) {
                this.TiLength = 0
            }else {
                this.TiLength = event.quill.getLength() - 1
            }
        },

        /**
         * 
         * 删除草稿
         * @param { number } draftId 草稿id
         */
        async apiDeleteChapterDraft() {
            const res = await deleteChapterDraft({ dragId: this.dragId });

            if(res.code === "200") {
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
                this.apiDeleteChapterDraft();
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
         * @param { string } publishType 1-及时，2-定时 （保存不发布时，可不传）
         * @param { date } scheduleTime 定时发布时需要传
         * @param { string } remark
         */
        async apiSaveOrPublishChapter() {
            const res = await saveOrPublishChapter({
                ...this.chapterDraft,
                scheduleTime: this.scheduleTime,
                publishType: this.publishType,//1-及时，2-定时
            });

            if(res.code === "200") {
                this.dialogFormVisible = false;
                this.$emit('changeDraftList')
                if(isPublish){
                    this.$alert('发布成功', '提示', {
                        confirmButtonText: '确定'
                    });
                }else{
                    this.$alert('保存成功', '提示', {
                        confirmButtonText: '确定'
                    });
                }
            }
        },

        saveOrPublishChapter(isPublish) {
            if(isPublish){
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
            }else{
                delete this.chapterDraft.draftId
            }

            this.apiSaveOrPublishChapter();
        },

        /**
         * 
         * 根据id获取草稿详情
         * @param { number } draftId 草稿id
         */
        async getChapterDraftById(draftId) {
            const res = await getChapterDraftById({ draftId });

            if(res.code === "200") {
                this.chapterDraft = res.data.chapterDraft || {};
            }
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
    },
    created() {
        if(this.draftId != 100){
            this.chapterDraft = {
                volumeId: '',
                ...this.$store.state.bookInfo,
                publishType: null,
                scheduleTime: null,
                remark: "",
                wordCount: null,
                content: "",
                bookName:'',
                latestChapterId:'',
                latestChapterName:'',
            }
        }
    },
    mounted() {
        this.TiLength = this.$refs.myQuillEditor.quill.getLength() - 1
        this.getAppVolumeListByBookId(this.bookId);
    },
}
</script>

<style lang="scss" scoped>
.draftCon {
    display: flex;
    height: 100%;
    flex-direction: column;
    &-title {
        display: flex;
        margin-bottom: 20px;
        justify-content: space-between;
        &__btns {
            display: inline-block;
        }
    }
    .quillCon,
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
</style>