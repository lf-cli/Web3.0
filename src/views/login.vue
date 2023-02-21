<template>
  <div>
    <h1>登录页面</h1>
    <el-button type="primary" @click="router.push('/demo')">登录</el-button>
    <el-button :plain="true" @click="openVn">VNode</el-button>
    <el-date-picker
      v-model="time"
      type="datetime"
      placeholder="Select date and time"
    />
    <el-input placeholder="输入时" />
    <svg-icon icon-class="vite" style="width: 40px" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { ceshi } from '@/api/demo/ceshi'
  const router = useRouter()
  const time = ref('')
  const openVn = () => {
    ElMessageBox.confirm(
      'proxy will permanently delete the file. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }
    )
      .then(() => {
        ElMessage({
          type: 'success',
          message: 'Delete completed'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled'
        })
      })
  }

  onMounted(async () => {
    const res = await ceshi()
    res.result.total
  })
</script>
