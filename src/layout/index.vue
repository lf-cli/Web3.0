<template>
  <div class="wrapper-container">
    <header-box />
    <div class="inner-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HeaderBox from '@/components/common/header.vue'
</script>
<style lang="scss" scoped>
  .wrapper-container {
    width: 100%;
    height: 100%;
    .inner-container {
      width: 100%;
      height: calc(100% - $headerHeight);
    }
  }
</style>
