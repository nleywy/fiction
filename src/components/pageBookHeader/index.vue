<template>
    <div class="pageBookHeader">
        <div class="pageBookHeader-body">
            <slot name="left">
                <span class="pageBookHeader-left">{{ title }}</span>
            </slot>
            <span class="middle"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "pageBookHeader",
    props: {
        title: String,
    },
    data() {
        return {

        }
    },
}
</script>

<style lang="scss" scoped>
    .pageBookHeader {
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        padding-left: 30px;
        line-height: 95px;

        &-body {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border-bottom: 1px solid #D8D8D8;;
        }

        &-left {
            display: inline-block;
            width: 90px;
            height: 70px;
            line-height: 70px;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #030303;
            vertical-align: top;
        }

        .middle {
            display: inline-block;
            width: 0px;
            height: 70px;
            // vertical-align: middle;
        }
    }
</style>