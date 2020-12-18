<template>
    <div style="Editor">
        <Editor
            ref="Editor"
            :api-key="apikey"
            :id="editorId"
            :init="init"
            :toolbar="toolbar"
            :plugins="plugins"
            :output-format="outputFormat"
            :placeholder="placeholder"
            v-model="editorContent"
            :disabled="disabled"
        />

        <div class="Editor-wordcount">{{ editorContent.length }}/20000</div>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

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
            editorContent: "",
            placeholder: "在此输入正文，不满1000字时，设定该章节为免费章节",
            apikey: "zg1d2xp43sktfw6i580bg4awi1cicuq462z75l45aiayhw8b",
            editorId: "Editor",
            init: {
                // skin: 'oxide-dark',
                // skin_url: '/tinymce/css/skin.css',
                content_style: `
                    body {
                        margin: 0px;
                    }
                    p {
                        font-size: 16px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #7B7B7B;
                        line-height: 30px;
                    }
                `,
                language_url : "/tinymce/langs/zh_CN.js",
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
                }
            },
            // toolbar: [],
            toolbar: [ //数组写法
                // 'undo redo | wordcount | fullscreen',
                // 'undo redo | wordcount | fullscreen',
                'undo redo',
            ],
            plugins: [
                // "wordcount",
                // "fullscreen"
            ],
            outputFormat: "text"
        }
    },
    methods: {
        /**
         * 
         * 获取内容
         */
        getContent() {
            return this.editorContent;
        },
        /**
         * 
         * 设置内容
         */
        setContent(newVal) {
            this.editorContent = newVal;
        },
        // /**
        //  * 
        //  * 获取内容
        //  */
        // handleGetContent(event) {
        //     console.log(event.content);
        //     this.$emit("getContent", event.content);
        // }
    },
}
</script>

<style lang="scss" scoped>
    .Editor {
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
