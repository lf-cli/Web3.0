<template>
  <div>
    <h1>登录页面</h1>
    <button
      v-for="item in 5"
      :key="item"
      class="demo"
      @click="router.push('/demo')"
    >
      登录
    </button>
  </div>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { reactive } from 'vue'
  const router = useRouter()
  let loginForm = reactive({
    name: '',
    password: '',
  })
  loginForm
  let a = 1
  if (a === 1) {
    console.log(1)
  }
</script>
