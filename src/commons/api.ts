import { AxiosResponse } from 'axios'

import http from '@/commons/http'

export function qrKey(): Promise<AxiosResponse> {
  return http.get('/login/qr/key')
}