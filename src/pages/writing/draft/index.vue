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
            <draftCon :draftListaft="draftListaft" :draftId='draftId' :bookId='bookId' @changeDraftList="getChapterDraftListByBookId" @delDraft="delDraft"></draftCon>
        </div>
    </div>
</template>

<script>
import draftCon from './draft-con';
import Bus from '@/tools/bus.js'
import { getChapterDraftListByBookId } from "@/api/chapter";

export default {
    components: {
        draftCon,
    },
    data() {
        return {
            bookId: 0,
            draftListaft: [],
            draftId: 0,
            active: 0,
        };
    },
    methods: {
        /**
         * 
         * 获取草稿箱内容列表
         */
        async getChapterDraftListByBookId(draftId) {
            console.log(draftId)
            const res = await getChapterDraftListByBookId({ bookId: this.bookId });

            if(res.code === "200") {
                const draftListaft = res.data.draftListaft;
                this.draftListaft = draftListaft;
                if(draftListaft.length == 0){
                    Bus.$emit('add');
                }else{
                    // this.draftId = this.draftListaft[0].draftId;
                    const findIndex = draftListaft.findIndex(item => item.draftId === draftId);

                    if(findIndex !== -1) {
                        this.active = findIndex;
                        this.draftId = draftId;
                    }else {
                        this.active = 0;
                        this.draftId = draftListaft[0].draftId;
                    }
                }
            }
        },
        changeDraft(draftId, index) {
            this.active = index;
            this.draftId = draftId ? draftId : (this.draftId === null ? 0 : null);
        },
        delDraft() {
            this.draftListaft.splice(this.active, 1);

            if(!this.draftListaft.length) {
                Bus.$emit('add')
            }else {
                this.active = 0;
                this.draftId = this.draftListaft[0].draftId;
            }
        }
    },
    created() {
        this.bookId = this.$route.query.bookId;
        this.getChapterDraftListByBookId();
        Bus.$on("add", val => {
            this.draftListaft.unshift({
                chapterName: "无章节名" ,
                wordCount: 0,
                draftId: null,
            })
            this.draftId = null;
            this.active = 0;
        })
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