<template>
    <div class="subscribe">
        <div class="time">
            <label for="" class="time-left">选择作品</label>
            <el-select v-model="params.bookId" placeholder="请选择" class="time-select">
                <el-option
                    v-for="item in bookList"
                    :key="item.bookId"
                    :label="item.bookName"
                    :value="item.bookId">
                </el-option>
            </el-select>
            <el-button type="primary" @click="handleClickView" :loading="loading">查看</el-button>
        </div>

        <div class="block">
            <template v-for="item in blockList">
                <block class="block-item" :title="item.name" :num="item.num" :style="item.style" :key="item.id"></block>
            </template>
        </div>

        <div class="subscribe-table">
            <el-table
                header-row-class-name="block-table-header"
                cell-class-name="block-table-cell"
                :data="tableData"
                border
                style="width: 100%"
                v-loading="loading"
                >
                <el-table-column
                    align="center"
                    prop="bookName"
                    label="章节名"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="wordCount"
                    label="字数"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="price"
                    label="定价（书币）"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="releaseTime"
                    label="发布时间"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="subscribeCount"
                    label="订阅次数">
                </el-table-column>

                <div slot="empty" class="block-table-header">暂无数据</div>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page="params.pageNo"
                    :page-size="params.pageSize"
                    :total="subscribe.total || 0"
                    @current-change="handleCurrentChange"
                    >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { countSubscribe, bookGetAuthorBookList } from "@/api/authorCms";

export default {
    name: "subscribe",
    components: {
        "block": () => import("./block.vue"),
    },
    data(){
        return {
            value: '',
            subscribe: {},
            tableData: [],
            loading: false,
            params: {
                bookId: 1,
                pageNo: 1,
                pageSize: 10
            },
            bookListParams: {
                pageNo: 1,
                pageSize: 10000,
            },
            bookList: [],
        };
    },
    computed: {
        blockList() {
            const that = this;
            return [
                {
                    id: 1,
                    name: "总订阅",
                    get num() {
                        return that.subscribe.total || 0;
                    },
                    style: {
                        background: "#62C5F9",
                    }
                },
                {
                    id: 2,
                    name: "昨日新增订阅",
                    get num() {
                        return that.subscribe.yesterday || 0;
                    },
                    style: {
                        background: "#FF92A3",
                    }
                },
                {
                    id: 3,
                    name: "章节平均订阅",
                    get num() {
                        return that.subscribe.avg || 0;
                    },
                    style: {
                        background: "#FBBD80",
                    }
                },
                {
                    id: 4,
                    name: "单章最高订阅",
                    get num() {
                        return that.subscribe.max || 0;
                    },
                    style: {
                        background: "#FF8786",
                    }
                },
            ];
        }
    },
    methods: {
        /**
         * 订阅统计接口
         */
        async countSubscribe() {
            this.loading = true;

            const res = await countSubscribe(this.params);

            if(res.code === "200") {
                this.subscribe = res.data.subscribe;
                this.tableData = res.data.pageInfo;
            }

            this.loading = false;
        },

        /**
         * 作品列表接口
         */
        async bookGetAuthorBookList() {
            const res = await bookGetAuthorBookList(this.bookListParams);

            console.log(res)
            if(res.code === "200") {
                const bookList = res.data.bookList;
                if(Array.isArray(bookList) && bookList.length) {
                    this.bookList = res.data.bookList;
                    this.params.bookId = bookList[0].bookId;
                    this.$nextTick().then(() => {
                        this.countSubscribe();
                    })
                }
            }
        },

        /**
         * 
         * 点击查看按钮触发
         */
        handleClickView() {
            this.params.pageNo = 1;
            this.countSubscribe();
        },

        /**
         * 分页中的当前页改变时触发
         * @param {number} currentPage
         */
        handleCurrentChange(currentPage) {
            this.params.pageNo = currentPage;
            this.countSubscribe();
        },

        init() {
            this.bookGetAuthorBookList();
        }
    },
    created(){
        this.init();
    },
}
</script>

<style>
    .block-table-header {
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #030303;
        line-height: 28px;
    }

    .block-table-cell {
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #030303;
        line-height: 25px;
    }
</style>

<style lang="scss" scoped>
    .subscribe{
        .time {
            width: 100%;
            margin-top: 30px;
            margin-bottom: 40px;
            padding: 0px 30px;

            &-left {
                height: 40px;
                font-size: 20px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7B7B7B;
                line-height: 40px;
            }

            &-select {
                height: 40px;
                margin-left: 40px;
                margin-right: 20px;
            }
        }

        .block {
            padding: 0px 30px;
            
            & > .block-item {
                display: inline-block;
                width: calc((100% - 60px) / 4);
                margin-right: 20px;
            }

            & > .block-item:last-of-type {
                margin-right: 0px;
            }
        }

        &-table {
            width: 100%;
            margin-top: 40px;
            padding: 0px 30px;

            .pagination {
                margin-top: 40px;
                text-align: right;
            }
        }
    }
</style>