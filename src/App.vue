<template>
    <div id="app">
        <el-scrollbar style="width: 100%;height: 100%;" class="pageScrollbar">
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

<style lang="scss">
    body {
        height: 100%;
    }

    #app {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
