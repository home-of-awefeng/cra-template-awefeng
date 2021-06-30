import axios from "axios"
import type { Method, AxiosRequestConfig } from "axios"
import qs from "qs"
import config from '@/config'

const fetch = <Q, B, R>(
  url: string,
  {
    method,
    baseUrl=undefined,
    query = undefined,
    body = undefined,
    ...others
  }: { method: Method; baseUrl?: string, query?: Q; body?: B, [key: string]: any }
): Promise<R> => {
  // 1. 计算url
  if (method === "GET") {
    const search = typeof query === "string" ? query : qs.stringify(query)
    url = search ? `${url}?${search}` : url
  }

  // 2. 是否有自定义的header
  // 在此添加通用header
  let headers = { "Content-Type": "application/json"}

  if(others.headers){
    headers = Object.assign(headers, others.headers)
  }
  // 3. 定义config
  const requestConfig: AxiosRequestConfig = {
    method,
    url,
    timeout: 10000,
    data: body,
    headers,
    ...others
  }

  // 3. 根据环境和传参决定baseurl
  if(baseUrl){
    requestConfig.baseURL = baseUrl
  }else{
    // 开发环境根据 webdev proxy来替换 其他环境不变
    if(process.env.REACT_APP_ENV !== 'development'){
      requestConfig.baseURL = config.baseUrl
    }
  }

  return axios(requestConfig).then((res) => {
    // TODO 根据前后端定义好的接口规范进行定制开发
    const { code } = res.data

    if(code===0 || code >= 200 && code < 300){
      return res.data as R
    }else{
      throw new Error(res.data?.msg ?? "请求错误~，服务器开小差了" )
    }
  })
}

export default fetch
