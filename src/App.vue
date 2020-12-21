<template>
    <div id="app">
        <el-scrollbar style="width: 100%;height: 100%;" class="pageScrollbar" id="appScrollbar">
            <router-view />
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    #app {
        width: 100%;
        height: 100%;
        position: relative;

        #appScrollbar /deep/ {
            .el-scrollbar__wrap {
                overflow-x: hidden !important;
            }

            .el-scrollbar__view {
                min-height: 100%;
            }
        }
    }
</style>
