<template>
    <div class="gift">
        <div class="time">
            <el-row>
                <el-col :span="12">
                    <label for="" class="time-left">选择作品</label>
                    <el-select size="small" v-model="params.bookId" placeholder="请选择" class="time-select" style="width: 300px;">
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
                    <el-select size="small" v-model="params.giftType" placeholder="请选择" class="time-select">
                        <!-- <el-option
                            v-for="item in enumsGetMap('giftTypeEnum')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                        </el-option> -->
                        <el-option
                            v-for="item in propList"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button size="small" class="btn" style="width: 88px;" type="primary" @click="handleClickView" :loading="loading">查看</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-top: 30px;">
                <el-col :span="24">
                    <label for="" class="time-left">选择维度</label>
                    <el-select size="small" v-model="params.dateType" placeholder="请选择" class="time-select">
                        <el-option
                            v-for="item in enumsGetMap('dateTypeEnum')"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                        </el-option>
                    </el-select>

                    <el-date-picker
                        size="small"
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
                bookId: "",
                pageNo: 1,
                pageSize: 10,
                giftType: null,
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
                    value: null, 
                    text: "全部",
                },
                {
                    value: "1", 
                    text: "月票",
                },
                {
                    value: "2",
                    text: "推荐票",
                },
                {
                    value: "3",
                    text: "刀片",
                },
                {
                    value: "4",
                    text: "打赏",
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
            const res = await countReward({ ...this.params, startDate: this.dateList[0] || "", endDate: this.dateList[1] || "", });

            if(res.code === "200") {
                const gift = res.data.gift;
                this.gift = res.data.gift;
                if(gift.pageInfo) {
                    this.tableData = gift.pageInfo.list;
                    this.gift.total = gift.pageInfo.totalCount;
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
                // const giftTypeEnum = this.enumsGetMap('giftTypeEnum');
                // const giftTypeEnum = this.propList;
                if(Array.isArray(bookList) && bookList.length && this.propList.length) {
                    this.bookList = res.data.bookList;
                    this.params.bookId = bookList[0].bookId;
                    this.params.giftType = this.propList[0].value;
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

<style lang="scss" scoped>
    .gift{
        .time {
            width: 100%;
            margin-top: 30px;
            margin-bottom: 40px;
            padding: 0px 30px;

            &-left {
                height: 20px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7B7B7B;
                line-height: 20px;
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