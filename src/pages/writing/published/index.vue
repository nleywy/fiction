<template>
    <div class="draft">
        <div class="draft-left">
            <el-scrollbar style="height: 100%;" class="pageScrollbar">
                <el-tree
                    ref="tree"
                    :default-expanded-keys="defaultKeys"
                    :data="appVolumeList"
                    highlight-current
                    :props="defaultProps"
                    lazy
                    @node-click="handleNodeClick"
                    node-key="_key"
                    :load="handleTreeLeafLoad"
                    >
                    <template slot-scope="{ node, data }">
                        <div v-if="!node.isLeaf">
                            <label for="" class="draft-left-label" :title="data._label">{{ data._label }}</label>
                            <div class="draft-left-count">共{{ data.chapterCount }}章</div>
                        </div>
                        <div v-else class="draft-left-leaf">
                            <label for="" class="draft-left-leaf-label">
                                <span :style="{ color: statusColor[data.reviewState] }">{{ data.reviewState | filterReviewState(enumsGetMap) }}</span>
                                <span :title="data._label">{{ data._label }}</span>
                            </label>
                            <div class="draft-left-leaf-count">{{ data.createTime.substring(6, 16) }} {{ data.wordCount }}字</div>
                        </div>
                    </template>
                </el-tree>
            </el-scrollbar>
        </div>

        <div class="draft-con">
            <draftCon :chapterData="chapterData" :bookId="bookId" @updateTree="updateTree"></draftCon>
        </div>
    </div>
</template>

<script>
import draftCon from './draft-con';
import Bus from '@/tools/bus.js'
import { getAppVolumeListByBookId } from "@/api/volume";
import { getAppChapterListByVolumeId, getAuthorChapterContentById } from "@/api/chapter";
import { mapGetters } from "vuex";

export default {
    components: {
        draftCon
    },
    data() {
        return {
            draftId: null,
            appVolumeList: [],
            defaultProps: {
                isLeaf: '_isLeaf',
            },
            bookId: null,
            chapterData: {},
            statusColor: {
                0: "#FF8D2B",
                1: "#3399FE",
                2: "#FF2A28",
            },
            defaultKeys: [],
        };
    },
    computed: {
        ...mapGetters("enums", [ "enumsGetMap" ])
    },
    methods: {
        /**
         * 
         * 更新机构树
         */
        updateTree(data) {
            this.getAppChapterListByVolumeId(data.volumeId)
                .then(list => {
                    const find = this.appVolumeList.find(item => item.volumeId === data.volumeId);

                    if(find) {
                        this.$refs.tree.updateKeyChildren(find._key, list);
                    }
                });
        },

        /**
         * 
         * 根据卷宗id获取章节列表
         * @param { number } volumeId 卷宗id
         * @param { number } pageNo
         * @param { number } pageSize
         */
        getAppChapterListByVolumeId(volumeId) {
            return new Promise(async (resolve, reject) => {
                const res = await getAppChapterListByVolumeId({ volumeId, pageNo: 1, pageSize: 10000, time: new Date().getTime() });

                if(res.code === "200") {
                    const list = res.data.chapterList.map(item => {
                        item._key = item.createTime + "_" + item.chapterId;
                        item._label = item.chapterName;
                        item._isLeaf = true;
                        return item;
                    })

                    resolve(list);
                }

                reject(false)
            })
        },

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
                const appVolumeList = res.data.appVolumeList.map(item => {
                    item._key = item.createTime + "_" + item.volumeId;
                    item._label = item.title;
                    // item._isLeaf = item.chapterCount <= 0;
                    item._isLeaf = false;
                    return item;
                });

                const defaultKeys = appVolumeList.find(item => !item._isLeaf && item.chapterCount > 0);

                this.defaultKeys = defaultKeys ? [ defaultKeys._key ] : [];

                if(defaultKeys) {
                    this.defaultKeys = [ defaultKeys._key ];
                    this.getAppChapterListByVolumeId(defaultKeys.volumeId)
                        .then(list => {
                            this.getAuthorChapterContentById(list[0].chapterId);
                            setTimeout(() => {
                                this.$refs.tree.setCurrentKey(list[0]._key);
                            }, 300);
                        });
                }

                this.appVolumeList = appVolumeList;
            }
        },

        /**
         * 
         * 根据id获取作品章节详情
         * @param { number } chapterId 章节id
         */
        async getAuthorChapterContentById(chapterId) {
            const res = await getAuthorChapterContentById({ chapterId });

            if(res.code === "200") {
                this.chapterData = res.data.chapter;
                return ;
            }

            // this.$message.warning(res.msg);
        },

        async handleNodeClick(data) {
            if(!data._isLeaf) {
                return ;
            }

            if(data.chapterCount <= 0) {
                this.$message.warning("")
                return ;
            }

            this.getAuthorChapterContentById(data.chapterId);
        },

        /**
         * 
         * 加载子节点
         */
        async handleTreeLeafLoad(node, resolve) {
            const { data } = node;

            try {
                if(data.chapterCount <= 0) {
                    resolve(false)
                }
            } catch (error) {
                return ;
            }

            if(data.children && data.children.length || !data.volumeId) {
                resolve([]);
                return ;
            }

            this.getAppChapterListByVolumeId(data.volumeId)
                .then(list => resolve(list))
                .catch(list => resolve([]));
        },
    },
    filters: {
        /**
         * 过滤章节状态
         */
        filterReviewState(status, enumsGetMap) {
            const statusList = enumsGetMap("reviewStatusEnum");

            const find = statusList.find(item => item.value == status && item.value != "1");
            if(find) {
                return `[${find.text}]`;
            }

            return "";
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
    display: block;
    // display: flex;
    // justify-content: space-between;
    
    .draft-left {
        display: inline-block;
        width: 245px;
        height: 853px;
        margin-right: 20px;
        padding: 10px 0;
        background-color: #ffffff;
        vertical-align: top;

        &-leaf {
            &-label {
                display: block;
                // width: 245px;
                width: 245px - 46px - 18px - 18px;
                height: 17px;
                margin-bottom: 10px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7B7B7B;
                line-height: 17px;
                @include mixin-textHidden;
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
            width: 245px - 46px - 18px - 18px;
            height: 30px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #030303;
            line-height: 20px;
            @include mixin-textHidden;
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
        display: inline-block;
        width: 935px;
        vertical-align: top;
    }
}
</style>