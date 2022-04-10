import axios from 'axios'
import { message } from 'antd'

const instance = axios.create()

instance.defaults.withCredentials = true

instance.defaults.baseURL = 'http://localhost:3002'

instance.interceptors.response.use((res) => {
  if (res.data.code !== 200) {
    if (res.config.toastShow !== 0) {
      message.warning(res.data.message)
    }
  }
  return Promise.resolve(res)
}, (error) => {
  if (error.config.toastShow !== 0) {
    const { response } = error
    if (response) {
      message.warning('网络请求失败，请稍后重试')
    } else if (error.code === 'ECONNABORTED') {
      message.warning('网络请求超时，请检查网络')
    } else {
      message.warning('网络连接失败，请检查网络')
    }
  }
  console.log(error.message)
  return Promise.resolve(error)
})

export default instance
