// 常用的高德地图方法

import AMapLoader from '@amap/amap-jsapi-loader'
// bd09II： 百度地图
// gcj02： 高德地图、腾讯地图
// cgcs200： 天地图
// wgs84： osm、谷歌、arcgisonline

const x_PI = 3.14159265358979324 * 3000.0 / 180.0
const PI = 3.1415926535897932384626
const a = 6378245.0
const ee = 0.00669342162296594323
declare let AMap: any

//  2.0 2.0.0beta
enum myVersion {
  V1 = 'v1',
  V2 = 'v2'
}
interface VersionItem {
  mapVersion: string
  locaVersion: string
}
interface MapVersionInterface {
  v1: VersionItem
  v2: VersionItem
}
const mapVersion: MapVersionInterface = {
  v1: {
    mapVersion: '1.4.15',
    locaVersion: '1.3.2'
  },
  v2: {
    mapVersion: '2.0',
    locaVersion: '2.0.0beta'
  }
}

/**
 * Loader for AMap
 * @param {(Array)} plugins
 *  @param {String} version v1 || v2
 **/
export function loadMap(plugins: string[], version?: myVersion) {
  version = version || myVersion.V1
  const V = mapVersion[version]
  return new Promise((resolve, reject) => {
    AMapLoader.load({
      key: '04e730ae2098bd13712f7a7d67ee6689',
      version: V.mapVersion,
      plugins: plugins,
      Loca: {
        version: V.locaVersion
      }
    })
      .then((map) => {
        resolve(map)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 设置点位的中心
// 调用示范：  let center = setMarkerCenter(this.markerList)
export function setMarkerCenter(markers: any, format: Array<string>) {
  format = format || ['lng', 'lat']
  const stationData = markers
  stationData.forEach((item: any) => {
    item['lng'] = item[format[0]]
    item['lat'] = item[format[1]]
  })
  if (stationData.length) {
    let lngSum = 0
    let latSum = 0
    for (let i = 0; i < stationData.length; i++) {
      const lng = stationData[i].lng * 1
      const lat = stationData[i].lat * 1
      lngSum += lng
      latSum += lat
    }
    const lngCenter = lngSum / stationData.length
    const latCenter = latSum / stationData.length
    return [lngCenter, latCenter]
  }
}

// 绘制文本marker 一般用来生成城市的名字 样式使用默认样式 可以单独传入某个样式
// eg：let textMarker = textMarkers(name,position)
export function textMarkers(name: string, position: [], style = {}) {
  const textStyle = {
    'background-color': 'rgba(0,0,0,0)',
    'text-align': 'center',
    'font-size': '12px',
    'border-width': 0,
    color: '#ffffff',
    padding: '5px 10px'
  }
  const newStyle = Object.assign(textStyle, style)
  const text = new AMap.Text({
    text: name,
    anchor: 'center',
    style: newStyle,
    position: position,
    zIndex: 100
  })
  return text
}

// 坐标系转换
// 火星坐标（GCJ02） 转百度坐标（bd09II）

interface MarsPoint {
  longitude: number
  latitude: number
}
export function marsTobaidu(mars_point: MarsPoint) {
  const baidu_point = { longitude: 0, latitude: 0 }
  const x = mars_point.longitude
  const y = mars_point.latitude
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_PI)
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_PI)
  baidu_point.longitude = z * Math.cos(theta) + 0.0065
  baidu_point.latitude = z * Math.sin(theta) + 0.006
  return baidu_point
}

interface BaiduPoint {
  longitude: number
  latitude: number
}
// 百度坐标 （bd09II）转火星坐标 （GCJ02）
export function baiduTomars(baidu_point: BaiduPoint) {
  const mars_point = { longitude: 0, latitude: 0 }
  const x = baidu_point.longitude - 0.0065
  const y = baidu_point.latitude - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI)
  mars_point.longitude = z * Math.cos(theta)
  mars_point.latitude = z * Math.sin(theta)
  return mars_point
}

// 地球坐标系 （WGS84）转火星坐标系 （GCJ02）
export function wgs84togcj02(longitude: number, latitude: number) {
  if (out_of_china(longitude, latitude)) {
    return [longitude, latitude]
  } else {
    let dlat = transformlat(longitude - 105.0, latitude - 35.0)
    let dlng = transformlng(longitude - 105.0, latitude - 35.0)
    const radlat = latitude / 180.0 * PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    const sqrtmagic = Math.sqrt(magic)
    dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI)
    dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI)
    const mglat = latitude + dlat
    const mglng = longitude + dlng
    return [mglng, mglat]
  }
}

function transformlat(longitude: number, latitude: number) {
  let ret =
    -100.0 +
    2.0 * longitude +
    3.0 * latitude +
    0.2 * latitude * latitude +
    0.1 * longitude * latitude +
    0.2 * Math.sqrt(Math.abs(longitude))
  ret +=
    (20.0 * Math.sin(6.0 * longitude * PI) +
      20.0 * Math.sin(2.0 * longitude * PI)) *
      2.0 /
    3.0
  ret +=
    (20.0 * Math.sin(latitude * PI) + 40.0 * Math.sin(latitude / 3.0 * PI)) *
      2.0 /
    3.0
  ret +=
    (160.0 * Math.sin(latitude / 12.0 * PI) +
      320 * Math.sin(latitude * PI / 30.0)) *
      2.0 /
    3.0
  return ret
}

function transformlng(longitude: number, latitude: number) {
  let ret =
    300.0 +
    longitude +
    2.0 * latitude +
    0.1 * longitude * longitude +
    0.1 * longitude * latitude +
    0.1 * Math.sqrt(Math.abs(longitude))
  ret +=
    (20.0 * Math.sin(6.0 * longitude * PI) +
      20.0 * Math.sin(2.0 * longitude * PI)) *
      2.0 /
    3.0
  ret +=
    (20.0 * Math.sin(longitude * PI) +
      40.0 * Math.sin(longitude / 3.0 * PI)) *
      2.0 /
    3.0
  ret +=
    (150.0 * Math.sin(longitude / 12.0 * PI) +
      300.0 * Math.sin(longitude / 30.0 * PI)) *
      2.0 /
    3.0
  return ret
}
function out_of_china(longitude: number, latitude: number) {
  // 纬度3.86~53.55,经度73.66~135.05
  return !(
    longitude > 73.66 &&
    longitude < 135.05 &&
    latitude > 3.86 &&
    latitude < 53.55
  )
}

// 火星坐标系GCJ02转地球坐标系WGS84
export function transformGCJ2WGS(gcjLat: number, gcjLon: number) {
  const d = delta(gcjLat, gcjLon)
  return {
    lat: gcjLat - d.lat,
    lon: gcjLon - d.lon
  }
}
function delta(lat: number, lon: number) {
  const a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
  const ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
  let dLat = transformLat(lon - 105.0, lat - 35.0)
  let dLon = transformLon(lon - 105.0, lat - 35.0)
  const radLat = lat / 180.0 * PI
  let magic = Math.sin(radLat)
  magic = 1 - ee * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * PI)
  dLon = dLon * 180.0 / (a / sqrtMagic * Math.cos(radLat) * PI)
  return {
    lat: dLat,
    lon: dLon
  }
}
function transformLat(x: number, y: number) {
  let ret =
    -100.0 +
    2.0 * x +
    3.0 * y +
    0.2 * y * y +
    0.1 * x * y +
    0.2 * Math.sqrt(Math.abs(x))
  ret +=
    (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 /
    3.0
  ret +=
    (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0
  ret +=
    (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) *
      2.0 /
    3.0
  return ret
}
function transformLon(x: number, y: number) {
  let ret =
    300.0 +
    x +
    2.0 * y +
    0.1 * x * x +
    0.1 * x * y +
    0.1 * Math.sqrt(Math.abs(x))
  ret +=
    (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 /
    3.0
  ret +=
    (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0
  ret +=
    (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) *
      2.0 /
    3.0
  return ret
}

// 设置高德地图底图
/**
 * Loader for AMap
 * @param {(img)} 底图图片地址
 */
export function setBaseMap(img: string) {
  // let baseSize = [700, 774]  //以屏幕分辨率1440为基准 此时图片大小应该是700*774 以此比例适配
  // let baseAuther = [350, 380]
  const baseSize = [455, 553] // 以屏幕分辨率1440为基准 此时图片大小应该是700*774 以此比例适配
  const baseAuther = [225, 350]
  // const body = document.body.getClientRects()
  // const { width, height } = body[0]
  // const scaleTimes = width / 1440
  // const curSize = [700 * scaleTimes, 774 * scaleTimes]
  // const curAuther = [350 * scaleTimes, 380 * scaleTimes]
  const zoomStyleMapping1 = {
    // 地图不同级别下 对应使用第几个样式
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    18: 0,
    19: 0,
    20: 0
  }
  const baseMapImage = new AMap.ElasticMarker({
    position: [113.38019, 30.353799], // 这个坐标是用来约束自己位置的坐标 与地图坐标无关
    styles: [
      {
        icon: {
          img: img,
          size: baseSize,
          ancher: baseAuther, // 锚点，图标原始大小下锚点所处的位置，相对左上角
          // imageOffset: [-456, 0],////可缺省，当使用精灵图时可用，标示图标在整个图片中左上角的位置
          // imageSize:[512,512], //可缺省，当使用精灵图时可用，整张图片的大小
          fitZoom: 9.5,
          scaleFactor: 2, // //地图放大一级的缩放比例系数
          maxScale: 30, // 最大放大比例
          minScale: 0.125 // 最小放大比例
        }
      }
    ],
    zoomStyleMapping: zoomStyleMapping1
  })
  return baseMapImage
}
interface PolygonStyle {
  fillColor?: string
  strokeOpacity?: number
  fillOpacity?: number
  strokeColor?: string
  strokeWeight?: number
  strokeStyle?: 'solid' | 'dashed'
  strokeDasharray?: Array<number>
}
function getHoles(district: any, name: string): Promise<[]> {
  return new Promise((resolve, reject) => {
    district.search(name, (status: any, result: any) => {
      if (status === 'complete') {
        resolve(result.districtList[0].boundaries)
      } else {
        reject('找不到地址')
      }
    })
  })
}
// 添加遮罩层 返回图层
export function addDistrictMask(
  nameArray: Array<string>,
  curStyle: PolygonStyle
) {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.DistrictSearch', async () => {
      let holes: any = []
      const district = new AMap.DistrictSearch({
        extensions: 'all',
        subdistrict: 1
      })
      for (let i = 0; i < nameArray.length; i++) {
        let result = await getHoles(district, nameArray[i])
        if (!result.length) {
          reject('找不到该地址')
        }
        holes = holes.concat(result)
      }
      const outer = [
        new AMap.LngLat(-360, 90, true),
        new AMap.LngLat(-360, -90, true),
        new AMap.LngLat(360, -90, true),
        new AMap.LngLat(360, 90, true)
      ]
      const pathArray = [outer]
      pathArray.push.apply(pathArray, holes)
      const defaultStyle = {
        fillColor: 'rgb(68,126,178)', // map 1.4.15属性不能用transpant
        strokeOpacity: 1,
        fillOpacity: 0.5,
        strokeColor: '#2b8cbe',
        strokeWeight: 1,
        strokeStyle: 'dashed',
        strokeDasharray: [5, 5]
      }
      const style = Object.assign(defaultStyle, curStyle)
      const maskPolygon = new AMap.Polygon({
        path: pathArray,
        fillColor: style.fillColor,
        strokeOpacity: style.strokeOpacity,
        fillOpacity: style.fillOpacity,
        strokeColor: style.strokeColor,
        strokeWeight: style.strokeWeight,
        strokeStyle: style.strokeStyle,
        strokeDasharray: style.strokeDasharray
      })
      resolve(maskPolygon)
    })
  })
}
// 行政区划 显示边界
/**
 *
 * @param {*} districtArray
 * @param {*} curStyle
 */
export function searchDistrict(
  districtArray: Array<string>,
  curStyle: PolygonStyle
) {
  return new Promise((resolve, reject) => {
    const defaultStyle = {
      strokeWeight: 1,
      fillOpacity: 0,
      fillColor: '#ccebc5',
      strokeColor: '#d8d8d8',
      strokeStyle: 'solid',
      strokeOpacity: 0.7
    }
    const style = Object.assign(defaultStyle, curStyle)
    AMap.plugin('AMap.DistrictSearch', async () => {
      const district = new AMap.DistrictSearch({
        extensions: 'all',
        subdistrict: 1
      })
      let holes: any = []
      for (let i = 0; i < districtArray.length; i++) {
        let result = await getHoles(district, districtArray[i])
        if (!result.length) {
          reject('找不到该地址')
        }
        holes = holes.concat(result)
      }
      const polygon = new AMap.Polygon({
        strokeWeight: style.strokeWeight,
        path: holes,
        fillOpacity: style.fillOpacity,
        fillColor: style.fillColor,
        strokeColor: style.strokeColor,
        strokeStyle: style.strokeStyle,
        strokeOpacity: style.strokeOpacity
      })
      resolve(polygon)
    })
  })
}

// POI搜索 根据关键字查询点位在地图上相应的位置 使用需要加plugin=AMap.PlaceSearch
export function placeSearch(cityCode:any, keywords:string) {
  return new Promise((resolve, reject) => {
    const placeSearch = new AMap.PlaceSearch({
      // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
      city: cityCode
    })

    placeSearch.search(keywords, function (status:string, result:any) {
      // 查询成功时，result即对应匹配的POI信息
      console.log(result)
      if (result.info === 'OK') {
        const pois = result.poiList.pois // 返回多个搜索结果
        resolve(pois)
      } else {
        reject('没有找到搜索的点位')
      }
    })
  })
}

/**
 *
 * @param {Array} arr
 * @param {Object} format
 * @returns
 */
export function json2Geojson(arr:object[], format:any) {
  const defaultLnglat = {
    lng: 'longt',
    lat: 'latit'
  }
  const lnglat = Object.assign(defaultLnglat, format)
  const geojson:any = {
    type: 'FeatureCollection',
    features:[]
  }
  arr.forEach((item:any) => {
    const obj = {
      type: 'Feature',
      properties: {
        value: item.value
      },
      geometry: {
        coordinates: [item[lnglat.lng], item[lnglat.lat]],
        type: 'Point'
      }
    }
    geojson.features.push(obj)
  })
  return geojson
}
