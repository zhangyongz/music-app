import axios from 'axios'

const instance = axios.create()

instance.defaults.withCredentials = true

instance.defaults.baseURL = 'http://localhost:3002'

export default instance
