<template>
    <div class="volume">
        <div class="volume-left">
            <el-scrollbar style="width: 100%;height: 100%;" class="pageScrollbar">
                <template v-for='(volume, index) in appVolumeList'>
                    <div :class="['volume-left__item',active == index?'activity':'']" @click='changeVolume(volume, index)' :key="volume.volumeId">
                        <div class="name" :title="volume.title">{{volume.title}}</div>
                        <div class="des">
                            共{{volume.chapterCount}}章
                        </div>
                    </div>
                </template>
            </el-scrollbar>
        </div>
        <div class="volume-con">
            <div class="btns">
                <el-button plain class="btn" size="small" v-if="activeData.sortNum != 0 && activeData.sortNum != 1" @click="handleDel">删除分卷</el-button>
                <!-- <el-button v-if="activeData.sortNum > 1" type="primary" @click="handleUpdate">修改</el-button> -->
                <el-button size="small" class="btn" v-if="activeData.sortNum != 0" type="primary" @click="handleSubmit">保存</el-button>
            </div>

            <el-form label-width="210px">
                <el-form-item label="本卷章节">{{ activeData.chapterCount || 0 }}章</el-form-item>
                <!-- <el-form-item label="分卷序号">
                    <template v-if="activeData.sortNum <= 1">
                        {{ activeData.sortNum }}
                    </template>
                    <template v-else>
                        <el-input v-model.number="sortNum"></el-input>
                    </template>
                </el-form-item> -->
                <el-form-item label="分卷名称">
                    <template v-if="activeData.sortNum == 0">
                        {{ activeData.title }}
                    </template>
                    <template v-else>
                        <el-input v-model="activeData.title"></el-input>
                    </template>
                </el-form-item>
                <el-form-item label="分卷简介">
                    <template v-if="activeData.sortNum == 0">
                        {{ activeData.notes }}
                    </template>
                    <template v-else>
                        <el-input type="textarea" v-model="activeData.notes" :maxlength="50" show-word-limit :rows="6" resize="none"></el-input>
                    </template>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { getAppVolumeListByBookId, getAppVolumeById, addOrUpdateAppVolume, deleteAppVolume } from "@/api/volume";
import { mapState, mapMutations, mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default {
    data(){
        return {
            // volumeId: null,
            // active: 0,
        };
    },
    computed: {
        ...mapState("writingVolume", [ "appVolumeList", "bookId", "sortNum", "isUpdate", "activeData", "active", "volumeId" ]),
    },
    methods: {
        ...mapMutations("writingVolume", [ "SET_APP_VOLUME_LIST", "SET_BOOKID", "SET_ACTIVE_DATA", "SET_SORT_NUM", "SET_ACTIVE", "SET_VOLUMEID" ]),
        ...mapActions("writingVolume", [ "getAppVolumeListByBookId" ]),
        changeVolume(volume, index) {
            this.SET_VOLUMEID(volume.volumeId);
            this.SET_ACTIVE(index);

            if(!volume.volumeId) {
                this.SET_ACTIVE_DATA(volume);
                this.SET_SORT_NUM(this.activeData.sortNum);
            }else {
                this.$nextTick().then(() => {
                    this.getAppVolumeById();
                })
            }
        },

        addVolume() {
            const data = this.appVolumeList[0];
            const sortNum = data.sortNum + 1;

            if(data.chapterCount <= 0) {
                this.$message.warning("上一卷尚未发布章节，无法新建卷");
                return ;
            }

            const params = {
                title: "新建卷",
                chapterCount: 0,
                bookId: this.bookId,
                sortNum,
                notes: "",
            };
            this.SET_APP_VOLUME_LIST([ params, ...this.appVolumeList ]);
            this.SET_ACTIVE_DATA({ ...params });
            this.SET_SORT_NUM(this.activeData.sortNum);
            this.SET_IS_UPDATE(true);
            this.SET_ACTIVE(0);
        },

        /**
         * 
         * 根据作品id获取卷宗列表
         * @param { number } bookId 书籍id
         */
        // async getAppVolumeListByBookId(bookId) {
        //     // const res = await getAppVolumeListByBookId({ bookId: this.bookId, time: uuidv4(), });
            
        //     // if(res.code === "200") {
        //     //     const appVolumeList = res.data.appVolumeList;
        //     //     // this.appVolumeList = appVolumeList;
        //     //     this.SET_APP_VOLUME_LIST(appVolumeList);

        //     //     if(Array.isArray(this.appVolumeList) && this.appVolumeList.length ) {
        //     //         this.changeVolume(this.appVolumeList[0], 0);
        //     //     }
        //     // }
        // },

        // /**
        //  * 
        //  * 根据作品id获取卷宗详情
        //  * @param { number } volumeId 卷宗id
        //  */
        // async getAppVolumeById() {
        //     const res = await getAppVolumeById({ volumeId: this.volumeId });
            
        //     if(res.code === "200") {
        //         this.SET_ACTIVE_DATA(res.data.appVolume);
        //         this.SET_SORT_NUM(this.activeData.sortNum);
        //     }
        // },

        /**
         * 
         * 新增修改分卷
         * @description 描述：作者新增或修改分卷
         * @param { number } volumeId 卷宗id
         * @param { string } title 分卷名称
         * @param { number } bookId 书籍id
         * @param { number } sortNum 分卷排序值
         * @param { string } notes 简介
         */
        async addOrUpdateAppVolume() {
            const res = await addOrUpdateAppVolume({ ...this.activeData, sortNum: this.sortNum });
            
            if(res.code === "200") {
                this.getAppVolumeListByBookId();
                this.$message.success("保存分卷成功");
                return ;
            }
        },

        /**
         * 
         * 作者删除分卷
         * @param { number } volumeId 卷宗id	
         */
        async deleteAppVolume() {
            const res = await deleteAppVolume({ volumeId: this.activeData.volumeId });

            if(res.code === "200") {
                this.getAppVolumeListByBookId();
                this.$message.success("删除分卷成功");
            }else {
                // this.$message.warning("删除分卷失败");
            }
        },

        handleSubmit() {
            // if(parseInt(this.sortNum) < 2) {
            //     this.$message.warning("分卷序号必须填入大于等于2的正整数");
            //     return ;
            // }

            this.addOrUpdateAppVolume();
        },

        handleUpdate() {
            this.SET_IS_UPDATE(true);
        },

        handleDel() {
            if(this.activeData.chapterCount != 0) {
                this.$message.warning("存在章节的卷章不允许删除");
                return ;
            }

            this.$confirm('分卷删除后无法恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.activeData.volumeId) {
                    this.deleteAppVolume();
                    return ;
                }

                const appVolumeList = this.appVolumeList.filter(item => item.sortNum !== this.activeData.sortNum);
                this.SET_APP_VOLUME_LIST(appVolumeList);
                this.SET_ACTIVE(0);
                this.SET_ACTIVE_DATA(this.appVolumeList[0])
                this.SET_SORT_NUM(this.activeData.sortNum);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    created(){
        this.SET_BOOKID(this.$route.query.bookId);
        // this.$nextTick().then(() => {
        //     this.getAppVolumeListByBookId();
        // });

        // Bus.$on('addVolume', this.addVolume);
    }
}
</script>

<style lang="scss" scoped>
.volume{
    display: block;

    .volume-left {
        display: inline-block;
        width: 245px;
        height: 650px;
        margin-right: 20px;
        padding: 10px 0;
        vertical-align: top;
        background-color: #fff;

        &__item {
            padding: 20px;
            color: #7b7b7b;
            cursor: pointer;
            
            &:hover,
            &.activity {
                color: #3399fe;
                background: rgba(2, 103, 229, 0.05);
            }
            .name {
                height: 20px;
                font-size: 14px;
                font-weight: 400;
                line-height: 25px;
                margin-bottom: 10px;
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

    .volume-con {
        display: inline-block;
        width: 935px;
        height: 650px;
        padding-top: 100px;
        background-color: #fff;
        vertical-align: top;
        position: relative;

        .btns {
            position: absolute;
            top: 30px;
            right: 30px;

            .btn {
                width: 88px;
                font-size: 14px;
                margin-left: 20px;
            }
        }

        & /deep/ .el-form-item__label {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #7B7B7B;
        }

        & /deep/ .el-form-item__content {
            width: calc(100% - 270px);
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #030303;
        }
    }
}
</style>