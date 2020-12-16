<template>
    <div class="draft">
        <div class="draft-left">
            <div :class="['draft-left__item',draftId == draft.draftId?'activity':'']" @click='changeDraft(draft.draftId)' v-for='draft in draftListaft'>
                <div class="name">{{draft.chapterName}}</div>
                <div class="des">
                    <i class="el-icon-time" v-if='draft.createTim'></i>
                    {{draft.createTime}} {{draft.wordCount}}字
                </div>
            </div>
        </div>
        <div class="draft-con" v-if='draftId'>
            <draftCon :draftId='draftId' :bookId='bookId' @changeDraftList="getChapterDraftListByBookId"></draftCon>
        </div>
    </div>
</template>
<script>
import draftCon from './draft-con'
import Bus from '@/tools/bus.js'
export default {
    name: "draft",
    data() {
        return {
            bookId: 0,
            draftListaft:[],
            draftId:0,
        };
    },
    props: {

    },
    components: {
        draftCon
    },
    watch: {

    },
    methods: {
        getChapterDraftListByBookId() {
            this.$ajax({
                url: "/author/cms/chapter/getChapterDraftListByBookId",
                method: 'get',
                data: {
                    bookId: this.bookId
                }
            }).then(res => {
                this.draftListaft = res.data.data.draftListaft;
                if(this.draftListaft.length == 0){
                    Bus.$emit('add')
                }else{
                    this.draftId = this.draftListaft[0].draftId;
                }
            })
        },
        changeDraft(draftId){
            this.draftId = draftId;
        }

    },
    created() {
        this.bookId = this.$route.params.bookId * 1;
        this.getChapterDraftListByBookId();
        Bus.$on("add",val=>{
            this.draftListaft.unshift({
                chapterName: "无字节名",
                wordCount: 0,
                draftId: -100
            })
            this.draftId = -100;
        })
    }
}
</script>

<style lang="scss" scoped>
.draft {
    display: flex;
    .draft-left {
        background-color: #fff;
        padding: 10px 0;
        width: 245px;
        height: 802px;
        overflow: auto;
        margin-right: 20px;
        &__item {
            padding: 20px;
            color: #7b7b7b;
            &.activity {
                color: #3399fe;
                background: rgba(2, 103, 229, 0.05);
            }
            .name {
                font-size: 18px;
                font-weight: 400;
                line-height: 25px;
                margin-bottom: 10px;
            }
            .des {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                vertical-align: middle;
                .el-icon-time {
                    font-size: 18px;
                    vertical-align: middle;
                }
            }
        }
    }
    .draft-con{
        flex:1;
    }
}
</style>