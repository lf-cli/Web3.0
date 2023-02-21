<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  const props = defineProps({
    iconClass: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333'
    }
  })
  const symbolId = computed(() => `#icon-${props.iconClass}`)
</script>
<style lang="scss" scoped>
  .wrapper {
  }
</style>
