##### 项目使用 ts 进行约束，一方面可以增强阅读性，另一方面可以方便代码提示。在以下模块开发的时候需要使用 ts 规范来开发

1. 公共模块开发，主要指 utils 里相关模块
2. api 模块尽量使用 ts 约束，可以增强阅读性和代码提示

##### pinia 使用

##### router 使用

##### svg 使用

`<svg-icon icon-class="vite" style="width: 40px" />`

##### echarts 使用

#### map 使用

```
import { loadMap } from '@/utils/map'
let AMap: any
let map:any
loadMap([]).then((amap: any) => {
  AMap = amap
  map = new AMap.Map('amap', {
    resizeEnable: false,
    zoom: 13.5,
    zooms: [2, 17],
    mapStyle: 'amap://styles/4c6f45ddceac62ef3d57c5cf3e639b3f'
  })
  setMarker()
})
let markers = []
const setMarker = ()=>{
  const marker = new AMap.Marker({
    map,
    position:[113,31],
  })
  markers.push(marker)
}
```
