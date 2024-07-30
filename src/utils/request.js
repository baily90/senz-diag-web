import axios from 'axios'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    osType: 105
  }
})

service.interceptors.request.use((config) => {
  const appStore = useAppStore()
  const { token } = storeToRefs(appStore)
  if (token.value) {
    config.headers.Authorization = `Bearer ${token.value}`
  }
  return config
})

service.interceptors.response.use((response) => {
  if (response.status && response.status === 200) {
    if ([0, 200].includes(response.data?.code)) { // [0, 200] 成功
      return response.data
    } else {
      const { tokenInvalid } = useAppStore()
      if ([400, 40001, 105001002].includes(response.data?.code)) {
        // [400, 40001, 105001002] token失效 到/login
        tokenInvalid('/user/login')
      } else if ([401000000, 403000000].includes(response.data?.code)) {
        // [401000000, 403000000] 到 /
        tokenInvalid('/')
      }
      ElMessage({
        message: response.data.msg || '数据异常',
        type: 'warning'
      })
      return response.data
    }
  } else {
    ElMessage({
      message: response.data.msg,
      type: 'error'
    })
  }
}, (err) => {
  ElMessage({
    message: err.message || '服务器异常',
    type: 'error'
  })
})

export default service
