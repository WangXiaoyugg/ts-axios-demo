import { isDate, isObject } from './util'

function encode(val: string): string {
  // 对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  // 用数组保存所有params的属性，最后用 & join
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    // params 中的空值忽略
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]

    // 区分数组和 基本类型, 统一成数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      // 参数值为 Date 类型， 转换为IOS string
      if (isDate(val)) {
        val = val.toISOString()
      }
      // 参数值为对象， JSON化
      else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      // 对key, val 进行encode
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 丢弃url 中的 hash ,如 #xxx
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 保留url中已存在的参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
