import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  // 处理headers 依赖与data
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      // 必须在open 和 send 之间调用
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
