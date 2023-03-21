<template>
  <div>
    <h1>登录页面</h1>
    <el-button type="primary" @click="router.push('/home')">登录</el-button>
    <el-button :plain="true" @click="openVn">VNode</el-button>
    <el-date-picker
      v-model="time"
      type="datetime"
      placeholder="Select date and time"
    />
    <el-input placeholder="输入时" />
    <svg-icon icon-class="vite" style="width: 40px" />
    <div id="amap" class="amap"></div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { loadMap, addDistrictMask, transformGCJ2WGS } from '@/utils/map'
  // import { ceshi } from '@/api/demo/ceshi'
  let marker = transformGCJ2WGS(31.239706, 121.499717)
  console.log(marker)
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
    let AMap: any
    let map: any
    loadMap([]).then((amap) => {
      AMap = amap
      map = new AMap.Map('amap', {
        resizeEnable: false,
        zoom: 13.5,
        zooms: [2, 17],
        mapStyle: 'amap://styles/4c6f45ddceac62ef3d57c5cf3e639b3f'
      })
      addDistrictMask(['上海市'], {}).then((res) => {
        map.add(res)
      })
    })

    // searchDistrict(['上海市'],{}).then(res=>{
    //   console.log(res)

    //   map.add(res)
    // })
    // const res = await ceshi({ page: 1, size: 10 })
    // let total = res.result.total
    // console.log(total)
  })
</script>
<style lang="scss" scoped>
  #amap {
    width: 80vw;
    height: 50vh;
  }
</style>
