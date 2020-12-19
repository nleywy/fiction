<template>
    <div class="apply">
        <page-book-header title="作家申请"></page-book-header>

        <section class="block">
            <i class="el-icon-circle-check"></i>
            <p class="success">申请成功</p>
            <p class="tips">恭喜，你已成功加入次元姬</p>
            <div>
                <el-button type="primary" style="width: 102px;" @click="handleCreate">创建作品</el-button>
                <el-button plain style="width: 102px;margin-left: 20px;" @click="handleEdit">完善资料</el-button>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    components: {
        "page-book-header": () => import('@/components/pageBookHeader/index.vue'),
    },
    data() {
        return {}
    },
    methods: {
        handleCreate() {
            this.$router.push({ name: "management" });
        },
        handleEdit() {
            this.$router.push({ name: "personalData" });
        }
    },
}
</script>

<style lang="scss" scoped>
    .apply {
        width: 100%;
        height: 700px;
        background: #FFFFFF;
        border-radius: 5px;

        .block {
            text-align: center;

            .el-icon-circle-check {
                margin-top: 100px;
                margin-bottom: 20px;
                font-size: 80px;
                color: #259B25;
            }

            .success {
                height: 25px;
                font-size: 18px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #030303;
                line-height: 25px;
            }

            .tips {
                height: 20px;
                margin-top: 10px;
                margin-bottom: 40px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7B7B7B;
                line-height: 20px;
            }
        }
    }
</style>