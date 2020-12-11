<template>
    <div class="draft">
        <div class="draft-left">
            <div class="draft-left__item activity" @click='changeDraft(1)'>
                <div class="name">无章节名</div>
                <div class="des">0字</div>
            </div>
            <div class="draft-left__item">
                <div class="name">无章节名</div>
                <div class="des">
                    <i class="el-icon-time"></i>
                    11-14 10:22 10字
                </div>
            </div>
            <div class="draft-left__item">
                <div class="name">无章节名</div>
                <div class="des">0字</div>
            </div>
        </div>
        <div class="draft-con">
            <draftCon :draftId='draftId' :bookId='bookId'></draftCon>
        </div>
    </div>
</template>
<script>
import draftCon from './draft-con'
export default {
    name: "draft",
    data() {
        return {
            bookId: 0,
            chapterDraft:{},
            draftId:-100
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
        getChapterDraftListByAuthodId() {
            this.$ajax({
                url: "/author/cms/chapter/getChapterDraftListByAuthodId",
                method: 'get',
                data: {
                    bookId: this.form.bookName
                }
            }).then(res => {
                let { isExist } = res.data.data;
                this.isExist = isExist ? 2 : 1;
            })
        },
        changeDraft(draftId){
            this.draftId = draftId;
        }

    },
    created() {
        this.bookId = this.$route.params.id * 1;
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