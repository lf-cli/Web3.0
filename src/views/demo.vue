<template>
  <h1>{{ store.count }}</h1>
  <button @click="addCount">增加</button>
</template>
<script lang="ts" setup>
  import { userDemoStore } from '@/store/modules/demo'
  const store = userDemoStore()
  const addCount = () => {
    store.addCount()
  }
</script>
<style lang="scss" scoped>
  .container {
    .demo {
      width: 100%;
    }
  }
</style>
