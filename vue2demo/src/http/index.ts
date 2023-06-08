// http client&node

import axios, { AxiosRequestConfig } from 'axios';
import { isServer } from '@/help/base'

export function get(url: string, params?:any, config?: AxiosRequestConfig) {
  const serverConfig = {
    withCredentials: true,
  }
  const clientConfig = {}
  const envConfig = isServer ? serverConfig : clientConfig
  // eslint-disable-next-line no-param-reassign
  config = Object.assign(config || {}, envConfig)

  return axios.get(url, { ...config, params: params || {} })
    .then((res) => ({
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
      data: res.data,
    }))
    .catch((err) => ({
      status: err.status,
      message: err.message,
    }))
}

export function post(url: string, data?: any, config?: AxiosRequestConfig) {
  return axios.post(url, data, config)
}

export function customRequest(config: AxiosRequestConfig) {
  return axios(config)
}
