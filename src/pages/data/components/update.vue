<template>
    <div class="update">
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
                    <label for="" class="time-left">查看方式</label>
                    <el-date-picker
                        size="small"
                        class="time-select"
                        v-model="params.month"
                        :clearable="false"
                        type="month"
                        placeholder="选择月"
                        value-format="yyyy-MM"
                        >
                    </el-date-picker>
                    <el-button size="small" class="btn" style="width: 88px;" type="primary" @click="handleClickView" :loading="loading">查看</el-button>
                </el-col>
            </el-row>
        </div>

        <div class="block">
            <template v-for="item in blockList">
                <block class="block-item" :title="item.name" :num="item.num" :style="item.style" :key="item.id"></block>
            </template>
        </div>

        <div class="update-table">
            <el-calendar v-model="dateMonth" :first-day-of-week="7" v-loading="loading">
                <template
                    slot="dateCell"
                    slot-scope="data">
                    <p class="el-calendar-day-cell">
                        {{ data.data.day.split('-')[2] }}
                    </p>
                    <p class="el-calendar-day-cell" style="font-size: 12px;">{{ data.data | dateDataFilter(dayList) }}</p>
                </template>
            </el-calendar>
        </div>

        <div class="footer">
            <div class="footer-tips">注意事项</div>
            <div class="footer-desc">1. 有效更新：作者单日更新2000字以上，会被记为1有效更新天数；</div>
            <div class="footer-desc">2. 缺勤：该月份未能达成有效更新的天数；</div>
            <div class="footer-desc">3. 日历中，红色日历代表缺勤；</div>
        </div>
    </div>
</template>

<script>
import { countUpdate, bookGetAuthorBookList } from "@/api/authorCms";

export default {
    name: "update",
    components: {
        "block": () => import("./block.vue"),
    },
    data(){
        return {
            update: {},
            dayList: [],
            loading: false,
            params: {
                bookId: "",
                month: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
            },
            bookListParams: {
                pageNo: 1,
                pageSize: 10000,
            },
            bookList: [],
            dateMonth: new Date(),
        };
    },
    computed: {
        blockList() {
            const that = this;
            return [
                {
                    id: 1,
                    name: "当月更新章节",
                    get num() {
                        return that.update.chapterCount || 0;
                    },
                    style: {
                        background: "#62C5F9",
                    }
                },
                {
                    id: 2,
                    name: "当月更新字数",
                    get num() {
                        return that.update.wordCount || 0;
                    },
                    style: {
                        background: "#FF92A3",
                    }
                },
                {
                    id: 3,
                    name: "有效更新（天）",
                    get num() {
                        return that.update.effect || 0;
                    },
                    style: {
                        background: "#FBBD80",
                    }
                },
                {
                    id: 4,
                    name: "缺勤（天）",
                    get num() {
                        return that.update.uneffect || 0;
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
         * 更新统计接口
         */
        async countUpdate() {
            this.loading = true;

            const res = await countUpdate(this.params);

            console.log(res);
            if(res.code === "200") {
                this.update = res.data.update;
                this.dayList = res.data.update.dayList;
            }

            this.loading = false;
        },

        /**
         * 作品列表接口
         */
        async bookGetAuthorBookList() {
            const res = await bookGetAuthorBookList(this.bookListParams);

            if(res.code === "200") {
                const bookList = res.data.bookList;
                if(Array.isArray(bookList) && bookList.length) {
                    this.bookList = res.data.bookList;
                    this.params.bookId = bookList[0].bookId;
                    this.$nextTick().then(() => {
                        this.countUpdate();
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
            this.dateMonth = this.params.month;
            this.countUpdate();
        },

        init() {
            this.bookGetAuthorBookList();
        }
    },
    filters: {
        /**
         * 
         * 日历数据过滤
         */
        dateDataFilter(data, dayList) {
            const dayData = dayList.find(item => item.countDate === data.day);

            if(!dayData) {
                return "";
            }

            return `更新${dayData.wordCount}字，${dayData.chapterCount}章`;
        }
    },
    created(){
        this.init();
    },
}
</script>

<style lang="scss" scoped>
    .update{
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

            .el-calendar-day-cell {
                height: 25px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                line-height: 25px;
                text-align: center;
            }

            & /deep/ .el-calendar {

                .el-calendar__header {
                    display: none;
                }

                .el-calendar__body {
                    padding: 0px;

                    thead {
                        th {
                            height: 66px;
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-size: 14px;
                            font-weight: 600;
                            background: #FFFFFF;
                            border: 1px solid #7B7B7B;
                            text-align: center;
                        }
                    }

                    tbody {
                        tr.el-calendar-table__row {
                            td {
                                background: #FFFFFF;
                                border: 1px solid #7B7B7B;

                                .el-calendar-day {
                                    height: 66px;
                                }
                            }
                        }
                    }
                }
                
            }
        }

        .footer {
            margin-top: 40px;
            padding: 0px 30px;

            &-tips {
                width: 100%;
                height: 20px;
                margin-bottom: 10px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #030303;
                line-height: 20px;
            }

            &-desc {
                width: 100%;
                height: 24px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7B7B7B;
                line-height: 24px;
            }
        }
    }
</style>