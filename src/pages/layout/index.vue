<template>
    <div>
        <public-header />
        
        <section class="app">
            <left-menu ref="leftMenu"/>

            <div class="container" :style="{ width: !hideLeftMenu ? '996px' : '1200px' }">
                <transition name="fade-transform" mode="out-in">
                    <router-view @hook:mounted="handleHookMounted"></router-view>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "layout",
    components: {
        "public-header": () => import("@/components/header"),
        "left-menu": () => import("@/components/leftMenu"),
    },
    data() {
        return {

        };
    },
    computed:{
        hideLeftMenu() {
            return this.$route.meta.hideLeftMenu;
        }
    },
    methods: {
        handleHookMounted() {
            // const leftMenu = this.$refs.leftMenu;
            // console.log(leftMenu)
            // const find = leftMenu.leftTags.find(item => this.$route.path.includes(item.id));

            // if(find) {
            //     leftMenu.setLeftTagsactivity(find.id);
            // }
        }
    },
}
</script>

<style lang="scss" scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .app {
        // padding: 30px;
        // width: 996px;
        // margin: 20px auto 0;
        // border: 1px solid #ccc;
        width: 1200px;
        margin: 0px auto;
        font-size: 0px;
        position: relative;

        .container {
            display: inline-block;
            width: 996px;
            vertical-align: top;
            font-size: 20px;
        }
    }
</style>