<template>
    <div style="Editor" v-loading="loading">
        <!-- <Editor
            ref="Editor"
            :tinymceScriptSrc="tinymceScriptSrc"
            :id="editorId"
            :init="init"
            :toolbar="toolbar"
            :plugins="plugins"
            :output-format="outputFormat"
            :placeholder="placeholder"
            v-model="editorContent"
            :disabled="disabled"
            @onKeyUp="handleKeyUp"
            @onFocus="handleFocusIn"
            @onBlur="handleFocusOut"
            @hook:mounted="hookMounted"
        /> -->
        <Editor
            ref="Editor"
            :id="editorId"
            :init="init"
            :toolbar="toolbar"
            :plugins="plugins"
            :output-format="outputFormat"
            :placeholder="placeholder"
            v-model="editorContent"
            :disabled="disabled"
            @onKeyUp="handleKeyUp"
            @onFocus="handleFocusIn"
            @onBlur="handleFocusOut"
            @hook:mounted="hookMounted"
        />

        <div class="Editor-wordcount" v-if="!disabled">{{ editorContentLength }}/20000</div>
    </div>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
// import 'tinymce/skins/content/default/content.min.css';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/paste';
import { ASSETS_BASE_URL } from "@/config";

export default {
    name: "tinymceEditor",
    components: {
        Editor
    },
    // model: {
    //     prop: "content",
    //     event: "getContent"
    // },
    // props: {
    //     content: String,
    // },
    props: {
        disabled: Boolean,
    },
    data() {
        return {
            wordCount: 0,
            length: 0,
            loading: true,
            content: "",
            editorContent: "",
            placeholder: "在此输入正文，不满1000字时，设定该章节为免费章节",
            // apikey: "zg1d2xp43sktfw6i580bg4awi1cicuq462z75l45aiayhw8b",
            editorId: "Editor",
            init: {
                content_style: `
                    body {
                        margin: 0px;
                        line-height: 30px;
                        font-size: 16px;
                    }
                    p {
                        font-size: 16px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #7B7B7B;
                        line-height: 30px;
                        word-break: break-all;
                        overflow-wrap: break-word;
                    }
                `,
                language_url : ASSETS_BASE_URL + "/tinymce/langs/zh_CN.js",
                content_css : ASSETS_BASE_URL + "/tinymce/css/content.min.css",
                skin_url: ASSETS_BASE_URL + "/tinymce/css",
                language:'zh_CN',
                branding: false,
                resize: false,
                toolbar: false,
                height: 500,
                // menubar: 'edit insert tools',
                menubar: '',
                menu: {
                    // file: {title: '文件', items: 'newdocument'},
                    edit: {title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall'},
                    // insert: {title: '插入', items: 'link media | template hr'},
                    // view: {title: '查看', items: 'visualaid'},
                    // format: {title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
                    // table: {title: '表格', items: 'inserttable tableprops deletetable | cell row column'},
                    // tools: {title: '工具', items: 'spellchecker code'}
                },
                nonbreaking_force_tab: true,
                paste_as_text: true,
                setup(editor) {
                    editor.on("keydown", function(event) {
                        if(event.key === "Enter") {
                            if(!editor.getContent().length) {
                                editor.execCommand('mceInsertContent', true, '<p>&nbsp;&nbsp;&nbsp;&nbsp;<br data-mce-bogus="1"></p>');
                            }
                            editor.execCommand('mceInsertContent', true, '<p>&nbsp;&nbsp;&nbsp;&nbsp;<br data-mce-bogus="1"></p>');
                            return false;
                        }
                    })
                }
            },
            toolbar: [ //数组写法
                'undo redo',
            ],
            plugins: [
                "nonbreaking",
                "paste",
            ],
            outputFormat: "text",
            // tinymceScriptSrc: ASSETS_BASE_URL + "/tinymce/js/tinymce.min.js",
            ASSETS_BASE_URL,
        }
    },
    watch: {
        editorContent(newVal) {
            // if(typeof newVal === "string") {
            //     // const editorContent = newVal.trim().replaceAll("↵", "").replaceAll("\n", "").replaceAll("　　", "").replaceAll(" ", "");
            //     // const editorContent = newVal.trim().replace(/↵|\n|　| /g, "").replace(/\n/g, "").replace(/　/g, "").replace(/ /g, "");
            //     // const editorContent = newVal.trim().replace(/↵|\n|　| |\s/g, "");
            //     // const editorContent = newVal.trim().replace(/↵/g, "").replace(/\n/g, "").replace(/　　/g, "").replace(/ /g, "");
            //     const editorContent = newVal.trim().replace(/↵/g, "").replace(/\n/g, "").replace(/<([^>]*)>|&nbsp/g, "").replace(/ /g, "");
            //     this.wordCount = editorContent.length;
            // }

            if(typeof newVal === "string") {
                const html = this.$refs.Editor.editor.getContent({ format: "html" })
                console.log(html)
                const editorContent = html.trim().replace(/↵/g, "").replace(/\n/g, "").replace(/<([^>]*)>|&nbsp;/g, "").replace(/ /g, "");
                console.log(editorContent)
                this.wordCount = editorContent.length;
            }

            this.$emit("updateContent", {
                text: this.$refs.Editor.editor.getContent({ format: "text" }),
                html: this.$refs.Editor.editor.getContent({ format: "html" }),
            })
        }
    },
    computed: {
        editorContentLength() {
            // let editorContent = this.editorContent;
            // if(typeof editorContent === "string") {
            //     editorContent = editorContent.trim().replace("\n", "").replace("　　", "").replace(" ", "");
            //     return editorContent.length;
            // }

            // return editorContent ? editorContent.length : 0;
            return this.wordCount;
        }
    },
    // filters: {
    //     fliterEditorContentLength(editorContent) {
    //         if(typeof editorContent === "string") {
    //             return editorContent.trim().replace("\n", "").replace("　　", "").replace(" ", "").length;
    //         }

    //         return editorContent ? editorContent.length : 0;
    //     }
    // },
    methods: {
        /**
         * 
         * 获取文本内容
         */
        getContent() {
            // return this.editorContent;
            return this.$refs.Editor.editor.getContent({ format: "text" });
        },
        /**
         * 
         * 获取html内容
         */
        getHtmlContent() {
            return this.$refs.Editor.editor.getContent({ format: "html" });
        },
        /**
         * 
         * 设置内容
         */
        setContent(newVal, wordCount) {
            this.editorContent = newVal;
            setTimeout(() => {
                this.wordCount = wordCount;
            }, 100)
        },
        hookMounted() {
            this.loading = false;
        },
        handleKeyUp(event, editor) {
        },
        handleFocusIn(event, editor) {
            // console.log(event, editor)
        },
        handleFocusOut(event, editor) {
            // this.$emit("editorBlur") // 关闭自动保存
        }
    },
    created() {
        
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
    .Editor {
        height: 500px;
        position: relative;

        &-wordcount {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #D8D8D0;
            line-height: 20px;
            position: absolute;
            right: 0px;
            bottom: 10px;
        }
    }
</style>>
