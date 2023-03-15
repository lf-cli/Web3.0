/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat?: string) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 简单实现防抖方法
 *
 * 防抖(debounce)函数在第一次触发给定的函数时，不立即执行函数，而是给出一个期限值(delay)，比如100ms。
 * 如果100ms内再次执行函数，就重新开始计时，直到计时结束后再真正执行函数。
 * 这样做的好处是如果短时间内大量触发同一事件，只会执行一次函数。
 *
 * @param fn 要防抖的函数
 * @param delay 防抖的毫秒数
 * @returns {Function}
 */
export function simpleDebounce(fn: Function, delay = 100) {
  let timer: any | null = null
  return function () {
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args)
    }, delay)
  }
}

// 节流 频繁点 设定时间内只会执行一次
export function throttle(fun: Function, wait: number) {
  let timer: any
  // @ts-ignore
  let _this = this
  return function () {
    if (!timer) {
      fun.apply(_this, arguments)
      timer = setTimeout(() => {
        timer = null
      }, wait)
    }
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source: any) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {number} time 延时执行
 */
export function sleep(time: number) {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/**
 * @param {string} url 将url解析为key value格式的json
 * @returns {Object}
 */
export function getQueryObject(url: string) {
  url = url === null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj: any = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} sensor 转换出因子的大写名称 PM10 -> PM<sub>10</sub>
 * @returns {string}
 */
export function sensorTransform(value: string) {
  value = value.toUpperCase()
  let sensor = value.split('')
  let numInSensor = -1
  for (let i = 0; i < sensor.length; i++) {
    if (!Number.isNaN(Number(sensor[i]))) {
      // 是数字
      numInSensor = i
      break
    }
  }
  if (numInSensor > -1) {
    // 有数字就要处理成下标的格式
    return `
          <span>${value.substr(0, numInSensor)}<sub>${value.substr(
      numInSensor
    )}</sub></span>
          `
  } else {
    return value
  }
}

/**
 * @param {string} sensor 大气六因子
 * @param {sensorValue} 因子数值
 * @description 大气aqi有自己的阈值区间，此方法用于取某个因子的数值占阈值的百分比
 * @returns {string}
 */
export function getPercentOfSensorValue(sensor: string, sensorValue: number) {
  const sensorMaxValueMapList: any = {
    aqi: 500,
    so2: 2620,
    no2: 3840,
    pm10: 600,
    co: 150,
    o3: 1200,
    pm25: 500
  }
  let percent
  for (const key in sensorMaxValueMapList) {
    if (key === sensor) {
      percent = ((sensorValue / sensorMaxValueMapList[key]) * 100).toFixed(2)
    }
  }
  return percent
}

/**
 * @param {string} level 水质登记
 * @description 返回该等级下的水质颜色
 * @returns {string}
 */
export function waterLevel2Color(level: string) {
  let color
  switch (level) {
    case 'I类':
      color = '#ccffff'
      break
    case 'II类':
      color = '#00ccff'
      break
    case 'III类':
      color = '#00ff00'
      break
    case 'IV类':
      color = '#ffff00'
      break
    case 'V类':
      color = '#ff9b00'
      break
    case '劣V类':
      color = '#ff0000'
      break
    default:
      color = '#ccffff'
      break
  }
  return color
}
// 权限判断
export function checkPer() {
  // @ts-ignore
  let perList = this.$store.state.user.permissionList
  // @ts-ignore
  let path = this.$route.path
  let hasPermission = false
  perList.forEach((item: string) => {
    if (path.includes(item)) {
      hasPermission = true
    }
  })
  return hasPermission
}
