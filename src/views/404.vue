<template>
  <div class="not-found-page">
    <div class="box flex-c">
      <img src="@/assets/images/404.png" />
      <span>系统正在升级，请勿着急~</span>
    </div>
  </div>
</template>

<script lang="ts">
  export default {}
</script>
<style lang="scss" scoped>
  .not-found-page {
    width: 100%;
    height: 100%;
    .box {
      margin: 0 auto;
      padding-top: 100px;
      img {
        width: 600px;
      }
      span {
        font-size: 0.14rem;
      }
    }
  }
</style>
