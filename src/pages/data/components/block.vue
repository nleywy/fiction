<template>
    <div class="colorBlock">
        <slot>
            <div class="title">{{ title }}</div>
            <div class="num">{{ num }}</div>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "colorBlock",
        props: {
            title: String,
            num: [ String, Number ],
        },
        data() {
            return {

            }
        },
    }
</script>

<style lang="scss" scoped>
    .colorBlock {
        box-sizing: border-box;
        width: 220px;
        height: 125px;
        background: #62C5F9;
        border-radius: 5px;
        text-align: center;

        .title {
            padding-top: 35px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 25px;
        }

        .num {
            padding-top: 10px;
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 33px;
        }
    }
</style>