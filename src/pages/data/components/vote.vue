<template>
    <div class="gift">
        <div class="time">
            <el-row>
                <el-col :span="12">
                    <label for="" class="time-left">选择作品</label>
                    <el-select v-model="params.bookId" placeholder="请选择" class="time-select" style="width: 300px;">
                        <el-option
                            v-for="item in bookList"
                            :key="item.bookId"
                            :label="item.bookName"
                            :value="item.bookId">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="12" style="text-align: right;">
                    <label for="" class="time-left">选择道具</label>
                    <el-select v-model="params.giftType" placeholder="请选择" class="time-select">
                        <el-option
                            v-for="item in enumsGetMap('giftTypeEnum')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="handleClickView" :loading="loading">查看</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
                <el-col :span="24">
                    <label for="" class="time-left">选择维度</label>
                    <el-select v-model="params.dateType" placeholder="请选择" class="time-select">
                        <el-option
                            v-for="item in enumsGetMap('dateTypeEnum')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                        </el-option>
                    </el-select>

                    <el-date-picker
                        v-show="params.dateType === '2'"
                        v-model="dateList"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        >
                    </el-date-picker>
                </el-col>
            </el-row>
        </div>

        <div class="block">
            <template v-for="item in blockList">
                <block class="block-item" :title="item.name" :num="item.num" :style="item.style" :key="item.id"></block>
            </template>
        </div>

        <div class="gift-table">
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
                    prop="rewardTime"
                    label="时间"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="nickName"
                    label="用户名"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="giftName"
                    label="道具"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="giftCount"
                    label="数量"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="unitPrice"
                    label="单价（书币）">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="totalPrice"
                    label="合计（书币）">
                </el-table-column>

                <div slot="empty" class="block-table-header">暂无数据</div>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page="params.pageNo"
                    :page-size="params.pageSize"
                    :total="gift.total || 0"
                    @current-change="handleCurrentChange"
                    >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { countReward, bookGetAuthorBookList, enumGetMap } from "@/api/authorCms";
import { mapGetters} from "vuex";

export default {
    name: "gift",
    components: {
        "block": () => import("./block.vue"),
    },
    data(){
        const date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();

        return {
            gift: {},
            tableData: [],
            loading: false,
            params: {
                bookId: 1,
                pageNo: 1,
                pageSize: 10,
                giftType: "",
                dateType: "",
            },
            dateList: [ date, date ],
            bookListParams: {
                pageNo: 1,
                pageSize: 10000,
            },
            bookList: [],
            propList: [ // 道具列表
                {
                    propId: 1,
                    propName: "月票",
                },
                {
                    propId: 2,
                    propName: "推荐票",
                },
                {
                    propId: 3,
                    propName: "刀片",
                },
                {
                    propId: 4,
                    propName: "打赏",
                },
            ],
        };
    },
    computed: {
        // enums() {
        //     return this.$store.getters('enums/enumsGetMap');
        // },
        ...mapGetters("enums", [ 'enumsGetMap' ]),
        blockList() {
            const that = this;
            return [
                {
                    id: 1,
                    name: "总推荐票",
                    get num() {
                        return that.gift.totalDay || 0;
                    },
                    style: {
                        background: "#62C5F9",
                    }
                },
                {
                    id: 2,
                    name: "总月票",
                    get num() {
                        return that.gift.totalMonth || 0;
                    },
                    style: {
                        background: "#FF92A3",
                    }
                },
                {
                    id: 3,
                    name: "总刀片",
                    get num() {
                        return that.gift.totalBlade || 0;
                    },
                    style: {
                        background: "#FBBD80",
                    }
                },
                {
                    id: 4,
                    name: "总打赏（书币）",
                    get num() {
                        return that.gift.totalReward || 0;
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
         * 道具统计接口
         */
        async countReward() {
            this.loading = true;
            console.log(this.params)
            const res = await countReward({ ...this.params, startDate: this.dateList[0] || "", endDate: this.dateList[1] || "", });

            console.log(res);
            if(res.code === "200") {
                this.gift = res.data.gift;
                if(res.data.pageInfo) {
                    this.tableData = res.data.pageInfo.list;
                    this.gift.total = res.data.totalCount;
                }
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
                const dateTypeEnum = this.enumsGetMap('dateTypeEnum');
                const giftTypeEnum = this.enumsGetMap('giftTypeEnum');
                if(Array.isArray(bookList) && bookList.length && giftTypeEnum.length && giftTypeEnum.length) {
                    this.bookList = res.data.bookList;
                    this.params.bookId = bookList[0].bookId;
                    this.params.giftType = giftTypeEnum[0].value;
                    this.params.dateType = dateTypeEnum[0].value;
                    this.$nextTick().then(() => {
                        this.countReward();
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
            this.countReward();
        },

        /**
         * 分页中的当前页改变时触发
         * @param {number} currentPage
         */
        handleCurrentChange(currentPage) {
            this.params.pageNo = currentPage;
            this.countReward();
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
    .gift{
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