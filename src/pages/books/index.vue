<template>
    <div class="books">
        <page-book-header title="书籍明细"></page-book-header>

        <div class="time">
            <label for="" class="time-left">选择时间</label>
            <el-date-picker
                size="small"
                class="time-select"
                v-model="month"
                :clearable="false"
                type="month"
                placeholder="选择月"
                value-format="yyyy-MM"
                >
            </el-date-picker>
            <el-button size="small" class="btn" style="width: 88px;" type="primary" @click="handleSelectChange">查看</el-button>
        </div>

        <div class="block">
            <div class="block-label">收入明细</div>

            <el-table
                header-row-class-name="block-table-header"
                cell-class-name="block-table-cell"
                class="block-table"
                :data="tableData"
                border
                style="width: 100%"
                v-loading="loading"
                >
                <el-table-column
                    align="center"
                    prop="bookName"
                    label="作品"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="subscribe"
                    label="订阅收入（书币）"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="reward"
                    label="打赏收入（书币）"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="blade"
                    label="刀片收入（书币）"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="total"
                    label="书币合计">
                </el-table-column>

                <div slot="empty" class="block-table-header">暂无数据</div>
            </el-table>

            <div class="block-tips">注意事项</div>
            <div class="block-desc">1. 订阅合计：统计中已包括代币部分；</div>
        </div>
    </div>
</template>

<script>
import { countIncome } from "@/api/authorCms";

export default {
    name: "books",
    components: {
        "page-book-header": () => import('@/components/pageBookHeader/index.vue'),
    },
    data(){
        return {
            month: new Date().getFullYear() + "-" + (new Date().getMonth() + 1),
            tableData: [],
            loading: false,
        };
    },
    methods: {
        /**
         * 收入明细接口
         */
        async countIncome() {
            this.loading = true;

            const res = await countIncome({
                month: this.month
            });

            if(res.code === "200") {
                this.tableData = res.data.bookList;
            }

            this.loading = false;
        },
        /**
         * 日期下拉选择
         * 
         */
        handleSelectChange() {
            if(this.loading) {
                return ;
            }

            this.countIncome();
        }
    },
    created(){
        this.countIncome();
    },
}
</script>

<style lang="scss" scoped>
    .books{
        width: 100%;
        height: 100%;
        min-height: 800px;
        // padding-bottom: 200px;
        background-color: #ffffff;

        .time {
            width: 100%;
            height: 38px;
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

            &-label {
                height: 25px;
                margin-bottom: 30px;
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #030303;
                line-height: 25px;
            }

            &-table {
                margin-bottom: 40px;
            }

            &-tips {
                height: 20px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #030303;
                line-height: 20px;
            }

            &-desc {
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