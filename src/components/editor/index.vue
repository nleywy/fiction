<template>
    <Editor
        :api-key="apikey"
        :id="editorId"
        :init="init"
        :toolbar="toolbar"
        :plugins="plugins"
        :output-format="outputFormat"
        :placeholder="placeholder"
        v-model="editorContent"
        @onGetContent="handleGetContent"
        model-events="change keydown blur focus paste"
    />
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

export default {
    name: "tinymceEditor",
    components: {
        Editor
    },
    model: {
        prop: "content",
        event: "getContent"
    },
    data() {
        return {
            editorContent: "",
            placeholder: "在此输入正文，不满1000字时，设定该章节为免费章节",
            apikey: "zg1d2xp43sktfw6i580bg4awi1cicuq462z75l45aiayhw8b",
            editorId: "",
            init: {
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
                    tools: {title: '工具', items: 'spellchecker code'}
                }
            },
            // toolbar: [],
            toolbar: [ //数组写法
                // 'undo redo | wordcount | fullscreen',
                'undo redo | wordcount | fullscreen',
            ],
            plugins: [
                "wordcount",
                "fullscreen"
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
         * 获取内容
         */
        handleGetContent(event) {
            this.$emit("getContent", event.content);
        }
    }
}
</script>

<style>

</style>