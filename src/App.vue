<template>
    <div id="app">
        <router-view />
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
