<template>
    <div class="draft">
        <div class="draft-left">
            <el-scrollbar style="height: 100%;" class="pageScrollbar">
                <el-tree ref="tree" :data="appVolumeList" highlight-current :props="defaultProps" lazy @node-click="handleNodeClick" node-key="_key" :load="handleTreeLeafLoad">
                    <template slot-scope="{ node, data }">
                        <div v-if="!node.isLeaf">
                            <label for="" class="draft-left-label">{{ data._label }}</label>
                            <div class="draft-left-count">共{{ data.chapterCount }}章</div>
                        </div>
                        <div v-else class="draft-left-leaf">
                            <label for="" class="draft-left-leaf-label">{{ data._label }}</label>
                            <div class="draft-left-leaf-count">{{ data.createTime.substring(6, 16) }} {{ data.wordCount }}字</div>
                        </div>
                    </template>
                </el-tree>
            </el-scrollbar>
        </div>
        <!-- <div class="draft-con" v-if='draftId'> -->
        <div class="draft-con">
            <!-- <draftCon :draftId='draftId' :bookId='bookId' @changeDraftList="getChapterDraftListByBookId"></draftCon> -->
        </div>
    </div>
</template>
<script>
// import draftCon from '../draft/draft-con';
import Bus from '@/tools/bus.js'
import { getAppVolumeListByBookId } from "@/api/volume";
import { getAppChapterListByVolumeId } from "@/api/chapter";

export default {
    name: "draft",
    components: {
        // draftCon
    },
    data() {
        return {
            appVolumeList: [],
            defaultProps: {
                // isLeaf(data, node) {
                //     console.log(data);
                //     const keys = Object.keys(data);
                //     return !keys.includes("chapterCount");
                // },
                isLeaf: '_isLeaf',
            },
            bookId: null,
        };
    },
    methods: {
        // /**
        //  * 
        //  * 根据卷宗id获取章节列表
        //  * @param { number } volumeId 卷宗id
        //  * @param { number } pageNo
        //  * @param { number } pageSize
        //  */
        // async getAppChapterListByVolumeId(volumeId, _key) {
        //     const res = await getAppChapterListByVolumeId({ volumeId, pageNo: 1, pageSize: 10000, });
        //     console.log(res);

        //     if(res.code === "200") {
        //         const list = res.data.chapterList.map(item => {
        //             item._key = item.createTime + "_" + item.chapterId;
        //             item._label = item.chapterName;
        //             item._isLeaf = true;
        //             return item;
        //         })

        //         this.$refs.tree.updateKeyChildren(_key, list);
        //     }
        // },

        /**
         * 
         * 根据作品id获取卷宗列表
         * @param { number } bookId 卷宗id
         * @param { number } pageNo
         * @param { number } pageSize
         */
        async getAppVolumeListByBookId() {
            const res = await getAppVolumeListByBookId({ bookId: this.bookId, pageNo: 1, pageSize: 10000, });

            if(res.code === "200") {
                this.appVolumeList = res.data.appVolumeList.map(item => {
                    item._key = item.createTime + "_" + item.volumeId;
                    item._label = item.title;
                    item._isLeaf = item.chapterCount <= 0;
                    return item;
                });
            }
        },

        async handleNodeClick(data) {

        },

        /**
         * 
         * 加载子节点
         */
        async handleTreeLeafLoad(node, resolve) {
            const { data } = node;
            if(data.children && data.children.length || !data.volumeId) {
                resolve([]);
                return ;
            }

            const res = await getAppChapterListByVolumeId({ volumeId: data.volumeId, pageNo: 1, pageSize: 10000, });

            if(res.code === "200") {
                const list = res.data.chapterList.map(item => {
                    item._key = item.createTime + "_" + item.chapterId;
                    item._label = item.chapterName;
                    item._isLeaf = true;
                    return item;
                });

                resolve(list);
            }else {
                resolve([]);
            }
        }
    },
    created() {
        this.bookId = this.$route.query.bookId;

        this.$nextTick().then(() => {
            this.getAppVolumeListByBookId();
        });
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

        &-leaf {
            &-label {
                display: block;
                height: 17px;
                margin-bottom: 10px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7B7B7B;
                line-height: 17px;
            }

            &-count {
                height: 17px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7B7B7B;
                line-height: 17px;
            }
        }

        &-label {
            display: block;
            height: 30px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #030303;
            line-height: 20px;
        }

        &-count {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #030303;
            line-height: 17px;
        }

        & /deep/ .el-tree-node {
            // height: 70px;

            .el-tree-node__content {
                height: 70px;
            }
        }

        & /deep/ .el-tree-node.is-current {
            & > .el-tree-node__content {
                .draft-left-leaf {
                    &-label,
                    &-count {
                        color: #3399FE;
                    }
                }
            }

        }

        & /deep/ .el-tree-node__expand-icon:not(.is-leaf) {
            padding: 0px 20px;
            font-size: 24px;
            color: #C0C4CC;
        }

        & /deep/ .is-leaf.el-tree-node__expand-icon {
            padding: 11px;
            font-size: 24px;
            color: transparent;
        }
        
    }

    .draft-con{
        flex:1;
    }
}
</style>