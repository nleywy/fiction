<template>
    <div class="draft">
        <div class="draft-left">
            <el-scrollbar style="width: 100%;height: 100%;" class="pageScrollbar">
                <template v-for='(draft, index) in draftListaft'>
                    <div :class="[ 'draft-left__item', active == index ? 'activity' : '' ]" @click='changeDraft(draft.draftId, index)' :key="index">
                        <div class="name" :title="draft.chapterName">{{draft.chapterName}}</div>
                        <div class="des">
                            <i class="el-icon-time" v-if='draft.createTim'></i>
                            {{draft.createTime}} {{draft.wordCount}}字
                        </div>
                    </div>
                </template>
            </el-scrollbar>
        </div>
        <div class="draft-con">
            <draftCon ref="draftCon" @changeDraftList="getChapterDraftListByBookId" @delDraft="delDraft"></draftCon>
        </div>
    </div>
</template>

<script>
import draftCon from './draft-con';
import { mapState, mapMutations, mapActions } from "vuex";

export default {
    components: {
        draftCon,
    },
    data() {
        return {};
    },
    computed: {
        ...mapState("writingDraft", [ "draftListaft", "active", "draftId", "bookId" ]),
    },
    methods: {
        ...mapMutations("writingDraft", [ "SET_DRAFT_LISTAFT", "SET_ACTIVE", "SET_DRAFTID", "SET_BOOKID", "ADD_DRAFT" ]),
        ...mapActions("writingDraft", [ "getChapterDraftListByBookId" ]),
        /**
         * 
         * 草稿变化
         */
        changeDraft(draftId, index) {
            this.SET_ACTIVE(index);
            const id = draftId ? draftId : (this.draftId === null ? 0 : null);
            this.SET_DRAFTID(id);

            // this.$refs.draftCon.apiSaveOrPublishChapters(false, false);
        },
        /**
         * 
         * 删除草稿
         */
        delDraft() {
            const draftListaft = this.draftListaft.filter((item, index) => index !== this.active);
            console.log(draftListaft)
            this.SET_DRAFT_LISTAFT(draftListaft);

            if(!this.draftListaft.length) {
                this.ADD_DRAFT();
            }else {
                this.SET_ACTIVE(0);
                this.SET_DRAFTID(this.draftListaft[0].draftId);
            }
        },
    },
    created() {
        this.SET_BOOKID(this.$route.query.bookId);
    }
}
</script>

<style lang="scss" scoped>
.draft {
    // display: flex;
    display: block;

    .draft-left {
        display: inline-block;
        width: 245px;
        height: 875px;
        margin-right: 20px;
        padding: 10px 0;
        background-color: #fff;
        vertical-align: top;

        &__item {
            cursor: pointer;
            height: 75px;
            padding: 14px 30px;
            color: #7b7b7b;

            &:hover,
            &.activity {
                color: #3399fe;
                background: rgba(2, 103, 229, 0.05);
            }
            .name {
                height: 20px;
                margin-bottom: 10px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                line-height: 20px;
                @include mixin-textHidden;
            }
            .des {
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                vertical-align: middle;
                .el-icon-time {
                    font-size: 18px;
                    vertical-align: middle;
                }
            }
        }
    }
    .draft-con {
        display: inline-block;
        width: 935px;
        vertical-align: top;
    }
}
</style>