<template>
    <div class="pageBookHeader">
        <div class="pageBookHeader-body">
            <slot name="left">
                <span class="pageBookHeader-left">{{ title }}</span>
            </slot>
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
        height: 95px;
        padding-left: 30px;
        line-height: 95px;

        &-body {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border-bottom: 1px solid #D8D8D8;;
        }

        &-left {
            width: 90px;
            font-size: 22px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #030303;
        }
    }
</style>