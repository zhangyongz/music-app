// import { AxiosResponse } from 'axios'
import http from '@/commons/http'

interface res {
  code?: number,
  data?: any
}

export function qrKey(): Promise<res> {
  return http.get('/login/qr/key')
}

interface qrCreateParams {
  key: string,
  qrimg?: string
}

export function qrCreate(params: qrCreateParams): Promise<res> {
  return http.get('/login/qr/create', {
    params
  })
}

interface qrCheckParams {
  key: string,
}

export function qrCheck(params: qrCheckParams): Promise<res> {
  return http.get('/login/qr/check', {
    params
  })
}

// 获取账号信息
export function userAccount(): Promise<res> {
  return http.get('/user/account')
}

