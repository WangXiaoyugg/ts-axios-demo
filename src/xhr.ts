import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  const xhrRequest = new XMLHttpRequest()
  xhrRequest.open(method.toUpperCase(), url, true)
  xhrRequest.send(data)
}
