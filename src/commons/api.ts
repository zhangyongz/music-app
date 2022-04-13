// import { AxiosResponse } from 'axios'
import http from '@/commons/http'

interface res {
  code?: number,
  data?: any,
  profile?: any
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

interface userDetailParams {
  uid: string
}

// 获取用户详情
export function userDetail(params: userDetailParams): Promise<res> {
  return http.get('/user/detail', {
    params
  })
}
