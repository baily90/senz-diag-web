import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAppStore = defineStore('app', () => {
  const token = ref(null)
  const isRember = ref(false)
  const phone = ref(null)
  const password = ref(null)
  const name = ref(null)
  const avator = ref(null)
  const router = useRouter()

  // 非正常离开诊断页面，需要取消诊断重新回到报告池，防止一直被占，这里做了个控制区分是否要调用取消诊断接口
  const requestInvalidRedirect = (path = '/') => {
    router.replace({ path, query: { interceptedByError: true } })
  }

  return {
    phone,
    password,
    token,
    isRember,
    name,
    avator,
    requestInvalidRedirect
  }
},
{
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
})
