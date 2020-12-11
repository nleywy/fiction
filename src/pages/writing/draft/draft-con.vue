<template>
    <div class="draftCon">
        <div class="draftCon-title">
            <el-select v-model="chapterDraft.volumeId" placeholder="请选择作者分类" style="width: 215px;">
                <el-option :label="item.title" :value="item.volumeId" v-for="item in appVolumeList"></el-option>
            </el-select>
            <div class="draftCon-title__btns">
                <el-button>删除</el-button>
                <el-button @click="saveOrPublishChapter(true)">保存</el-button>
                <el-button type="primary">发布</el-button>
            </div>
        </div>
        <el-input
            style="margin-bottom: 20px;"
            type="textarea"
            :rows="2"
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
                :rows="2"
                placeholder="在此输入作者的话"
                v-model="chapterDraft.remark"
            ></el-input>
            <span class="textNum">{{chapterDraft.remark.length}}/500</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "draftCon",
    data() {
        return {
            appVolumeList: [],
            TiLength: 0,
            editorOption: {
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                        [{ header: 1 }, { header: 2 }], // 1、2 级标题
                        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                        // [{ script: "sub" }, { script: "super" }], // 上标/下标
                        [{ indent: "-1" }, { indent: "+1" }], // 缩进
                        // [{ size: ["small", false, "large", "huge"] }], // 字体大小
                        // [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                        // [{ align: [] }], // 对齐方式
                        // ["link", "image", "video"] // 链接、图片、视频
                    ], //工具菜单栏配置
                },
                placeholder: '在此输入正文，不满1000字时，设定该章节为免费章节', //提示
                readyOnly: false, //是否只读
                theme: 'snow', //主题 snow/bubble
                syntax: true, //语法检测
            },
            chapterDraft: {
                "draftId": 8,
                "chapterName": "章节1",
                "authorId": null,
                "bookId": 1,
                "volumeId": 8,
                "publishType": "2",
                "scheduleTime": "2020-12-01 20:02:30",
                "isDelete": "0",
                "createTime": "2020-12-01 20:01:11",
                "updateTime": null,
                "remark": "备注备注",
                "wordCount": null,
                "content": "内容内容内容测试测hi是测试容测试测"
            }
        }
    },
    props: {
        draftId: Number,
        bookId: Number
    },
    components: {

    },
    watch: {
        draftId(value) {
            this.getChapterDraftById(value)
        },
        'chapterDraft.remark'(value, oldValue) {
            if(value.length>=20){
                this.chapterDraft.remark = value.substr(0,20);
            }
        }

    },
    methods: {
        onEditorChange(event) {
            event.quill.deleteText(2000, 1);
            if (this.chapterDraft.content === 0) {
                this.TiLength = 0
            }else {
                this.TiLength = event.quill.getLength() - 1
            }
        },
        saveOrPublishChapter(isSave) {
            this.$ajax({
                url: "/author/cms/chapter/saveOrPublishChapter",
                method: 'post',
                data: {
                    draftId
                }
            }).then(res => {
                // this.chapterDraft = res.data.data.chapterDraft;
            })
        },
        getChapterDraftById(draftId) {
            this.$ajax({
                url: "/author/cms/chapter/getChapterDraftById",
                method: 'get',
                data: {
                    draftId
                }
            }).then(res => {
                // this.chapterDraft = res.data.data.chapterDraft;
            })
        },
        getAppVolumeListByBookId(bookId) {
            this.$ajax({
                url: "/author/cms/volume/getAppVolumeListByBookId",
                method: 'get',
                data: {
                    bookId
                }
            }).then(res => {
                this.appVolumeList = res.data.data.appVolumeList;
                this.getChapterDraftById(this.draftId)
            })
        },


    },
    mounted() {
        this.TiLength = this.$refs.myQuillEditor.quill.getLength() - 1
    },
    created() {
        this.getAppVolumeListByBookId(this.bookId)
    }
}
</script>

<style lang="scss" scoped>
.draftCon {
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
    .quill-editor {
        width: 100%;
        height: 500px;
        background: #fff;
    }
}
</style>