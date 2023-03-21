<template>
  <div class="header-box flex-c">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">LOGO</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item
        v-for="item in headerList"
        :key="item.name"
        :index="item.path"
      >
        {{ item.meta.title }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { usePermissionStore } from '@/store/modules/permission'
  import router from '@/router'

  let usePermission = usePermissionStore()
  const headerList = usePermission.routers
  console.log(headerList)

  const activeIndex = ref('/home')
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    router.push(key)
  }
</script>

<style lang="scss" scoped>
  .header-box {
    width: 100%;
    height: $headerHeight;
    .el-menu {
      width: 100%;
      height: 100%;
    }
    :deep(.flex-grow) {
      flex-grow: 1;
    }
  }
</style>
