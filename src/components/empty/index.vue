<template>
  <div class="empty">
    <!-- <el-image :src="require('@/assets/empty.png')" style="width: 300px;height: 300px;"></el-image> -->
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .empty {
    display: flex;
    width: 100%;
    height: 100%;
    background: url("~@/assets/empty.png") no-repeat;
    background-size: 400px 400px;
    background-position: center center;
  }
</style>